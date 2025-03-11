import React from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Model Context Protocol | MCP',
  description: 'Discover the latest handpicked blog entries to get started.',
};

const TermsOfServiceLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div>{children}</div>;
};

export default TermsOfServiceLayout;
