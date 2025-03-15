import { EnrichedRepository } from '../types/github';
import { GeminiResponse } from '../types/ai';
import { sanitizeText } from '../utils/text';
import { availableCategories } from '../utils/categories';

export async function categorizeWithGemini(repositories: EnrichedRepository[], apiKey: string): Promise<EnrichedRepository[]> {
	const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
	const MAX_RETRIES = 2;
	const RETRY_DELAY = 1000;
	const BATCH_SIZE = 3;

	console.log('\n=== 🤖 AI ANALYSIS STARTED ===');
	console.log(`📊 Total Repos to Process: ${repositories.length}`);

	const analyzeRepo = async (repo: EnrichedRepository, retryCount = 0): Promise<EnrichedRepository | null> => {
		try {
			const quickCheck = (repo.name + ' ' + (repo.description || '')).toLowerCase();

			if (quickCheck.includes('mcp') || quickCheck.includes('model context protocol')) {
				const prompt = `## Repository Analysis Request

				### TASK

				Analyze the provided GitHub repository information and determine:

				1. If it implements or relates to Model Context Protocol (MCP) specifications

				2. The most appropriate categories that apply to this repository

				3. Provide a detailed technical analysis with the following structure

				### OUTPUT REQUIREMENTS

				RETURN ONLY VALID JSON in this exact format (nothing else):

				{
					"is_mcp": "YES/NO",
					"justification": "Your concise reason here (50 words max)",
					"categories": ["Category1", "Category2", "Category3"],
					"analysis": {
						"Architecture and Design Patterns": "Details here... (90-100 words)",
						"Implementation Details and Key Features": "Details here... (90-100 words)",
						"Integration Approaches and Protocols": "Details here... (90-100 words)",
						"Technical Stack and Dependencies": "Details here... (90-100 words)",
						"Best Practices and Coding Standards": "Details here... (90-100 words)",
						"Performance Considerations": "Details here... (90-100 words)",
						"Usage Examples": "Details here... (90-100 words)",
						"Additional Notes": "Details here... (90-100 words)"
					}
				}

				CRITICAL RULES:
				- Return ONLY the JSON format shown above with no Markdown formatting or extra text
				- No code blocks or backticks
				- No preamble or explanations
				- Each section in "analysis" should be 50-100 words
				- ONLY select categories from the provided list
				- Do not invent new categories
				- Maximum 3 categories

				### MCP CLASSIFICATION

				- MCP repositories typically involve communication protocols between AI models and tools/contexts
				- Look for terms like: context window management, tool use, function calling, memory management for LLMs
				- Provide a clear YES/NO determination with concise justification (max 50 words)

				### CATEGORY ASSIGNMENT

				- Select 1-3 most relevant categories from this list:

				${availableCategories.join('\n')}

				- Base selections on specific evidence from repository content
				- Do not suggest new categories outside this list

				### ANALYSIS DATA

				Repository Name: ${repo.name}

				Description: ${repo.description || '[No description provided]'}

				Documentation:

				${repo.readme ? repo.readme.substring(0, 15000) : '[No documentation available]'}

				### ANALYSIS GUIDELINES

				- Focus on objective code patterns, documentation, and stated purposes
				- Avoid speculation without evidence
				- Prioritize technical accuracy over comprehensiveness
				- Each section should be clearly marked with its header
				- Maintain consistent formatting throughout the analysis`;

				const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						contents: [{ parts: [{ text: prompt }] }],
					}),
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const result = (await response.json()) as GeminiResponse;
				const analysis = result.candidates?.[0]?.content?.parts?.[0]?.text || '';

				try {
					const jsonMatch = analysis.match(/\{[\s\S]*\}/);
					if (!jsonMatch) {
						console.error('❌ JSON format not found');
						throw new Error('JSON format not found');
					}

					const analysisJson = JSON.parse(jsonMatch[0]);
					if (!analysisJson?.is_mcp) {
						return null;
					}

					// Prepare AI analysis results
					const analyzedRepo: EnrichedRepository = {
						...repo,
						is_mcp: true,
						categories: Array.isArray(analysisJson.categories) ? analysisJson.categories : ['Protocol Implementations'],
						ai_analysis: sanitizeText(analysis),
					};

					// Generate SEO slug
					const seoSlug = await generateSeoSlug(analyzedRepo, apiKey);

					return {
						...analyzedRepo,
						slug: seoSlug,
					};
				} catch (jsonError) {
					console.error(`❌ JSON processing error (${repo.name}):`, jsonError);
					console.log('⚠️ Using default values');

					const analyzedRepo: EnrichedRepository = {
						...repo,
						is_mcp: true,
						categories: ['Not Categorized'],
						ai_analysis: 'No analysis found',
					};

					const seoSlug = await generateSeoSlug(analyzedRepo, apiKey);
					return {
						...analyzedRepo,
						slug: seoSlug,
					};
				}
			} else {
			}
			return null;
		} catch (error) {
			console.error(`\n❌ Analysis error (${repo.name}, attempt ${retryCount + 1}/${MAX_RETRIES}):`);
			console.error('   Error:', error);

			if (retryCount < MAX_RETRIES - 1) {
				console.log(`⏳ Retrying in ${RETRY_DELAY}ms...`);
				await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
				return analyzeRepo(repo, retryCount + 1);
			}
			console.log('❌ Maximum retry count reached, skipping repo');
			return null;
		}
	};

	const results: EnrichedRepository[] = [];
	let processedCount = 0;

	for (let i = 0; i < repositories.length; i += BATCH_SIZE) {
		console.log(`\n📦 BATCH PROCESS ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(repositories.length / BATCH_SIZE)}`);
		const batch = repositories.slice(i, i + BATCH_SIZE);
		console.log(`   To Process: ${batch.length} repos`);

		const batchResults = await Promise.all(batch.map((repo) => analyzeRepo(repo)));
		const validBatchResults = batchResults.filter((result): result is NonNullable<typeof result> => result !== null);

		processedCount += batch.length;
		results.push(...validBatchResults);

		console.log('\n📊 Batch Process Results:');
		console.log(`   - Processed: ${batch.length}`);
		console.log(`   - Successful: ${validBatchResults.length}`);
		console.log(
			`   - Total Progress: ${processedCount}/${repositories.length} (${Math.round((processedCount / repositories.length) * 100)}%)`
		);

		if (i + BATCH_SIZE < repositories.length) {
			console.log('⏳ Waiting for next batch (500ms)...');
			await new Promise((resolve) => setTimeout(resolve, 500));
		}
	}

	console.log('\n=== 🎉 ANALYSIS COMPLETED ===');
	console.log(`   - Total Processed: ${repositories.length}`);
	console.log(`   - MCP Related: ${results.length}`);
	console.log('============================\n');

	return results;
}

