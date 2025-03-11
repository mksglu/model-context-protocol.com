import React from 'react';

import { Metadata } from 'next';

import { getClientById } from '@/backend/queries/clients';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const client = await getClientById(params.slug);

  if (!client) {
    return {
      title: 'Client Not Found',
      description: 'The requested MCP client could not be found.',
    };
  }

  return {
    title: `${client.name} - MCP Client`,
    description: client.description || 'MCP client details',
  };
}

const ServerDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default ServerDetailLayout;
