import React from 'react';

import Link from 'next/link';

import { getAllBlogPosts } from '@/backend/queries/blog';

import { estimateReadingTime } from '@/helpers/estimateReadingTime';

import { CalendarDays, Clock } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-semibold text-gray-900 leading-tight">
                MCP Blog
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Latest insights, tutorials, and updates from the Model Context Protocol team
              </p>
            </div>
            <div className="mt-4 md:mt-0 md:ml-4 flex space-x-3">
              <a
                href="https://github.com/mksglu/mcp-base"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                <FaGithub className="mr-2 h-4 w-4" />
                View on GitHub
              </a>
              <Link
                href="/docs"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2da44e] hover:bg-[#2c974b] focus:outline-none"
              >
                Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Blog Posts */}
        <div className="space-y-8">
          {posts?.map((post) => {
            const readingTime = estimateReadingTime(post.content);

            return (
              <article
                key={post.id}
                className="bg-white border border-gray-200 rounded-md overflow-hidden hover:shadow-sm transition-shadow"
              >
                <Link href={`/blog/${post.slug}`} className="block p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5 text-gray-400" />
                      <span>
                        {new Date(post.created_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-gray-400" />
                      <span>{readingTime} min read</span>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}

          {(!posts || posts.length === 0) && (
            <div className="text-center py-12 border border-gray-200 rounded-md">
              <FaGithub className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No blog posts found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Check back later for new content from the MCP team.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
