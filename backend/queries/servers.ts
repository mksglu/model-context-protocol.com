import { createClient } from '@/backend/supabase/client';
import { ResponseServer } from '@/backend/types/types';

export async function getTopServers(limit: number = 10) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('servers')
    .select('id, name, html_url, description, language, stars, categories, slug')
    .eq('is_active', true)
    .order('stars', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching top servers:', error);
    return [];
  }

  return data as ResponseServer[];
}

export async function getServersWithPagination(
  page: number = 1,
  pageSize: number = 15,
  category?: string
) {
  const supabase = createClient();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let baseQuery = supabase
    .from('servers')
    .select('id', { count: 'exact', head: true })
    .eq('is_active', true);

  if (category && category !== 'All') {
    baseQuery = baseQuery.contains('categories', [category]);
  }

  const { count: totalCount, error: countError } = await baseQuery;

  if (countError) {
    console.error('Error counting servers:', countError);
    return { data: [], count: 0, totalCount: 0, totalPages: 0 };
  }

  let dataQuery = supabase
    .from('servers')
    .select('id, name, html_url, description, language, stars, categories, slug')
    .eq('is_active', true)
    .order('stars', { ascending: false })
    .range(from, to);

  if (category && category !== 'All') {
    dataQuery = dataQuery.contains('categories', [category]);
  }

  const { data, error } = await dataQuery;

  if (error) {
    console.error('Error fetching servers:', error);
    return { data: [], count: 0, totalCount: 0, totalPages: 0 };
  }

  const totalPages = Math.ceil((totalCount || 0) / pageSize);

  return {
    data: data as ResponseServer[],
    count: totalCount,
    totalCount,
    totalPages,
  };
}

interface CategoryCounts {
  [key: string]: number;
  All: number;
}

export async function getCategoryCounts(): Promise<CategoryCounts> {
  const supabase = createClient();

  const { data, error } = await supabase.from('servers').select('categories').eq('is_active', true);

  if (error) {
    console.error('Error fetching category counts:', error);
    return { All: 0 };
  }

  const categoryCounts: CategoryCounts = { All: data.length };

  data.forEach((server) => {
    if (server.categories && Array.isArray(server.categories)) {
      server.categories.forEach((category: string) => {
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      });
    }
  });

  const sortedCategories = Object.entries(categoryCounts)
    .filter(([category]) => category !== 'All')
    .sort(([, countA], [, countB]) => countB - countA);

  const sortedCategoryCounts: CategoryCounts = { All: categoryCounts.All };
  sortedCategories.forEach(([category, count]) => {
    if (count > 0) {
      sortedCategoryCounts[category] = count;
    }
  });

  return sortedCategoryCounts;
}

export async function searchServers(
  searchQuery: string,
  page: number = 1,
  pageSize: number = 15,
  category?: string
) {
  const supabase = createClient();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let baseQuery = supabase
    .from('servers')
    .select('id', { count: 'exact', head: true })
    .eq('is_active', true)
    .or(
      `name.ilike.%${searchQuery}%,` +
        `description.ilike.%${searchQuery}%,` +
        `language.ilike.%${searchQuery}%,` +
        `ai_analysis.ilike.%${searchQuery}%`
    );

  if (category && category !== 'All') {
    baseQuery = baseQuery.contains('categories', [category]);
  }

  const { count: totalCount, error: countError } = await baseQuery;

  if (countError) {
    console.error('Error counting search results:', countError);
    return { data: [], totalCount: 0, totalPages: 0 };
  }

  let dataQuery = supabase
    .from('servers')
    .select('id, name, html_url, description, language, stars, categories, slug, ai_analysis')
    .eq('is_active', true)
    .or(
      `name.ilike.%${searchQuery}%,` +
        `description.ilike.%${searchQuery}%,` +
        `language.ilike.%${searchQuery}%,` +
        `ai_analysis.ilike.%${searchQuery}%`
    )
    .order('stars', { ascending: false })
    .range(from, to);

  if (category && category !== 'All') {
    dataQuery = dataQuery.contains('categories', [category]);
  }

  const { data, error } = await dataQuery;

  if (error) {
    console.error('Error searching servers:', error);
    return { data: [], totalCount: 0, totalPages: 0 };
  }

  const totalPages = Math.ceil((totalCount || 0) / pageSize);

  return {
    data: data as ResponseServer[],
    totalCount,
    totalPages,
  };
}

export async function getServerById(slug: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('servers')
    .select('id, name, html_url, description, language, stars, categories, ai_analysis, slug')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching server by slug:', error);
    return null;
  }

  return data as ResponseServer;
}

export async function updateServerStars(repoFullName: string, env?: { GITHUB_TOKEN?: string }) {
  const supabase = createClient();

  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'Cloudflare-Worker',
    };

    if (env?.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${env.GITHUB_TOKEN}`;
    } else if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(`https://api.github.com/repos/${repoFullName}`, { headers });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} - ${response.statusText}`);
    }

    const repoData = await response.json();
    const stars = repoData.stargazers_count;

    const { error: serverError } = await supabase
      .from('servers')
      .update({ stars })
      .eq('html_url', `https://github.com/${repoFullName}`);

    if (serverError) {
      throw new Error(`Error updating server stars: ${serverError.message}`);
    }

    const { error: repoError } = await supabase
      .from('github_repos')
      .update({ stars })
      .eq('full_name', repoFullName);

    if (repoError) {
      console.error(`Error updating github_repos stars: ${repoError.message}`);
    }

    return { success: true, stars };
  } catch (error) {
    console.error('Error in updateServerStars:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
