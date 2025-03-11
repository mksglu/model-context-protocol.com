import React from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clients | Model Context Protocol | MCP',
  description: 'Discover the latest handpicked clients to get started.',
};

const ClientsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div>{children}</div>;
};

export default ClientsLayout;
