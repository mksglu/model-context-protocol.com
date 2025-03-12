import React from 'react';

import Link from 'next/link';

import { ArrowRight, ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'About MCP Directory | Model Context Protocol',
  description:
    'Learn about the Model Context Protocol Directory - the premier platform for discovering and connecting with MCP-compatible servers and clients.',
  keywords: [
    'MCP',
    'Model Context Protocol',
    'AI',
    'LLM',
    'Directory',
    'model-context-protocol.com',
  ],
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl font-bold leading-tight text-gray-900">
                About MCP Directory
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Learn about the Model Context Protocol and our mission
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <section>
            <h2 className="mb-4 border-b border-gray-200 pb-2 text-2xl font-bold text-gray-900">
              What is the Model Context Protocol?
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              The Model Context Protocol (MCP) is an open standard for AI model communication. It
              provides a standardized way for AI models to communicate with each other and with
              applications, enabling seamless integration and interoperability across the AI
              ecosystem.
            </p>
          </section>

          <section>
            <h2 className="mb-4 border-b border-gray-200 pb-2 text-2xl font-bold text-gray-900">
              About MCP Directory
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              MCP Directory at{' '}
              <a
                href="https://model-context-protocol.com"
                className="font-medium text-blue-600 hover:underline"
              >
                model-context-protocol.com
              </a>{' '}
              is the premier platform for discovering and connecting with MCP-compatible servers and
              clients. Our mission is to foster a vibrant ecosystem of AI tools and services that
              work together seamlessly through the Model Context Protocol.
            </p>
          </section>

          <section>
            <h2 className="mb-4 border-b border-gray-200 pb-2 text-2xl font-bold text-gray-900">
              Our Inspiration
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              The MCP Directory was inspired by the excellent work done in the{' '}
              <a
                href="https://github.com/chatmcp/mcp-directory"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-medium text-blue-600 hover:underline"
              >
                chatmcp/mcp-directory <ExternalLink className="ml-1 h-4 w-4" />
              </a>{' '}
              GitHub repository. We acknowledge their pioneering efforts in creating a comprehensive
              directory for MCP servers and have built upon that foundation to create this platform.
            </p>
          </section>

          <section>
            <h2 className="mb-4 border-b border-gray-200 pb-2 text-2xl font-bold text-gray-900">
              Technology Stack
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-gray-700">
              The MCP Directory is built using modern technologies to ensure reliability,
              performance, and scalability:
            </p>
            <ul className="list-disc space-y-3 pl-5 text-lg text-gray-700">
              <li className="pl-2">
                <span className="font-semibold">Supabase</span> - For database and authentication
              </li>
              <li className="pl-2">
                <span className="font-semibold">Cloudflare Workers</span> - For edge computing
                capabilities
              </li>
              <li className="pl-2">
                <span className="font-semibold">Vercel</span> - For hosting and deployment
              </li>
              <li className="pl-2">
                <span className="font-semibold">GitHub API</span> - For repository data integration
              </li>
              <li className="pl-2">
                <span className="font-semibold">Gemini AI</span> - For intelligent analysis of MCP
                servers and clients
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 border-b border-gray-200 pb-2 text-2xl font-bold text-gray-900">
              About the Creator
            </h2>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 shadow-sm">
              <p className="text-lg leading-relaxed text-gray-700">
                I&apos;m Mert Köseoğlu, an AI & LLM consultant specializing in helping businesses
                leverage artificial intelligence and large language models effectively. With
                extensive experience in AI implementation and optimization, I help organizations
                transform their operations through cutting-edge AI solutions.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-700">
                As a Software Engineer with over 10 years of experience in development and technical
                leadership within fully remote, global teams, I&apos;m adept at architecting
                scalable solutions, building and mentoring engineering teams, and delivering
                high-impact software products. My expertise includes test-driven development (TDD),
                TypeScript, Node.js, Bun, React, React Native, AI, LLMs, and Agents.
              </p>
              <div className="mt-6">
                <a
                  href="https://mksg.lu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-lg font-medium text-blue-600 hover:text-blue-800"
                >
                  Visit my website
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 border-b border-gray-200 pb-2 text-2xl font-bold text-gray-900">
              Acknowledgements
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Special thanks to <strong>Berkay Derin</strong> for his valuable contributions to the
              MCP Directory project. His insights and assistance have been instrumental in making
              this platform what it is today.
            </p>
          </section>

          <section>
            <h2 className="mb-4 border-b border-gray-200 pb-2 text-2xl font-bold text-gray-900">
              Get Involved
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-gray-700">
              There are many ways to get involved with the MCP community:
            </p>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
                <h3 className="mb-3 text-xl font-bold text-gray-900">Explore Servers</h3>
                <p className="mb-4 text-lg text-gray-700">
                  Discover MCP-compatible servers for your AI applications.
                </p>
                <Link
                  href="/servers"
                  className="flex items-center text-lg font-medium text-blue-600 hover:text-blue-800"
                >
                  Browse Servers
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
                <h3 className="mb-3 text-xl font-bold text-gray-900">Explore Clients</h3>
                <p className="mb-4 text-lg text-gray-700">
                  Find client libraries and tools to integrate MCP into your applications.
                </p>
                <Link
                  href="/clients"
                  className="flex items-center text-lg font-medium text-blue-600 hover:text-blue-800"
                >
                  Browse Clients
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 border-b border-gray-200 pb-2 text-2xl font-bold text-gray-900">
              Contact Us
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Have questions or suggestions? We&apos;d love to hear from you! Contact us at{' '}
              <a
                href="https://mksg.lu"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:underline"
              >
                Mert Koseoglu&apos;s website
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
