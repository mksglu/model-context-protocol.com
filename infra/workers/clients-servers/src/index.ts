/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { createClient } from '@supabase/supabase-js';
import { fetchGitHubRepos } from './services/github';
import { categorizeWithGemini, generateSeoSlug } from './services/ai';
import { getLastUpdatedAt } from './services/database';
import { EnrichedRepository, GitHubRepository } from './types/github';
import { Env } from './types/env';

// Cloudflare Workers tiplerini içe aktarma
import type { ExecutionContext, ScheduledEvent } from '@cloudflare/workers-types';

declare global {
	const GITHUB_TOKEN: string | undefined;
}

const MAX_REPOS_PER_BATCH = 20; // Alınan repolardan kaç tanesinin işleneceğini sınırlar

const BATCH_SIZE = 3; // Veritabanı işlemleri için toplu işlem boyutu
const MAX_RETRIES = 3; // Maksimum yeniden deneme sayısı

interface MicroRepoWithId extends GitHubRepository {
	readme?: string;
	inserted_at?: string;
	is_active?: boolean;
	type?: string;
	categories?: string[];
	ai_analysis?: string;
	is_mcp: true;
	slug: string;
}

const worker = {
	async fetch(_request: Request, env: Env) {
		return await this.runJob(env);
	},

	async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
		ctx.waitUntil(this.runJob(env));
	},

	async runJob(env: Env) {
		try {
			if (!env.SUPABASE_URL || !env.SUPABASE_KEY) {
				throw new Error('Supabase credentials are not configured');
			}

			const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
			console.log('🔌 Successfully connected to Supabase');

			const lastUpdatedAt = await getLastUpdatedAt(supabase);
			console.log('📅 Last Update Date:', lastUpdatedAt);

			// Rate limit check and smart retry strategy
			let repositories: EnrichedRepository[] = [];
			let retryCount = 0;

			while (repositories.length === 0 && retryCount < MAX_RETRIES) {
				try {
					repositories = await fetchGitHubRepos(lastUpdatedAt, supabase, env);

					// If more than MAX_REPOS_PER_BATCH repos, take first MAX_REPOS_PER_BATCH
					if (repositories.length > MAX_REPOS_PER_BATCH) {
						console.log(`Found ${repositories.length} repos, processing first ${MAX_REPOS_PER_BATCH}.`);
						repositories = repositories.slice(0, MAX_REPOS_PER_BATCH);
					}

					if (repositories.length === 0 && retryCount < MAX_RETRIES - 1) {
						retryCount++;
						const waitTime = Math.pow(2, retryCount) * 5000; // exponential backoff (5s, 10s, 20s)
						console.log(`No data found, retrying (${retryCount}/${MAX_RETRIES})... waiting ${waitTime / 1000} seconds.`);
						await new Promise((resolve) => setTimeout(resolve, waitTime));
					}
				} catch (error) {
					if (error instanceof Error && error.message.includes('rate limit')) {
						retryCount++;
						if (retryCount < MAX_RETRIES) {
							const waitTime = Math.pow(2, retryCount) * 30000; // longer wait (30s, 60s, 120s)
							console.log(`API rate limit error, retrying (${retryCount}/${MAX_RETRIES})... waiting ${waitTime / 1000} seconds.`);
							await new Promise((resolve) => setTimeout(resolve, waitTime));
						} else {
							console.error('Maximum retry count reached, canceling operation');
							return new Response(JSON.stringify({ error: 'GitHub API rate limit exceeded' }), {
								headers: { 'Content-Type': 'application/json' },
							});
						}
					} else {
						throw error;
					}
				}
			}

			if (!repositories.length) {
				console.log('No new data to process.');
				return new Response(JSON.stringify({ message: 'No new data to insert' }), {
					headers: { 'Content-Type': 'application/json' },
				});
			}

			let enrichedRepositories = await categorizeWithGemini(repositories, env.GOOGLE_GEMINI_API_KEY);
			console.log('Categorization with Gemini completed.');

			// If more than MAX_REPOS_PER_BATCH repos, take first MAX_REPOS_PER_BATCH
			if (enrichedRepositories.length > MAX_REPOS_PER_BATCH) {
				console.log(`Found ${enrichedRepositories.length} enriched repos, processing first ${MAX_REPOS_PER_BATCH}.`);
				enrichedRepositories = enrichedRepositories.slice(0, MAX_REPOS_PER_BATCH);
			}

			// Get all existing slugs at once
			const { data: existingSlugs } = await supabase.from('github_repos').select('slug');
			const slugSet = new Set((existingSlugs || []).map((r: { slug: string }) => r.slug));

			// Create unique slug for each repository
			const reposToInsertPromises = enrichedRepositories.map(async (repo) => {
				const quickCheck = (repo.name + ' ' + (repo.description || '')).toLowerCase();
				if (quickCheck.includes('mcp') || quickCheck.includes('model context protocol')) {
					try {
						// Generate slug with AI
						const slug = await generateSeoSlug(repo, env.GOOGLE_GEMINI_API_KEY);

						// If slug already exists, add GitHub repo ID
						let finalSlug = slug;
						if (slugSet.has(finalSlug)) {
							finalSlug = `${slug}-${repo.id}`;

							// If ID version also exists, add timestamp as last resort
							if (slugSet.has(finalSlug)) {
								const timestamp = Date.now().toString().slice(-6);
								finalSlug = `${slug}-${timestamp}`;
							}
						}

						slugSet.add(finalSlug);

						return {
							...repo,
							is_mcp: true as const,
							slug: finalSlug,
						};
					} catch {
						const timestamp = Date.now().toString().slice(-6);

						let fallbackSlug = repo.name
							.toLowerCase()
							.replace(/[^a-z0-9-]+/g, '-')
							.replace(/^-+|-+$/g, '')
							.split('-')
							.slice(0, 3)
							.join('-');

						if (!fallbackSlug.includes('mcp')) {
							fallbackSlug = `mcp-${fallbackSlug}`;
						}

						let finalSlug = fallbackSlug;
						if (slugSet.has(finalSlug)) {
							finalSlug = `${fallbackSlug}-${repo.id}`;

							if (slugSet.has(finalSlug)) {
								finalSlug = `${fallbackSlug}-${timestamp}`;
							}
						}

						slugSet.add(finalSlug);

						return {
							...repo,
							is_mcp: true as const,
							slug: finalSlug,
						};
					}
				}

				return null;
			});

			const reposWithSlugResults = await Promise.all(reposToInsertPromises);
			const reposToInsert = reposWithSlugResults.filter((repo): repo is MicroRepoWithId => repo !== null);
			console.log('Total number of repos to process:', reposToInsert.length);

			for (let i = 0; i < reposToInsert.length; i += BATCH_SIZE) {
				const batch = reposToInsert.slice(i, i + BATCH_SIZE);
				console.log(`Processing repos ${i + 1}-${Math.min(i + BATCH_SIZE, reposToInsert.length)}...`);

				const filteredBatch = batch.map((repo) => ({
					id: repo.id,
					name: repo.name,
					full_name: repo.full_name,
					html_url: repo.html_url,
					description: repo.description,
					created_at: repo.created_at,
					updated_at: repo.updated_at,
					language: repo.language,
					stars: repo.stargazers_count,
					readme: repo.readme,
					categories: repo.categories,
					ai_analysis: repo.ai_analysis,
					inserted_at: repo.inserted_at,
					is_active: true,
					type: repo.type,
					is_mcp: repo.is_mcp,
					slug: repo.slug,
				}));

				const { error } = await supabase.from('github_repos').upsert(filteredBatch, {
					onConflict: 'id',
					ignoreDuplicates: true,
				});

				if (error) {
					console.error(`Toplu ekleme hatası (${i + 1}-${Math.min(i + BATCH_SIZE, reposToInsert.length)}):`, error);
					continue; // Continue with other batches on error
				}
			}

			// Separate Client and Server repos with non-null assertion
			const clientRepos = reposToInsert.filter((repo) => repo.type === 'Clients');
			const serverRepos = reposToInsert.filter((repo) => repo.type === 'Servers');

			// Client repos batch insert
			if (clientRepos.length > 0) {
				console.log('👥 Starting to process client repos. Total:', clientRepos.length);
				// Get client slugs
				const { data: existingClientSlugs } = await supabase.from('clients').select('slug');
				const clientSlugSet = new Set((existingClientSlugs || []).map((r: { slug: string }) => r.slug));

				for (let i = 0; i < clientRepos.length; i += BATCH_SIZE) {
					const batch = clientRepos.slice(i, i + BATCH_SIZE).map((repo) => {
						// Check slug uniqueness - repo is guaranteed to be non-null here
						let finalSlug = repo.slug || '';
						if (clientSlugSet.has(finalSlug)) {
							const timestamp = Date.now().toString().slice(-6);
							finalSlug = `${repo.slug}-${timestamp}`;
						}
						clientSlugSet.add(finalSlug);

						// Sadece şemada tanımlı alanları içeren nesne oluşturuyoruz
						return {
							id: repo.id,
							name: repo.name,
							full_name: repo.full_name,
							html_url: repo.html_url,
							description: repo.description,
							created_at: repo.created_at,
							updated_at: repo.updated_at,
							language: repo.language,
							stars: repo.stargazers_count,
							readme: repo.readme,
							categories: repo.categories,
							ai_analysis: repo.ai_analysis,
							inserted_at: repo.inserted_at,
							slug: finalSlug,
							is_active: true,
							is_mcp: true,
						};
					});

					const { error } = await supabase.from('clients').upsert(batch, {
						onConflict: 'id',
						ignoreDuplicates: true,
					});

					if (error) {
						console.error(`İstemci toplu ekleme hatası (${i + 1}-${Math.min(i + BATCH_SIZE, clientRepos.length)}):`, error);
					}
				}
			}

			// Server repos batch insert
			if (serverRepos.length > 0) {
				console.log('🖥️ Starting to process server repos. Total:', serverRepos.length);
				// Get server slugs
				const { data: existingServerSlugs } = await supabase.from('servers').select('slug');
				const serverSlugSet = new Set((existingServerSlugs || []).map((r: { slug: string }) => r.slug));

				for (let i = 0; i < serverRepos.length; i += BATCH_SIZE) {
					const batch = serverRepos.slice(i, i + BATCH_SIZE).map((repo) => {
						// Check slug uniqueness
						let finalSlug = repo.slug || '';
						if (serverSlugSet.has(finalSlug)) {
							const timestamp = Date.now().toString().slice(-6);
							finalSlug = `${repo.slug}-${timestamp}`;
						}
						serverSlugSet.add(finalSlug);

						// Sadece şemada tanımlı alanları içeren nesne oluşturuyoruz
						return {
							id: repo.id,
							name: repo.name,
							full_name: repo.full_name,
							html_url: repo.html_url,
							description: repo.description,
							created_at: repo.created_at,
							updated_at: repo.updated_at,
							language: repo.language,
							stars: repo.stargazers_count,
							readme: repo.readme,
							categories: repo.categories,
							ai_analysis: repo.ai_analysis,
							inserted_at: repo.inserted_at,
							slug: finalSlug,
							is_active: true,
							is_mcp: true,
						};
					});

					const { error } = await supabase.from('servers').upsert(batch, {
						onConflict: 'id',
						ignoreDuplicates: true,
					});

					if (error) {
						console.error(`Sunucu toplu ekleme hatası (${i + 1}-${Math.min(i + BATCH_SIZE, serverRepos.length)}):`, error);
					}
				}
			}

			return new Response(
				JSON.stringify({
					status: 'success',
					message: 'Job completed successfully',
					stats: {
						repositories_processed: reposToInsert.length,
						client_repos: clientRepos.length,
						server_repos: serverRepos.length,
					},
				}),
				{
					headers: { 'Content-Type': 'application/json' },
				},
			);
		} catch (error) {
			console.error('❌ Critical worker error:', error);
			console.error('🔍 Error details:', {
				message: error instanceof Error ? error.message : 'Unknown error',
				stack: error instanceof Error ? error.stack : undefined,
			});

			return new Response(
				JSON.stringify({
					status: 'error',
					message: error instanceof Error ? error.message : 'An unknown error occurred',
				}),
				{
					status: 500,
					headers: { 'Content-Type': 'application/json' },
				},
			);
		}
	},
};

export default worker;
