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
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                About MCP Directory
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Learn about the Model Context Protocol and our mission
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">What is the Model Context Protocol?</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              The Model Context Protocol (MCP) is an open standard for AI model communication. It provides a standardized way for AI models to communicate with each other and with applications, enabling seamless integration and interoperability across the AI ecosystem.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">About MCP Directory</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              MCP Directory at <a href="https://model-context-protocol.com" className="text-blue-600 hover:underline font-medium">model-context-protocol.com</a> is the premier platform for discovering and connecting with MCP-compatible servers and clients. Our mission is to foster a vibrant ecosystem of AI tools and services that work together seamlessly through the Model Context Protocol.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">Our Inspiration</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              The MCP Directory was inspired by the excellent work done in the <a href="https://github.com/chatmcp/mcp-directory" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium inline-flex items-center">chatmcp/mcp-directory <ExternalLink className="ml-1 h-4 w-4" /></a> GitHub repository. We acknowledge their pioneering efforts in creating a comprehensive directory for MCP servers and have built upon that foundation to create this platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">Technology Stack</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              The MCP Directory is built using modern technologies to ensure reliability, performance, and scalability:
            </p>
            <ul className="space-y-3 pl-5 list-disc text-lg text-gray-700">
              <li className="pl-2"><span className="font-semibold">Supabase</span> - For database and authentication</li>
              <li className="pl-2"><span className="font-semibold">Cloudflare Workers</span> - For edge computing capabilities</li>
              <li className="pl-2"><span className="font-semibold">Vercel</span> - For hosting and deployment</li>
              <li className="pl-2"><span className="font-semibold">GitHub API</span> - For repository data integration</li>
              <li className="pl-2"><span className="font-semibold">Gemini AI</span> - For intelligent analysis of MCP servers and clients</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">About the Creator</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 shadow-sm">
              <p className="text-lg text-gray-700 leading-relaxed">
                I&apos;m Mert Köseoğlu, an AI & LLM consultant specializing in helping businesses leverage artificial intelligence and large language models effectively. With extensive experience in AI implementation and optimization, I help organizations transform their operations through cutting-edge AI solutions.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mt-4">
                As a Software Engineer with over 10 years of experience in development and technical leadership within fully remote, global teams, I&apos;m adept at architecting scalable solutions, building and mentoring engineering teams, and delivering high-impact software products. My expertise includes test-driven development (TDD), TypeScript, Node.js, Bun, React, React Native, AI, LLMs, and Agents.
              </p>
              <div className="mt-6">
                <a 
                  href="https://mksg.lu" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-lg"
                >
                  Visit my website
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">Acknowledgements</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Special thanks to <strong>Berkay Derin</strong> for his valuable contributions to the MCP Directory project. His insights and assistance have been instrumental in making this platform what it is today.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">Get Involved</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              There are many ways to get involved with the MCP community:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Explore Servers</h3>
                <p className="text-gray-700 mb-4 text-lg">Discover MCP-compatible servers for your AI applications.</p>
                <Link href="/servers" className="text-blue-600 hover:text-blue-800 font-medium flex items-center text-lg">
                  Browse Servers
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Explore Clients</h3>
                <p className="text-gray-700 mb-4 text-lg">Find client libraries and tools to integrate MCP into your applications.</p>
                <Link href="/clients" className="text-blue-600 hover:text-blue-800 font-medium flex items-center text-lg">
                  Browse Clients
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">Contact Us</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Have questions or suggestions? We&apos;d love to hear from you! Contact us at <a href="https://mksg.lu" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Mert Koseoglu&apos;s website</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 