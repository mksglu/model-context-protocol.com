import { GitHubSearchResponse, EnrichedRepository } from '../types/github';
import { sanitizeText } from '../utils/text';
import { Env } from '../types/env';

export const MAX_REPOS_TO_FETCH = 20; // Limits how many repos to fetch from GitHub

const RATE_LIMIT_BACKOFF_TIME = 60000; // 60 seconds wait (ms)
const MAX_RETRIES_PER_ENDPOINT = 2; // Maximum retry count for each endpoint

export async function fetchGitHubRepos(lastUpdatedAt: string, supabase: any, env?: Env): Promise<EnrichedRepository[]> {
	console.log('\n=== 🔍 GITHUB REPO SCAN STARTED ===');
	console.log(`📅 Last Update Date: ${lastUpdatedAt}`);
	console.log(`🎯 Target Repo Count: ${MAX_REPOS_TO_FETCH}`);

	// Get existing repositories
	const { data: existingRepos, error } = await supabase.from('github_repos').select('id, updated_at').eq('is_active', true);

	if (error) {
		console.error('❌ Error fetching repo information from database:', error);
		return [];
	}

	const existingRepoIds = new Set((existingRepos || []).map((repo: { id: number }) => repo.id));
	console.log(`📊 Database Status:`);
	console.log(`   - Active Repo Count: ${existingRepoIds.size}`);

	// Current date
	const currentDate = new Date();
	console.log(`\n⏰ Process Start Time: ${currentDate.toLocaleString('en-US')}`);

	// 1. Since last run (using lastUpdatedAt)
	const lastRunFilter = lastUpdatedAt;

	// 2. Created in the last 7 days (for more recent results)
	const sevenDaysAgo = new Date(currentDate);
	sevenDaysAgo.setDate(currentDate.getDate() - 7);
	const sevenDaysFilter = `${sevenDaysAgo.getFullYear()}-${String(sevenDaysAgo.getMonth() + 1).padStart(2, '0')}-${String(
		sevenDaysAgo.getDate()
	).padStart(2, '0')}`;

	// Search terms
	const searchTerms = ['mcp', 'model context protocol'];
	console.log('\n🔎 Search Terms:', searchTerms.join(', '));

	const dateFilters = [
		// Using only two date filters
		{ name: 'Since last run', value: lastRunFilter },
		{ name: 'Last 7 days', value: sevenDaysFilter },
	];

	// Repositories will be collected here
	let allRepositories: EnrichedRepository[] = [];
	let rateLimitEncountered = false;

	// Try each search term and date filter combination
	for (const searchTerm of searchTerms) {
		console.log(`\n📝 SEARCH TERM: "${searchTerm}"`);
		for (const filter of dateFilters) {
			// Repository limit check
			if (allRepositories.length >= MAX_REPOS_TO_FETCH) {
				console.log(`\n🛑 Maximum repo count reached (${MAX_REPOS_TO_FETCH})`);
				console.log('   Terminating search...');
				break;
			}

			// Rate limit check
			if (rateLimitEncountered) {
				console.log('\n⚠️ GitHub API rate limit exceeded');
				console.log('   Canceling remaining searches...');
				break;
			}

			// Determine date condition
			const dateCondition = filter.name === 'Since last run' ? `updated:>${filter.value}` : `created:>${filter.value}`;

			// Create search queries
			const searchQuery = encodeURIComponent(`${searchTerm} in:name,description,readme ${dateCondition}`);
			console.log(`\n🔍 Search Details:`);
			console.log(`   - Filter: ${filter.name}`);
			console.log(`   - Query: ${decodeURIComponent(searchQuery)}`);

			// Use different sort methods (for variety)
			const sortMethods = ['updated', 'stars'];
			const sort = sortMethods[Math.floor(Math.random() * sortMethods.length)];

			try {
				console.log('\n📥 Fetching data from GitHub API...');
				const repositories = await fetchReposWithQuery(searchQuery, sort, MAX_REPOS_TO_FETCH, env);
				console.log(`✅ Data fetch completed - found ${repositories.length} repos`);

				// Add results and check limit
				const previousCount = allRepositories.length;
				allRepositories = [...allRepositories, ...repositories];
				if (allRepositories.length > MAX_REPOS_TO_FETCH) {
					allRepositories = allRepositories.slice(0, MAX_REPOS_TO_FETCH);
				}
				console.log('\n📊 Search Results:');
				console.log(`   - Found in this search: ${repositories.length}`);
				console.log(`   - Total accumulated: ${allRepositories.length}`);
				console.log(`   - Newly added: ${allRepositories.length - previousCount}`);
			} catch (error) {
				if (error instanceof Error && error.message.includes('rate limit')) {
					console.log('\n❌ GitHub API Rate Limit Error:');
					console.log('   - Canceling remaining searches');
					console.log(`   - Error message: ${error.message}`);
					rateLimitEncountered = true;
					break;
				} else {
					console.error(`\n❌ Search Error (${searchTerm} + ${filter.name}):`, error);
					console.error('   Error details:', {
						message: error instanceof Error ? error.message : 'Unknown error',
						stack: error instanceof Error ? error.stack : undefined,
					});
				}
			}
		}
	}

	// Create unique repo list
	const uniqueRepos = Array.from(new Map(allRepositories.map((repo) => [repo.id, repo])).values());
	const newRepos = uniqueRepos.filter((repo) => !existingRepoIds.has(repo.id)).filter((repo) => repo.readme && repo.readme.trim() !== '');

	console.log('\n=== 📊 SCAN RESULTS ===');
	console.log(`✨ Total Repos Found: ${uniqueRepos.length}`);
	console.log(`📚 New Repos with README: ${newRepos.length}`);
	console.log(`⏱️ Process Duration: ${(new Date().getTime() - currentDate.getTime()) / 1000} seconds`);
	console.log('=========================\n');

	return newRepos;
}

