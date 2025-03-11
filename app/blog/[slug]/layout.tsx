import React from 'react';

import { Metadata } from 'next';

import { getBlogPostBySlug } from '@/backend/queries/blog';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found | MCP',
      description: 'The blog post you are looking for could not be found.',
    };
  }

  return {
    title: `${post.title} | Model Context Protocol`,
    description: post.description,
    keywords: post.keywords,
  };
}

const BlogDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default BlogDetailLayout;
