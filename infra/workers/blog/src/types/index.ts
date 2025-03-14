export interface Env {
	SUPABASE_URL: string;
	SUPABASE_KEY: string;
	GOOGLE_GEMINI_API_KEY: string;
}

export interface GeminiResponse {
	candidates?: Array<{
		content?: {
			parts?: Array<{
				text?: string;
			}>;
		};
	}>;
}

export interface BlogPostGeneration {
	title: string;
	content: string;
	description: string;
	keywords: string[];
	slug: string;
}