export async function generateSeoSlug(repo: EnrichedRepository, apiKey: string): Promise<string> {
	try {
		const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

		// Determine repo type
		const repoType =
			repo.type ||
			(repo.name.toLowerCase().includes('client') ? 'Clients' : repo.name.toLowerCase().includes('server') ? 'Servers' : undefined);

		const prompt = `Generate a short SEO-friendly URL slug for this repository.

Repository Info:
- Name: ${repo.name}
- Description: ${repo.description || ''}
- Type: ${repoType || ''}
- ID: ${repo.id || ''}

CRITICAL RULES:
1. Return ONLY the slug text, nothing else - no explanation, no JSON, no quotes
2. Use 2-4 words maximum
3. Include 'mcp' if the repository is related to Model Context Protocol
4. Use only lowercase letters and hyphens
5. Keep it under 40 characters
6. Must be descriptive but concise
7. Focus on the main functionality
8. IMPORTANT: Make the slug UNIQUE and SPECIFIC to this repo (avoid generic terms like just "mcp-client" or "mcp-server")
9. IMPORTANT: Include a DISTINCTIVE word from the repo name or description

Example good slugs:
- mcp-client-python-tools
- awesome-mcp-js-collection
- netbox-mcp-server
- langchain-mcp-integration
- openai-mcp-toolkit

BAD examples:
- repository-that-implements-model-context-protocol
- this-is-a-very-long-slug-for-mcp-please-dont-do-this
- json-formatted-response-with-extra-text
- mcp-client (too generic)
- mcp-server (too generic)

Return ONLY the slug text with no formatting, quotes, or extra characters.`;

		console.log('🌐 Sending request to Gemini API...');
		const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				contents: [{ parts: [{ text: prompt }] }],
			}),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = (await response.json()) as GeminiResponse;
		let suggestedSlug = result.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';

		suggestedSlug = suggestedSlug
			.replace(/^["'`]+|["'`]+$/g, '')
			.toLowerCase()
			.replace(/[^a-z0-9-]+/g, '-')
			.replace(/^-+|-+$/g, '')
			.replace(/-+/g, '-');

		if (
			suggestedSlug === 'mcp-client' ||
			suggestedSlug === 'mcp-server' ||
			suggestedSlug === 'mcp-clients' ||
			suggestedSlug === 'mcp-servers'
		) {
			const repoShortName = repo.name
				.toLowerCase()
				.replace(/[^a-z0-9-]+/g, '-')
				.split('-')[0];

			const idSuffix = repo.id ? `-${repo.id.toString().slice(-4)}` : '';
			suggestedSlug = `${suggestedSlug}-${repoShortName}${idSuffix}`;
		}

		// Slug validation
		if (!suggestedSlug || suggestedSlug.length > 50 || suggestedSlug.split('-').length > 4) {
			const baseName = repo.name
				.toLowerCase()
				.replace(/[^a-z0-9-]+/g, '-')
				.replace(/^-+|-+$/g, '')
				.split('-')
				.slice(0, 3)
				.join('-');

			const idSuffix = repo.id ? `-${repo.id.toString().slice(-4)}` : '';

			if (repo.is_mcp && !baseName.includes('mcp')) {
				suggestedSlug = `mcp-${baseName}${idSuffix}`;
			} else {
				suggestedSlug = `${baseName}${idSuffix}`;
			}
		}

		return suggestedSlug;
	} catch (error) {
		console.error('\n❌ URL generation error:', error);

		const fallbackSlug = repo.name
			.toLowerCase()
			.replace(/[^a-z0-9-]+/g, '-')
			.replace(/^-+|-+$/g, '')
			.split('-')
			.slice(0, 3)
			.join('-');

		const idSuffix = repo.id ? `-${repo.id.toString().slice(-4)}` : '';
		const finalSlug = repo.is_mcp && !fallbackSlug.includes('mcp') ? `mcp-${fallbackSlug}${idSuffix}` : `${fallbackSlug}${idSuffix}`;

		return finalSlug;
	}
}
