import { createClient } from '@supabase/supabase-js';
import type { BlogPostGeneration } from '../types';

export class BlogService {
	private supabase;

	constructor(supabaseUrl: string, supabaseKey: string) {
		this.supabase = createClient(supabaseUrl, supabaseKey);
	}

	async createBlogPost(post: BlogPostGeneration, created_date: string) {
		console.log('Blog post creation request:', { title: post.title, slug: post.slug });

		const { data: existingPost } = await this.supabase.from('blog_posts').select('slug').eq('slug', post.slug).maybeSingle();

		if (existingPost) {
			const timestamp = Date.now();
			post.slug = `${post.slug}-${timestamp}`;
			console.log('Duplicate slug found, generated new slug:', post.slug);
		}

		const uniqueId = Date.now();
		console.log('Generated unique ID:', uniqueId);

		const { error } = await this.supabase.from('blog_posts').insert([
			{
				id: uniqueId,
				title: post.title,
				description: post.description,
				content: post.content,
				keywords: post.keywords,
				slug: post.slug,
				created_date,
			},
		]);

		if (error) {
			console.error('Error creating blog post:', error.message);
			throw new Error(`Failed to insert blog post: ${error.message}`);
		}
		console.log('Blog post successfully created');
	}

	async getTotalPostCount() {
		console.log('Getting total blog post count');
		const { count, error } = await this.supabase.from('blog_posts').select('*', { count: 'exact' });

		if (error) {
			console.error('Error getting post count:', error.message);
			throw new Error(`Failed to get post count: ${error.message}`);
		}

		console.log('Total blog post count:', count);
		return count;
	}
}
