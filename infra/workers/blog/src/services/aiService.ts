import type { BlogPostGeneration, GeminiResponse } from '../types';

export class AiService {
	private apiKey: string;

	constructor(apiKey: string) {
		this.apiKey = apiKey;
	}

	async generateBlogContent(): Promise<BlogPostGeneration> {
		console.log('Started generating blog content with AI');
		const prompt = `Generate a comprehensive technical blog post about Model Context Protocol (MCP).
        The output must follow this exact format and requirements:

        TITLE:
        [Generate an engaging technical title about MCP - max 70 characters. Focus on technical aspects, implementation details, or architectural insights.]

        DESCRIPTION:
        [Write exactly 50 words describing the technical aspects of MCP. Focus on core technical concepts, implementation challenges, or architectural innovations.]

        KEYWORDS:
        [⚠️ Extract 2-3 most important technical terms from the DESCRIPTION above and format them as a JSON array.
        - Keywords MUST be terms that appear in the description
        - Choose the most technically significant terms
        - Format as JSON array
        Example: If description mentions "semantic memory networks" and "context management", keywords should be: ["semantic memory networks", "context management"]]
		
        SLUG:
        [⚠️ EXTREMELY IMPORTANT: Generate a URL-friendly slug that will be used DIRECTLY. Must follow these STRICT rules:
        - ABSOLUTELY NO DATES OR NUMBERS ALLOWED - VIOLATION OF THIS WILL CAUSE IMMEDIATE REJECTION
        - Use only lowercase letters and hyphens (a-z and - only)
        - Must be 3-6 technical words related to MCP concepts
        - Focus on the CORE technical topic, using specific technical terms
        - MUST START WITH 'model-context-protocol'
        - HIGHLY PREFERRED FORMAT: model-context-protocol-biomimetic-memory-systems
        
        Examples of good slugs:
        ✅ model-context-protocol-semantic-memory-architecture
        ✅ model-context-protocol-implementation-patterns-guide
        ✅ model-context-protocol-biomimetic-systems-design
        
        CONTENT:
        [Generate a detailed technical blog post with 3000-4000 words, following this structure:
        1. Start with a # Main Title (use the same title as above)
        2. ## Executive Summary (brief technical overview)
        3. ## Technical Architecture
           - Core components
           - Data structures
           - Implementation specifications
        4. ## Implementation Details
           - Include detailed code examples in TypeScript/Python
           - Show data structures and algorithms
           - Explain key technical decisions
        5. ## Performance Metrics & Benchmarks
           - Include comparison tables
           - Show quantitative improvements
        6. ## Case Studies
           - Real-world implementation examples
           - Technical challenges and solutions
        7. ## Future Research Directions
        8. ## Implementation Guide
        9. ## Conclusion

        Requirements:
        - Focus heavily on technical implementation details
        - Include at least 3-4 detailed code snippets showing actual implementations
        - Use markdown formatting with proper headings
        - Include tables for comparisons and metrics
        - Show both high-level architecture and low-level implementation details
        - Include specific technical challenges and their solutions
        - Maintain professional technical tone throughout
        - Use proper technical terminology
        - Include implementation patterns and anti-patterns
        - Reference specific use cases with technical metrics]`;

		const response = await fetch(
			`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					contents: [{ parts: [{ text: prompt }] }],
					generationConfig: {
						temperature: 0.7,
						topK: 40,
						topP: 0.8,
						maxOutputTokens: 4096,
					},
				}),
			}
		);

		console.log('AI response received, processing');
		const data = (await response.json()) as GeminiResponse;
		return this.parseAiResponse(data);
	}

	private parseAiResponse(data: GeminiResponse): BlogPostGeneration {
		console.log('Parsing AI response');
		const fullText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

		const titleMatch = fullText.match(/TITLE:\s*([^\n]+)/);
		const descriptionMatch = fullText.match(/DESCRIPTION:\s*([^\n]+)/);
		const keywordsMatch = fullText.match(/KEYWORDS:\s*([^\n]+)/);
		const slugMatch = fullText.match(/SLUG:\s*([^\n]+)/);
		const contentMatch = fullText.match(/CONTENT:\s*([\s\S]+)$/);

		let keywordsArray: string[] = [];
		try {
			const keywordsText = keywordsMatch?.[1]?.trim() || '[]';
			keywordsArray = JSON.parse(keywordsText);
		} catch {
			console.warn('Failed to parse keywords, using default values');
			keywordsArray = ['model-context-protocol', 'mcp-implementation', 'ai-communication'];
		}

		const result = {
			title: titleMatch?.[1]?.trim() || 'Implementing Model Context Protocol: A Technical Guide',
			description:
				descriptionMatch?.[1]?.trim() ||
				'A comprehensive technical guide to implementing Model Context Protocol (MCP) in modern AI applications, focusing on server-client architecture and best practices.',
			keywords: keywordsArray,
			content: contentMatch?.[1]?.trim() || 'Technical content generation failed.',
			slug: slugMatch?.[1]?.trim().toLowerCase() || 'model-context-protocol-biomimetic-memory-systems',
		};

		console.log('Blog content successfully generated:', { title: result.title, keywords: result.keywords });
		return result;
	}
}
