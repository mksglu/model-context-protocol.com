'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import InfiniteMovingCards from '@/components/core/home/InfiniteMovingCards';
import { getTopClients } from '@/backend/queries/clients';
import { getTopServers } from '@/backend/queries/servers';
import { Card } from '@/backend/types/types';
import { ArrowRight } from 'lucide-react';

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
    <div className="relative w-full py-24">
      <div className="container mx-auto px-4">
        {/* Featured MCP Section */}
        {(topServers.length > 0 || topClients.length > 0) && (
          <div className="space-y-24">
            {/* Featured Servers */}
            {topServers.length > 0 && (
              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-3xl font-bold mb-2">Featured Servers</h3>
                    <p className="text-xl text-gray-600">
                      Discover top MCP-compatible servers
                    </p>
                  </div>
                  <Link
                    href="/servers"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors"
                  >
                    Browse All
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="relative">
                  <InfiniteMovingCards items={topServers} direction="left" speed="slow" type="servers" />
                </div>
              </div>
            )}

            {/* Featured Clients */}
            {topClients.length > 0 && (
              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-3xl font-bold mb-2">Featured Clients</h3>
                    <p className="text-xl text-gray-600">
                      Explore popular MCP implementations
                    </p>
                  </div>
                  <Link
                    href="/clients"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors"
                  >
                    Browse All
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="relative">
                  <InfiniteMovingCards items={topClients} direction="right" speed="slow" type="clients" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatureCards;
