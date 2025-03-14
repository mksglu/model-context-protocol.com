'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import InfiniteMovingCards from '@/components/core/home/InfiniteMovingCards';

import { getTopClients } from '@/backend/queries/clients';
import { getTopServers } from '@/backend/queries/servers';
import { Card } from '@/backend/types/types';

import { ArrowRight, Star } from 'lucide-react';

const FeatureCards = () => {
  const [topServers, setTopServers] = useState<Card[]>([]);
  const [topClients, setTopClients] = useState<Card[]>([]);

  const fetchTopServers = async () => {
    try {
      const servers = await getTopServers(10);
      setTopServers(servers);
    } catch (error) {
      console.error('Error fetching top servers:', error);
      setTopServers([]);
    }
  };

  const fetchTopClients = async () => {
    try {
      const clients = await getTopClients(10);
      setTopClients(clients);
    } catch (error) {
      console.error('Error fetching top clients:', error);
      setTopClients([]);
    }
  };

  useEffect(() => {
    fetchTopServers();
    fetchTopClients();
  }, []);

  return (
    <div className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Featured MCP Section */}
        {(topServers.length > 0 || topClients.length > 0) && (
          <div className="space-y-16">
            {/* Featured Servers */}
            {topServers.length > 0 && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">Featured Servers</h2>
                    <p className="mt-1 text-gray-600">
                      Discover top MCP-compatible servers for your AI applications
                    </p>
                  </div>
                  <Link
                    href="/servers"
                    className="inline-flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                  >
                    View all
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="rounded-md border border-gray-200 bg-white p-4">
                  <InfiniteMovingCards
                    items={topServers}
                    direction="left"
                    speed="slow"
                    type="servers"
                  />
                </div>
              </div>
            )}

            {/* Featured Clients */}
            {topClients.length > 0 && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">Featured Clients</h2>
                    <p className="mt-1 text-gray-600">Explore popular MCP client implementations</p>
                  </div>
                  <Link
                    href="/clients"
                    className="inline-flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                  >
                    View all
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="rounded-md border border-gray-200 bg-white p-4">
                  <InfiniteMovingCards
                    items={topClients}
                    direction="right"
                    speed="slow"
                    type="clients"
                  />
                </div>
              </div>
            )}

            {/* Trending Repositories */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Trending in MCP Ecosystem
                  </h2>
                  <p className="mt-1 text-gray-600">
                    Popular repositories in the Model Context Protocol community
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {topServers.slice(0, 2).map((server) => (
                  <div
                    key={server.id}
                    className="rounded-md border border-gray-200 bg-white p-6 transition-shadow hover:shadow-sm"
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <h3 className="truncate text-lg font-medium text-blue-600 hover:underline">
                        <Link href={`/servers/${server.slug}`}>{server.name}</Link>
                      </h3>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Star className="h-4 w-4 fill-current text-amber-400" />
                        <span className="text-xs font-medium">{server.stars}</span>
                      </div>
                    </div>
                    <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                      {server.description || 'No description provided'}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      {server.language && (
                        <div className="flex items-center gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                          <span>{server.language}</span>
                        </div>
                      )}
                      {server.categories && server.categories.length > 0 && (
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600">
                          {server.categories[0]}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {topClients.slice(0, 2).map((client) => (
                  <div
                    key={client.id}
                    className="rounded-md border border-gray-200 bg-white p-6 transition-shadow hover:shadow-sm"
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <h3 className="truncate text-lg font-medium text-blue-600 hover:underline">
                        <Link href={`/clients/${client.slug}`}>{client.name}</Link>
                      </h3>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Star className="h-4 w-4 fill-current text-amber-400" />
                        <span className="text-xs font-medium">{client.stars}</span>
                      </div>
                    </div>
                    <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                      {client.description || 'No description provided'}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      {client.language && (
                        <div className="flex items-center gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                          <span>{client.language}</span>
                        </div>
                      )}
                      {client.categories && client.categories.length > 0 && (
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600">
                          {client.categories[0]}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatureCards;
