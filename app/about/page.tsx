import React from 'react';

import Link from 'next/link';

import { ArrowRight, ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'About MCP Directory | Model Context Protocol',
  description: 'Learn about the Model Context Protocol Directory - the premier platform for discovering and connecting with MCP-compatible servers and clients.',
  keywords: ['MCP', 'Model Context Protocol', 'AI', 'LLM', 'Directory', 'model-context-protocol.com'],
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-semibold text-gray-900 leading-tight">
                About MCP Directory
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Learn about the Model Context Protocol and our mission
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="prose prose-gray max-w-none">
          <h2>What is the Model Context Protocol?</h2>
          <p>
            The Model Context Protocol (MCP) is an open standard for AI model communication. It provides a standardized way for AI models to communicate with each other and with applications, enabling seamless integration and interoperability across the AI ecosystem.
          </p>
          
          <h2>About MCP Directory</h2>
          <p>
            MCP Directory at <a href="https://model-context-protocol.com" className="text-blue-600 hover:underline">model-context-protocol.com</a> is the premier platform for discovering and connecting with MCP-compatible servers and clients. Our mission is to foster a vibrant ecosystem of AI tools and services that work together seamlessly through the Model Context Protocol.
          </p>
          
          <h2>Our Inspiration</h2>
          <p>
            The MCP Directory was inspired by the excellent work done in the <a href="https://github.com/chatmcp/mcp-directory" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">chatmcp/mcp-directory <ExternalLink className="ml-1 h-3 w-3 inline" /></a> GitHub repository. We acknowledge their pioneering efforts in creating a comprehensive directory for MCP servers and have built upon that foundation to create this platform.
          </p>

          <h2>Technology Stack</h2>
          <p>
            The MCP Directory is built using modern technologies to ensure reliability, performance, and scalability:
          </p>
          <ul>
            <li><strong>Supabase</strong> - For database and authentication</li>
            <li><strong>Cloudflare Workers</strong> - For edge computing capabilities</li>
            <li><strong>Vercel</strong> - For hosting and deployment</li>
            <li><strong>GitHub API</strong> - For repository data integration</li>
            <li><strong>Gemini AI</strong> - For intelligent analysis of MCP servers and clients</li>
          </ul>
          
          <h2>About the Creator</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-6">
            <p className="text-gray-700">
              I&apos;m Mert Köseoğlu, an AI & LLM consultant specializing in helping businesses leverage artificial intelligence and large language models effectively. With extensive experience in AI implementation and optimization, I help organizations transform their operations through cutting-edge AI solutions.
            </p>
            <p className="text-gray-700 mt-4">
              As a Software Engineer with over 10 years of experience in development and technical leadership within fully remote, global teams, I&apos;m adept at architecting scalable solutions, building and mentoring engineering teams, and delivering high-impact software products. My expertise includes test-driven development (TDD), TypeScript, Node.js, Bun, React, React Native, AI, LLMs, and Agents.
            </p>
            <div className="mt-4">
              <a 
                href="https://mksg.lu" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                Visit my website
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
          
          <h2>Acknowledgements</h2>
          <p>
            Special thanks to <strong>Berkay Derin</strong> for his valuable contributions to the MCP Directory project. His insights and assistance have been instrumental in making this platform what it is today.
          </p>
          
          <h2>Get Involved</h2>
          <p>
            There are many ways to get involved with the MCP community:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose mt-6">
            <div className="border border-gray-200 rounded-md p-6 hover:shadow-sm transition-shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Explore Servers</h3>
              <p className="text-gray-600 mb-4">Discover MCP-compatible servers for your AI applications.</p>
              <Link href="/servers" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                Browse Servers
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
            
            <div className="border border-gray-200 rounded-md p-6 hover:shadow-sm transition-shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Explore Clients</h3>
              <p className="text-gray-600 mb-4">Find client libraries and tools to integrate MCP into your applications.</p>
              <Link href="/clients" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                Browse Clients
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>
          
          <h2 className="mt-8">Contact Us</h2>
          <p>
            Have questions or suggestions? We&apos;d love to hear from you! Contact us at <a href="https://mksg.lu" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Mert Koseoglu&apos;s website</a>.
          </p>
        </div>
      </div>
    </div>
  );
} 