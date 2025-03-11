import React from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Model Context Protocol | MCP',
  description: 'Discover the latest handpicked blog entries to get started.',
};

const BlogLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div>{children}</div>;
};

export default BlogLayout;
