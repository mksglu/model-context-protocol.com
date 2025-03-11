import React from 'react';

import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { getClientById } from '@/backend/queries/clients';

import { ArrowLeft, ExternalLink, GitBranch, Star } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { FaGithub } from 'react-icons/fa6';

type AnalysisData = {
  is_mcp: string;
  justification: string;
  categories: string[];
  analysis: {
    [key: string]: string;
  };
};

export default async function ClientDetailPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  const client = await getClientById(slug);

  if (!client) {
    notFound();
  }

  let analysisData: AnalysisData | null = null;
  try {
    if (client.ai_analysis) {
      try {
        analysisData = JSON.parse(client.ai_analysis);
      } catch {
        const markdownContent = client.ai_analysis;
        const jsonMatch = markdownContent.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);

        if (jsonMatch && jsonMatch[1]) {
          const jsonString = jsonMatch[1];
          analysisData = JSON.parse(jsonString);
        }
      }
    }
  } catch (error) {
    console.error('JSON parsing error:', error);
  }

  // Group analysis data into categories for better organization
  const groupedAnalysis = analysisData?.analysis ? 
    Object.entries(analysisData.analysis).reduce((acc, [key, value]) => {
      // Extract category from key (e.g., "Architecture and Design Patterns" -> "Architecture")
      const category = key.split(' ')[0].toLowerCase();
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push({ key, value });
      return acc;
    }, {} as Record<string, { key: string, value: string }[]>) : {};

  // Get the first category as default tab
  const getDefaultTab = () => {
    if (Object.keys(groupedAnalysis).length > 0) {
      return Object.keys(groupedAnalysis)[0];
    }
    return 'overview';
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Link href="/clients" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="ml-4 text-xl font-semibold text-gray-900">{client.name}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-semibold text-gray-900">{client.name}</h2>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {client.language || 'Unknown'}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{client.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Star className="h-4 w-4 fill-current text-amber-400" />
                      <span className="font-medium">{client.stars}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <GitBranch className="h-4 w-4" />
                      <span className="font-medium">-</span>
                    </div>
                    <a
                      href={client.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <FaGithub className="mr-1.5 h-4 w-4" />
                      View on GitHub
                    </a>
                  </div>
                </div>
              </div>

              {/* Categories */}
              {client.categories && client.categories.length > 0 && (
                <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
                  <div className="flex flex-wrap gap-2">
                    {client.categories.map((category, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-blue-50 text-blue-600 hover:bg-blue-100"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Analysis Content */}
              {analysisData && Object.keys(groupedAnalysis).length > 0 && (
                <div className="px-6 py-6">
                  <Tabs defaultValue={getDefaultTab()} className="w-full">
                    <div className="flex flex-col md:flex-row gap-8">
                      {/* Vertical Tab Navigation */}
                      <div className="w-full md:w-40 flex-shrink-0">
                        <TabsList className="flex flex-col h-auto p-0 bg-transparent w-full space-y-2">
                          {Object.keys(groupedAnalysis).map((category) => (
                            <TabsTrigger
                              key={category}
                              value={category}
                              className="justify-start text-left w-full px-0 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 data-[state=active]:text-black data-[state=active]:border-b data-[state=active]:border-black rounded-none shadow-none bg-transparent"
                            >
                              {/* Capitalize first letter */}
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                      </div>

                      {/* Tab Content */}
                      <div className="flex-1 border-l border-gray-200 pl-8">
                        {Object.entries(groupedAnalysis).map(([category, items]) => (
                          <TabsContent 
                            key={category} 
                            value={category} 
                            className="mt-0 pt-0 animate-none"
                          >
                            <div className="space-y-8">
                              {items.map(({ key, value }) => (
                                <div key={key} className="space-y-3">
                                  <h3 className="text-lg font-medium text-gray-900">
                                    {key}
                                  </h3>
                                  <div className="prose prose-gray max-w-none overflow-x-auto">
                                    <ReactMarkdown>{value}</ReactMarkdown>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </TabsContent>
                        ))}
                      </div>
                    </div>
                  </Tabs>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-20">
              <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900">About</h3>
                </div>
                <div className="px-4 py-3">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-xs font-medium text-gray-500">Repository</h4>
                      <a
                        href={client.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 flex items-center text-sm text-blue-600 hover:underline"
                      >
                        {client.html_url.replace(/^https?:\/\//, '')}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </div>
                    {client.language && (
                      <div>
                        <h4 className="text-xs font-medium text-gray-500">Language</h4>
                        <p className="mt-1 text-sm text-gray-900">{client.language}</p>
                      </div>
                    )}
                    <div>
                      <h4 className="text-xs font-medium text-gray-500">Stars</h4>
                      <p className="mt-1 text-sm text-gray-900">{client.stars.toLocaleString()}</p>
                    </div>
                    {client.categories && client.categories.length > 0 && (
                      <div>
                        <h4 className="text-xs font-medium text-gray-500">Categories</h4>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {client.categories.map((category, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-800"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
