import React from 'react';

import Link from 'next/link';

import { GridPattern } from '@/components/magicui/grid-pattern';

import { getAllBlogPosts } from '@/backend/queries/blog';

import { estimateReadingTime } from '@/helpers/estimateReadingTime';

import { FaBookReader, FaCalendarAlt } from 'react-icons/fa';

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <main className="relative min-h-screen w-full bg-white pb-20">
      <GridPattern
        className="absolute inset-0 opacity-70"
        width={30}
        height={30}
        strokeDasharray="1 3"
      />

      <div className="relative px-6 pb-12 pt-16 text-center">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">
            <span className="text-gray-900">MCP </span>
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="mx-auto mb-0 max-w-xl text-lg text-gray-600">
            Latest insights, tutorials, and updates from the Model Context Protocol team.
          </p>
        </div>
      </div>

      <div className="container relative z-10 mx-auto max-w-4xl px-6">
        <div className="space-y-12">
          {posts?.map((post) => {
            const readingTime = estimateReadingTime(post.content);

            return (
              <article
                key={post.id}
                className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-none transition-all duration-300 hover:shadow-sm"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="cursor-pointer p-6 sm:p-8">
                    <div className="mb-4 flex flex-wrap gap-2">
                      {post.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-gradient-to-r from-orange-500/10 to-pink-500/10 px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-orange-600"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>

                    <h2 className="mb-3 text-xl font-bold leading-tight text-gray-900 sm:text-2xl">
                      {post.title}
                    </h2>

                    <p className="mb-6 line-clamp-2 leading-relaxed text-gray-600">
                      {post.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <FaCalendarAlt size={14} className="text-orange-500" />
                        <span>
                          {new Date(post.created_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaBookReader size={14} className="text-orange-500" />
                        <span>{readingTime} min read</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
