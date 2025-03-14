/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 */

import type { Env } from './types';
import { AiService } from './services/aiService';
import { BlogService } from './services/blogService';
import { getTurkeyDate } from './utils/dateUtils';
import type { ScheduledEvent } from '@cloudflare/workers-types';

const worker = {
	async fetch(request: Request, env: Env) {
		const url = new URL(request.url);

		if (url.pathname === '/' || url.pathname === '') {
			try {
				console.log('Blog post creation process started');
				const aiService = new AiService(env.GOOGLE_GEMINI_API_KEY);
				const blogService = new BlogService(env.SUPABASE_URL, env.SUPABASE_KEY);

				const blogPost = await aiService.generateBlogContent();
				console.log('Blog content created with AI:', { title: blogPost.title });

				const turkeyDate = getTurkeyDate();
				await blogService.createBlogPost(blogPost, turkeyDate.isoString);
				console.log('Blog post saved to database');

				const count = await blogService.getTotalPostCount();

				return new Response(
					`Technical blog post successfully generated and saved.\nTitle: ${blogPost.title}\nSlug: ${blogPost.slug}\nTotal number of technical articles: ${count}`,
					{ headers: { 'Content-Type': 'text/plain;charset=UTF-8' } },
				);
			} catch (error) {
				console.error('Error:', error);
				return new Response('An error occurred during content generation.', { status: 500 });
			}
		}

		return new Response('Endpoint not found', { status: 404 });
	},

	async scheduled(event: ScheduledEvent, env: Env) {
		console.log('Scheduled task started:', new Date().toLocaleString('tr-TR'));

		try {
			console.log('Blog post creation process started');
			const aiService = new AiService(env.GOOGLE_GEMINI_API_KEY);
			const blogService = new BlogService(env.SUPABASE_URL, env.SUPABASE_KEY);

			const blogPost = await aiService.generateBlogContent();
			console.log('Blog content created with AI:', { title: blogPost.title });

			const turkeyDate = getTurkeyDate();
			await blogService.createBlogPost(blogPost, turkeyDate.isoString);

			console.log('Scheduled task completed successfully:', {
				title: blogPost.title,
				slug: blogPost.slug,
				created_at: turkeyDate.isoString,
			});
		} catch (error) {
			console.error('Cron job failed:', error);
			throw error;
		}
	},
};

export default worker;