export async function fetchReposWithQuery(query: string, sort: string, perPage: number, env?: Env): Promise<EnrichedRepository[]> {
	console.log('\n=== 🔍 GITHUB API QUERY ===');
	console.log(`📝 Query: ${decodeURIComponent(query)}`);
	console.log(`📊 Sort: ${sort}`);
	console.log(`🔢 Per page: ${perPage}`);

	let page = 1;
	let allRepositories: EnrichedRepository[] = [];
	let maxPages = 1;
	let retryCount = 0;

	while (page <= maxPages && retryCount < MAX_RETRIES_PER_ENDPOINT) {
		console.log(`\n📄 PROCESSING PAGE ${page}`);
		const GITHUB_API_URL = `https://api.github.com/search/repositories?q=${query}&type=repositories&sort=${sort}&order=desc&per_page=20&page=${page}`;

		try {
			const headers: HeadersInit = {
				Accept: 'application/vnd.github.v3+json',
				'User-Agent': 'Cloudflare-Worker',
			};

			// Add GitHub API Token
			if (env?.GITHUB_TOKEN) {
				headers['Authorization'] = `token ${env.GITHUB_TOKEN}`;
			} else if (typeof GITHUB_TOKEN !== 'undefined' && GITHUB_TOKEN) {
				headers['Authorization'] = `token ${GITHUB_TOKEN}`;
			}

			const response = await fetch(GITHUB_API_URL, { headers });
			const rateLimit = response.headers.get('X-RateLimit-Remaining');
			const rateLimitReset = response.headers.get('X-RateLimit-Reset');

			console.log('\n📊 GitHub API Status:');
			console.log(`   - Remaining Requests: ${rateLimit || 'Unknown'}`);
			if (rateLimitReset) {
				const resetTime = new Date(parseInt(rateLimitReset) * 1000);
				console.log(`   - Rate Limit Reset: ${resetTime.toLocaleString('en-US')}`);
			}

			if (rateLimit && parseInt(rateLimit) < 5) {
				console.warn('⚠️ GitHub API Rate Limit Critical!');
				console.warn(`   Remaining requests: ${rateLimit}`);
			}

			if (!response.ok) {
				if (response.status === 403 && (response.statusText.includes('rate limit') || response.statusText.includes('API rate limit'))) {
					console.error('GitHub API Rate Limit Error:', response.statusText);

					if (rateLimitReset) {
						const resetTime = new Date(parseInt(rateLimitReset) * 1000);
						console.log(`Rate limit will reset at: ${resetTime.toLocaleString()}`);
					}

					retryCount++;
					if (retryCount < MAX_RETRIES_PER_ENDPOINT) {
						const waitTime = RATE_LIMIT_BACKOFF_TIME * Math.pow(2, retryCount - 1);
						console.log(`Waiting ${waitTime / 1000} seconds before retry. Attempt: ${retryCount}/${MAX_RETRIES_PER_ENDPOINT}`);
						await new Promise((resolve) => setTimeout(resolve, waitTime));
						continue; // Retry with the same page
					} else {
						throw new Error('rate limit exceeded - maximum retries reached');
					}
				}
				console.error('GitHub API Error:', response.status, response.statusText);
				break;
			}

			retryCount = 0; // Reset retry counter on success

			const data = (await response.json()) as GitHubSearchResponse;
			console.log('\n📊 Page Statistics:');
			console.log(`   - Total Results: ${data.total_count}`);
			console.log(`   - On This Page: ${data.items.length}`);

			if (data.items.length === 0) {
				console.log(`Page ${page} is empty, ending search.`);
				break;
			}

			const currentTimestamp = new Date().toLocaleString('en-US', { timeZone: 'Europe/Istanbul' });

			console.log('\n📚 Processing README Files...');
			const validRepositories: EnrichedRepository[] = [];
			for (const repo of data.items) {
				try {
					const readmeContent = await fetchReadme(repo.full_name, env);
					if (!readmeContent || readmeContent.trim() === '') {
						continue;
					}

					// Determine repo type (based on description and name)
					const nameAndDesc = `${repo.name} ${repo.description || ''}`.toLowerCase();
					let type;

					if (nameAndDesc.includes('client') || nameAndDesc.includes('sdk') || nameAndDesc.includes('wrapper')) {
						type = 'Clients';
					} else if (nameAndDesc.includes('server') || nameAndDesc.includes('service') || nameAndDesc.includes('backend')) {
						type = 'Servers';
					} else {
						// Default: if name contains 'client' then 'Clients', otherwise 'Servers'
						type = repo.name.toLowerCase().includes('client') ? 'Clients' : 'Servers';
					}

					// Create an EnrichedRepository based on GitHubRepository
					const enrichedRepo: EnrichedRepository = {
						...repo,
						readme: sanitizeText(readmeContent),
						inserted_at: currentTimestamp,
						is_active: true,
						type: type,
					};

					validRepositories.push(enrichedRepo);
				} catch (error) {
					console.error(`   ❌ Error processing repo: ${repo.full_name}`);
					console.error('   Error details:', error);
				}
			}

			console.log(`Page ${page}: ${data.items.length} repos, ${validRepositories.length} have valid README files.`);

			allRepositories = [...allRepositories, ...validRepositories];

			// Filter by name and description (MCP related)
			const mcpRelevant = validRepositories.filter((repo) => {
				const nameAndDesc = `${repo.name} ${repo.description || ''}`.toLowerCase();
				return nameAndDesc.includes('mcp') || nameAndDesc.includes('model context protocol') || nameAndDesc.includes('context protocol');
			});

			console.log(`Page ${page}: ${validRepositories.length} repos, ${mcpRelevant.length} appear to be MCP related.`);

			if (data.items.length === 0) {
				break;
			}

			page++;
		} catch (error) {
			console.error('\n❌ PAGE PROCESSING ERROR:');
			console.error(`   Page: ${page}`);
			console.error('   Error:', error);

			// Retry for rate limit error
			if (error instanceof Error && error.message.includes('rate limit')) {
				retryCount++;
				if (retryCount < MAX_RETRIES_PER_ENDPOINT) {
					const waitTime = RATE_LIMIT_BACKOFF_TIME * Math.pow(2, retryCount - 1);
					console.log(
						`Rate limit error, waiting ${waitTime / 1000} seconds before retry. Attempt: ${retryCount}/${MAX_RETRIES_PER_ENDPOINT}`
					);
					await new Promise((resolve) => setTimeout(resolve, waitTime));
					continue; // Retry with the same page
				}
			}

			break;
		}
	}

	console.log('\n=== 🏁 QUERY COMPLETED ===');
	console.log(`📊 Total Repos Processed: ${allRepositories.length}`);
	console.log('=========================\n');

	return allRepositories;
}

