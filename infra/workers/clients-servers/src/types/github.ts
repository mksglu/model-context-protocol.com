export interface GitHubSearchResponse {
	total_count: number;
	items: Array<GitHubRepository>;
}

export interface GitHubRepository {
	id: number;
	name: string;
	full_name: string;
	html_url: string;
	description: string | null;
	created_at: string;
	updated_at: string;
	language: string;
	stargazers_count: number;
}

export interface EnrichedRepository extends GitHubRepository {
	readme?: string;
	inserted_at?: string;
	is_active?: boolean;
	type?: string;
	categories?: string[];
	ai_analysis?: string;
	is_mcp?: boolean;
	slug?: string;
}
