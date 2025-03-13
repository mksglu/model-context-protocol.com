'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { createClient } from '@/backend/supabase/client';

import { ArrowRight, Code, Server } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

const HeadSection = () => {
  const [stats, setStats] = useState({
    serverCount: 0,
    clientCount: 0,
    loading: true,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const supabase = createClient();

        // Get server count
        const { count: serverCount, error: serverError } = await supabase
          .from('servers')
          .select('id', { count: 'exact', head: true })
          .eq('is_active', true);

        if (serverError) throw serverError;

        // Get client count
        const { count: clientCount, error: clientError } = await supabase
          .from('clients')
          .select('id', { count: 'exact', head: true })
          .eq('is_active', true);

        if (clientError) throw clientError;

        setStats({
          serverCount: serverCount || 0,
          clientCount: clientCount || 0,
          loading: false,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  // Format the count with a "+" if it's greater than or equal to 10
  const formatCount = (count: number) => {
    if (count >= 10) {
      return `${count}+`;
    }
    return count.toString();
  };

  return (
    <div className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
          {/* Left Column - Text Content */}
          <div className="max-w-2xl">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Model Context Protocol Directory
            </h1>
            <p className="mb-8 text-xl text-gray-600">
              Discover and connect with high-performance MCP servers and clients. The premier
              platform for AI model deployment.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/servers"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#2da44e] px-5 py-3 text-base font-medium text-white hover:bg-[#2c974b]"
              >
                Explore Servers
              </Link>
              <Link
                href="/clients"
                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-5 py-3 text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                Browse Clients
              </Link>
            </div>
          </div>

          {/* Right Column - Stats Card */}
          <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center">
              <h2 className="text-xl font-semibold text-gray-900">MCP Ecosystem Stats</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-md border border-gray-200 p-4">
                <div className="mb-1 flex items-center text-gray-600">
                  <Server className="mr-1 h-4 w-4" />
                  <span className="text-sm">Servers</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.loading ? '...' : formatCount(stats.serverCount)}
                </p>
                <p className="text-sm text-gray-500">Available servers</p>
              </div>
              <div className="rounded-md border border-gray-200 p-4">
                <div className="mb-1 flex items-center text-gray-600">
                  <Code className="mr-1 h-4 w-4" />
                  <span className="text-sm">Clients</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.loading ? '...' : formatCount(stats.clientCount)}
                </p>
                <p className="text-sm text-gray-500">Client implementations</p>
              </div>
              <div className="col-span-2 rounded-md border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Official Documentation</p>
                    <p className="text-md font-semibold text-gray-900">modelcontextprotocol.io</p>
                  </div>
                  <Link
                    href="https://modelcontextprotocol.io/introduction"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    View Docs
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-md border border-gray-200 p-6 transition-shadow hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-blue-100">
              <Server className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">Find MCP Servers</h3>
            <p className="mb-4 text-gray-600">
              Discover and connect to high-performance MCP servers for your AI applications.
            </p>
            <Link
              href="/servers"
              className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Browse Servers
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>

          <div className="rounded-md border border-gray-200 p-6 transition-shadow hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-green-100">
              <Code className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">Explore Clients</h3>
            <p className="mb-4 text-gray-600">
              Find client libraries and tools to integrate MCP into your applications.
            </p>
            <Link
              href="/clients"
              className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              View Clients
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>

          <div className="rounded-md border border-gray-200 p-6 transition-shadow hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-purple-100">
              <FaGithub className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">Contribute</h3>
            <p className="mb-4 text-gray-600">
              Join the MCP community and contribute to the ecosystem&apos;s growth.
            </p>
            <Link
              href="https://modelcontextprotocol.io/introduction"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Official Website
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadSection;
