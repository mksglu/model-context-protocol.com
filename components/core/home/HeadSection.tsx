'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { createClient } from '@/backend/supabase/client';

import { ArrowRight, Server, Code } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

const HeadSection = () => {
  const [stats, setStats] = useState({
    serverCount: 0,
    clientCount: 0,
    loading: true
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
          loading: false
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats(prev => ({ ...prev, loading: false }));
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
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Column - Text Content */}
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6">
              Model Context Protocol Directory
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover and connect with high-performance MCP servers and clients. The premier platform for AI model deployment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/servers" 
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#2da44e] hover:bg-[#2c974b]"
              >
                Explore Servers
              </Link>
              <Link 
                href="/clients" 
                className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Browse Clients
              </Link>
            </div>
          </div>
          
          {/* Right Column - Stats Card */}
          <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">MCP Ecosystem Stats</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-md p-4">
                <div className="flex items-center text-gray-600 mb-1">
                  <Server className="h-4 w-4 mr-1" />
                  <span className="text-sm">Servers</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.loading ? '...' : formatCount(stats.serverCount)}
                </p>
                <p className="text-sm text-gray-500">Available servers</p>
              </div>
              <div className="border border-gray-200 rounded-md p-4">
                <div className="flex items-center text-gray-600 mb-1">
                  <Code className="h-4 w-4 mr-1" />
                  <span className="text-sm">Clients</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.loading ? '...' : formatCount(stats.clientCount)}
                </p>
                <p className="text-sm text-gray-500">Client implementations</p>
              </div>
              <div className="border border-gray-200 rounded-md p-4 col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Official Documentation</p>
                    <p className="text-md font-semibold text-gray-900">modelcontextprotocol.io</p>
                  </div>
                  <Link 
                    href="https://modelcontextprotocol.io/introduction" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
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
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-gray-200 rounded-md p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center mb-4">
              <Server className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Find MCP Servers</h3>
            <p className="text-gray-600 mb-4">Discover and connect to high-performance MCP servers for your AI applications.</p>
            <Link href="/servers" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
              Browse Servers
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
          
          <div className="border border-gray-200 rounded-md p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-md flex items-center justify-center mb-4">
              <Code className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Explore Clients</h3>
            <p className="text-gray-600 mb-4">Find client libraries and tools to integrate MCP into your applications.</p>
            <Link href="/clients" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
              View Clients
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
          
          <div className="border border-gray-200 rounded-md p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-md flex items-center justify-center mb-4">
              <FaGithub className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Contribute</h3>
            <p className="text-gray-600 mb-4">Join the MCP community and contribute to the ecosystem&apos;s growth.</p>
            <Link 
              href="https://modelcontextprotocol.io/introduction" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
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
