import { createClient } from '@/backend/supabase/client';
import { ResponseClient } from '@/backend/types/types';

export async function getTopClients(limit: number = 10) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('clients')
    .select('id, name, html_url, description, language, stars, categories, slug')
    .eq('is_active', true)
    .order('stars', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching top clients:', error);
    return [];
  }

  return data as ResponseClient[];
}

export async function getClientsWithPagination(
  page: number = 1,
  pageSize: number = 15,
  category?: string
) {
  const supabase = createClient();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let baseQuery = supabase
    .from('clients')
    .select('id', { count: 'exact', head: true })
    .eq('is_active', true);

  if (category && category !== 'All') {
    baseQuery = baseQuery.contains('categories', [category]);
  }

  const { count: totalCount, error: countError } = await baseQuery;

  if (countError) {
    console.error('Error counting clients:', countError);
    return { data: [], count: 0, totalCount: 0, totalPages: 0 };
  }

  let dataQuery = supabase
    .from('clients')
    .select('id, name, html_url, description, language, stars, categories, slug')
    .eq('is_active', true)
    .order('stars', { ascending: false })
    .range(from, to);

  if (category && category !== 'All') {
    dataQuery = dataQuery.contains('categories', [category]);
  }

  const { data, error } = await dataQuery;

  if (error) {
    console.error('Error fetching clients:', error);
    return { data: [], count: 0, totalCount: 0, totalPages: 0 };
  }

  const totalPages = Math.ceil((totalCount || 0) / pageSize);

  return {
    data: data as ResponseClient[],
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

  const { data, error } = await supabase.from('clients').select('categories').eq('is_active', true);

  if (error) {
    console.error('Error fetching category counts:', error);
    return { All: 0 };
  }

  const categoryCounts: CategoryCounts = { All: 0 };

  data.forEach((client) => {
    if (client.categories) {
      categoryCounts.All++;
      client.categories.forEach((category: string) => {
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      });
    }
  });

  return categoryCounts;
}

export async function searchClients(
  searchQuery: string,
  page: number = 1,
  pageSize: number = 15,
  category?: string
) {
  const supabase = createClient();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let baseQuery = supabase
    .from('clients')
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
    .from('clients')
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
    console.error('Error searching clients:', error);
    return { data: [], totalCount: 0, totalPages: 0 };
  }

  const totalPages = Math.ceil((totalCount || 0) / pageSize);

  return {
    data: data as ResponseClient[],
    totalCount,
    totalPages,
  };
}

export async function getClientById(slug: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('clients')
    .select('id, name, html_url, description, language, stars, categories, ai_analysis, slug')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching client by slug:', error);
    return null;
  }

  return data as ResponseClient;
}
