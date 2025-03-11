import { createClient } from '@/backend/supabase/client';

import { ResponseBlogPost } from '../types/types';

export async function getAllBlogPosts() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('id', { ascending: false })
    .limit(100);

  if (error) {
    return null;
  }

  return data as ResponseBlogPost[];
}

export async function getBlogPostBySlug(slug: string) {
  const supabase = createClient();

  const { data, error } = await supabase.from('blog_posts').select('*').eq('slug', slug).single();

  if (error) {
    console.error('Error fetching blog post by slug:', error);
    return null;
  }

  return data as ResponseBlogPost;
}