export async function fetchReadme(repoFullName: string, env?: Env): Promise<string> {
	// Different potential README file names (common variations)
	const readmeFileNames = ['README.md', 'readme.md', 'readme.txt'];
	// Different branch names
	const branches = ['main', 'master'];
	let retryCount = 0;

	try {
		const BRANCHES_URL = `https://api.github.com/repos/${repoFullName}/branches`;

		// Prepare headers for API requests
		const headers: HeadersInit = {
			Accept: 'application/vnd.github.v3+json',
			'User-Agent': 'Cloudflare-Worker',
		};

		// Add GitHub API Token
		if (env?.GITHUB_TOKEN) {
			headers['Authorization'] = `token ${env.GITHUB_TOKEN}`;
		} else if (typeof GITHUB_TOKEN !== 'undefined' && GITHUB_TOKEN) {
			headers['Authorization'] = `token ${GITHUB_TOKEN}`;
		}

		const branchResponse = await fetch(BRANCHES_URL, { headers });

		if (!branchResponse.ok) {
			// Rate limit check
			if (branchResponse.status === 403 && retryCount < MAX_RETRIES_PER_ENDPOINT) {
				console.error(`Branch API rate limit error: ${branchResponse.status} - ${branchResponse.statusText}`);
				retryCount++;
				const waitTime = RATE_LIMIT_BACKOFF_TIME * Math.pow(2, retryCount - 1);
				console.log(`Waiting ${waitTime / 1000} seconds before retry...`);
				await new Promise((resolve) => setTimeout(resolve, waitTime));

				// Return error and let parent function handle retry
				throw new Error('rate limit exceeded');
			}

			console.error(`Branch API error: ${branchResponse.status} - ${branchResponse.statusText}`);
			return ''; // Return empty on error
		}

		if (branchResponse.ok) {
			const branchData = await branchResponse.json();
			if (Array.isArray(branchData) && branchData.length > 0) {
				// First check main and master, then try other branches
				const repoBranches = ['main', 'master']
					.filter((b) => branchData.some((rb) => rb.name === b))
					.concat(branchData.map((b) => b.name).filter((b) => b !== 'main' && b !== 'master'));

				// Check branches for README files
				for (const branch of repoBranches) {
					for (const fileName of readmeFileNames) {
						const README_URL = `https://raw.githubusercontent.com/${repoFullName}/${branch}/${fileName}`;

						try {
							// No token needed for raw.githubusercontent.com
							const response = await fetch(README_URL);
							if (response.ok) {
								const content = await response.text();
								return content;
							}
						} catch (error) {
							// Continue silently and try other combinations
						}
					}
				}
			}
		}
	} catch (error) {
		if (error instanceof Error && error.message.includes('rate limit')) {
			throw error;
		}
		console.log(`Could not get branch information: ${repoFullName}, trying classic method.`);
	}

	for (const branch of branches) {
		for (const fileName of readmeFileNames) {
			const README_URL = `https://raw.githubusercontent.com/${repoFullName}/${branch}/${fileName}`;

			try {
				const response = await fetch(README_URL);
				if (response.ok) {
					const content = await response.text();
					console.log(`README found: ${repoFullName} (${branch}/${fileName})`);
					return content;
				}
			} catch (error) {
				// Continue silently and try other combinations
			}
		}
	}

	// No README file found
	return '';
}
