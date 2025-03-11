import React from 'react';

import { Metadata } from 'next';

import { getServerById } from '@/backend/queries/servers';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const server = await getServerById(params.slug);

  if (!server) {
    return {
      title: 'Server Not Found | MCP',
      description: 'The server you are looking for could not be found.',
    };
  }

  return {
    title: `${server.name} | Model Context Protocol`,
    description: server.description || 'No description available',
  };
}

const ServerDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default ServerDetailLayout;
