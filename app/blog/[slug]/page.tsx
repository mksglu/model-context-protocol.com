import './blog.css';

import React from 'react';

import Link from 'next/link';
import { notFound } from 'next/navigation';

import ShareButton from '@/components/core/blog/ShareButton';
import ShareButtons from '@/components/core/blog/shareButtons';

import { getBlogPostBySlug } from '@/backend/queries/blog';

import { estimateReadingTime } from '@/helpers/estimateReadingTime';

import { ArrowLeft, CalendarDays, Clock } from 'lucide-react';
import Marked from 'marked-react';
import { FaGithub } from 'react-icons/fa6';

async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${params.slug}`;
  const readingTime = estimateReadingTime(post.content);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Blog
            </Link>
            <div className="flex items-center space-x-4">
              <a
                href="https://modelcontextprotocol.io/introduction"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <ShareButton title={post.title} description={post.description} url={shareUrl} />
            </div>
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {post.keywords.map((keyword, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600"
            >
              {keyword}
            </span>
          ))}
        </div>

        <h1 className="mb-4 text-3xl font-bold text-gray-900">{post.title}</h1>

        <div className="mb-8 flex items-center gap-4 border-b border-gray-200 pb-8 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4 text-gray-400" />
            <span>
              {new Date(post.created_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-gray-400" />
            <span>{readingTime} min read</span>
          </div>
        </div>

        <div className="prose prose-gray blog-content max-w-none">
          <Marked>{post.content}</Marked>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to all posts
            </Link>
            <ShareButtons url={shareUrl} title={post.title} />
          </div>
        </div>
      </article>
    </div>
  );
}

export default BlogDetailPage;
