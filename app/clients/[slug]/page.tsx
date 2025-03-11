import React from 'react';

import Link from 'next/link';
import { notFound } from 'next/navigation';

import { GridPattern } from '@/components/magicui/grid-pattern';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { getClientById } from '@/backend/queries/clients';

import { BarChart3, BookOpen, ChevronLeft, Code, ExternalLink, Star, Zap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

type AnalysisData = {
  is_mcp: string;
  justification: string;
  categories: string[];
  analysis: {
    [key: string]: string;
  };
};

export default async function ClientPage({ params }: { params: { slug: string } }) {
  const client = await getClientById(params.slug);

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

  const getFirstTabKey = () => {
    if (analysisData?.analysis) {
      const firstKey = Object.keys(analysisData.analysis)[0];
      return firstKey.toLowerCase().replace(/\s+/g, '-');
    }
    return 'default-tab';
  };

  const createTabValue = (key: string) => {
    return key.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-70">
        <GridPattern
          width={36}
          height={36}
          x={-1}
          y={-1}
          className="absolute inset-0 h-full w-full fill-blue-50 stroke-blue-100 [mask-image:radial-gradient(ellipse_at_center,white_40%,transparent_80%)]"
          strokeDasharray="2 4"
          strokeWidth={1.5}
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
          <Link href="/clients" className="inline-block">
            <Button
              variant="ghost"
              className="group flex items-center gap-1.5 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to clients
            </Button>
          </Link>
        </div>

        <div className="relative mb-10 overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 backdrop-blur-sm">
          <div className="absolute right-0 top-0 -z-10 h-64 w-64 rounded-bl-full bg-gradient-to-bl from-blue-100 via-indigo-50 to-transparent opacity-70"></div>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 text-2xl font-bold text-white shadow-lg shadow-blue-200 ring-4 ring-blue-50">
                {client.language ? client.language[0].toUpperCase() : '🚀'}
              </div>
              <div>
                <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                  {client.name}
                </h1>
                <p className="mt-3 max-w-3xl text-lg text-slate-600">
                  {client.description || 'No description available'}
                </p>

                {client.categories && client.categories.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {client.categories.map((category, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="rounded-full border-0 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1 text-xs font-medium text-blue-700 shadow-sm"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            <Card className="overflow-hidden rounded-3xl border border-gray-200 shadow-none">
              <CardHeader className="border-b bg-gradient-to-r from-white to-blue-50/50 pb-6">
                <CardTitle className="flex items-center gap-2 text-xl text-blue-800">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                  Repository Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-blue-50">
                  <div className="flex items-center justify-between px-6 py-5 transition-colors hover:bg-blue-50/30">
                    <div className="font-medium text-slate-600">Language</div>
                    {client.language ? (
                      <div className="flex items-center gap-2 font-medium text-blue-700">
                        <Code className="h-4 w-4" />
                        {client.language}
                      </div>
                    ) : (
                      <div className="text-gray-500">Not specified</div>
                    )}
                  </div>
                  <div className="flex items-center justify-between px-6 py-5 transition-colors hover:bg-blue-50/30">
                    <div className="font-medium text-slate-600">Repository</div>
                    <a
                      href={client.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-medium text-blue-600 transition-colors hover:text-blue-800"
                    >
                      {client.name.length > 20 ? `${client.name.substring(0, 20)}...` : client.name}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                  <div className="flex items-center justify-between px-6 py-5 transition-colors hover:bg-blue-50/30">
                    <div className="font-medium text-slate-600">Stars</div>
                    <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text font-medium text-transparent">
                      <Star className="h-5 w-5 fill-blue-400 text-blue-500" />
                      {client.stars.toLocaleString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            {client.ai_analysis ? (
              <Card className="rounded-3xl border border-gray-200 shadow-none">
                <CardHeader className="rounded-t-3xl border-b bg-gradient-to-r from-white to-blue-50/50 pb-6">
                  <CardTitle className="flex items-center gap-2 text-xl text-blue-800">
                    <Zap className="h-5 w-5 text-blue-500" />
                    AI Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {analysisData?.analysis ? (
                    <Tabs defaultValue={getFirstTabKey()} className="w-full" orientation="vertical">
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full border-r border-blue-100 md:w-[280px] md:min-w-[280px]">
                          <TabsList className="flex h-auto flex-col items-stretch rounded-l-3xl rounded-t-none bg-blue-50/70 p-2">
                            {Object.entries(analysisData.analysis).map(([key], idx) => {
                              const tabValue = createTabValue(key);
                              const keyParts = key.split(' ');
                              const mainTitle = keyParts[0];
                              const subtitle = keyParts.slice(1).join(' ');

                              return (
                                <TabsTrigger
                                  key={idx}
                                  value={tabValue}
                                  className="mb-1 justify-start rounded-lg px-4 py-3 text-left transition-all data-[state=active]:border data-[state=active]:border-gray-200 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-none"
                                >
                                  <div className="flex flex-col items-start">
                                    <span className="text-md font-medium">{mainTitle}</span>
                                    {subtitle && (
                                      <span className="mt-0.5 max-w-[200px] truncate text-xs text-slate-500">
                                        {subtitle}
                                      </span>
                                    )}
                                  </div>
                                </TabsTrigger>
                              );
                            })}
                          </TabsList>
                        </div>

                        <div className="flex-1 rounded-r-3xl bg-white p-8">
                          {Object.entries(analysisData.analysis).map(([key, content]) => {
                            const tabValue = createTabValue(key);
                            return (
                              <TabsContent
                                key={key}
                                value={tabValue}
                                className="mt-0 h-full data-[state=active]:animate-in data-[state=active]:fade-in-50"
                              >
                                <div className="h-full">
                                  <h3 className="mb-4 text-xl font-semibold text-blue-700">
                                    {key}
                                  </h3>
                                  <div className="whitespace-pre-wrap text-lg leading-relaxed text-slate-700">
                                    {content}
                                  </div>
                                </div>
                              </TabsContent>
                            );
                          })}
                        </div>
                      </div>
                    </Tabs>
                  ) : (
                    <div className="p-8">
                      <div className="prose max-w-none text-slate-700">
                        <ReactMarkdown>{client.ai_analysis}</ReactMarkdown>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="flex h-full items-center justify-center overflow-hidden rounded-3xl border-0 bg-white p-8 shadow-[0_15px_50px_-15px_rgba(59,130,246,0.2)] backdrop-blur-sm">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
                    <BookOpen className="h-8 w-8 text-blue-300" />
                  </div>
                  <p className="text-lg text-slate-500">
                    No technical analysis available for this repository.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
