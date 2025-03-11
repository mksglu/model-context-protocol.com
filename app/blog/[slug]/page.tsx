import './blog.css';

import React from 'react';

import Link from 'next/link';
import { notFound } from 'next/navigation';

import ShareButtons from '@/components/core/blog/shareButtons';
import { GridPattern } from '@/components/magicui/grid-pattern';

import { getBlogPostBySlug } from '@/backend/queries/blog';

import { estimateReadingTime } from '@/helpers/estimateReadingTime';

import { ChevronLeftIcon } from '@radix-ui/react-icons';
import Marked from 'marked-react';
import { FaBookReader, FaCalendarAlt } from 'react-icons/fa';

async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${params.slug}`;
  const readingTime = estimateReadingTime(post.content);

  return (
    <main className="relative min-h-screen w-full bg-white">
      <GridPattern
        className="absolute inset-0 opacity-70"
        width={30}
        height={30}
        strokeDasharray="1 3"
      />

      <div className="container relative z-10 mx-auto max-w-3xl px-6 pt-8">
        <Link
          href="/blog"
          className="group inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ChevronLeftIcon className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Blog
        </Link>
      </div>

      <article className="container relative z-10 mx-auto max-w-3xl px-6 py-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {post.keywords.map((keyword, index) => (
            <span
              key={index}
              className="rounded-full bg-gradient-to-r from-orange-500/10 to-pink-500/10 px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-orange-600"
            >
              {keyword}
            </span>
          ))}
        </div>

        <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
          {post.title}
        </h1>

        <div className="mb-8 flex flex-wrap items-center gap-4 border-b-2 border-gray-100 pb-6 text-sm text-gray-500">
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
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-gray-500">Share:</span>
            <ShareButtons post={post} shareUrl={shareUrl} />
          </div>
        </div>

        <p className="mb-8 text-xl leading-relaxed text-gray-700">{post.description}</p>

        <div className="blog-content">
          <Marked>{post.content}</Marked>
        </div>

        <div className="mt-16 border-t-2 border-gray-100 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/blog"
              className="group inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ChevronLeftIcon className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Blog
            </Link>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Share this article:</span>
              <ShareButtons post={post} shareUrl={shareUrl} />
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

export default BlogDetailPage;
