export type Card = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stars: number;
  categories: string[] | null;
  slug?: string;
};

export interface ResponseServer {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stars: number;
  categories: string[] | null;
  ai_analysis?: string | null;
  slug: string;
}

export interface ResponseClient {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stars: number;
  categories: string[] | null;
  ai_analysis?: string | null;
  slug: string;
}

export interface ResponseBlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  keywords: string[];
  slug: string;
  created_date: string;
}
