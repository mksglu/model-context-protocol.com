import React from 'react';

import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import {
  getCategoryCounts,
  getServersWithPagination,
  searchServers,
} from '@/backend/queries/servers';

import { categories } from '@/data/categories';

import { Code, Search, Star } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

interface ServersPageProps {
  searchParams: {
    page?: string;
    category?: string;
    search?: string;
  };
}

export default async function ServersPage({ searchParams }: ServersPageProps) {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const currentCategory = searchParams.category || 'All';
  const searchQuery = searchParams.search || '';

  const { data: servers, totalPages } = searchQuery
    ? await searchServers(searchQuery, currentPage, 15, currentCategory)
    : await getServersWithPagination(currentPage, 15, currentCategory);

  const categoryCounts = await getCategoryCounts();

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-semibold text-gray-900 leading-tight">
                MCP Servers
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Browse and discover Model Context Protocol compatible servers
              </p>
            </div>
            <div className="mt-4 md:mt-0 md:ml-4 flex space-x-3">
              <a
                href="https://github.com/mksglu/mcp-base"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                <FaGithub className="mr-2 h-4 w-4" />
                View on GitHub
              </a>
              <Link
                href="/docs"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2da44e] hover:bg-[#2c974b] focus:outline-none"
              >
                Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-20">
              {/* Search */}
              <div className="mb-6">
                <form action="/servers" method="GET">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      type="text"
                      name="search"
                      placeholder="Find a server..."
                      defaultValue={searchQuery}
                      className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    {currentCategory !== 'All' && (
                      <input type="hidden" name="category" value={currentCategory} />
                    )}
                  </div>
                </form>
              </div>

              {/* Categories */}
              <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h2 className="text-sm font-medium text-gray-900">Categories</h2>
                </div>
                <div className="px-4 py-3">
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/servers"
                        className={`flex items-center justify-between text-sm ${
                          currentCategory === 'All'
                            ? 'font-medium text-blue-600'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <span>All</span>
                        <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                          {servers.length}
                        </span>
                      </Link>
                    </li>
                    {categories.map((category) => (
                      <li key={category}>
                        <Link
                          href={`/servers?category=${encodeURIComponent(category)}`}
                          className={`flex items-center justify-between text-sm ${
                            currentCategory === category
                              ? 'font-medium text-blue-600'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          <span>{category}</span>
                          <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                            {categoryCounts[category] || 0}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results */}
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-sm font-medium text-gray-900">
                  {searchQuery
                    ? `Results for "${searchQuery}"`
                    : currentCategory === 'All'
                    ? 'All servers'
                    : `${currentCategory} servers`}
                </h2>
                <span className="text-sm text-gray-500">
                  {servers.length} {servers.length === 1 ? 'repository' : 'repositories'}
                </span>
              </div>

              {/* Server List */}
              <ul className="divide-y divide-gray-200">
                {servers.length > 0 ? (
                  servers.map((server) => (
                    <li key={server.id} className="hover:bg-gray-50">
                      <Link href={`/servers/${server.slug}`} className="block px-4 py-4">
                        <div className="flex items-start">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-medium text-blue-600 hover:underline truncate">
                                {server.name}
                              </h3>
                              <div className="flex items-center gap-1 text-gray-600">
                                <Star className="h-4 w-4 fill-current text-amber-400" />
                                <span className="text-xs font-medium">{server.stars}</span>
                              </div>
                            </div>
                            <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                              {server.description || 'No description provided'}
                            </p>
                            <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                              {server.language && (
                                <div className="flex items-center gap-1.5">
                                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                                  <span>{server.language}</span>
                                </div>
                              )}
                              {server.categories && server.categories.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {server.categories.map((category, index) => (
                                    <Badge
                                      key={index}
                                      variant="secondary"
                                      className="bg-blue-50 text-blue-600 hover:bg-blue-100"
                                    >
                                      {category}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center">
                    <Code className="mx-auto h-10 w-10 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No servers found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {searchQuery
                        ? `No servers matching "${searchQuery}" in ${
                            currentCategory === 'All' ? 'any category' : `the ${currentCategory} category`
                          }`
                        : `No servers in ${
                            currentCategory === 'All' ? 'any category' : `the ${currentCategory} category`
                          }`}
                    </p>
                    <div className="mt-6">
                      <Link
                        href="/servers"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                      >
                        View all servers
                      </Link>
                    </div>
                  </div>
                )}
              </ul>

              {/* Pagination */}
              {servers.length > 0 && totalPages > 1 && (
                <div className="px-4 py-3 border-t border-gray-200 sm:px-6">
                  <Pagination>
                    <PaginationContent>
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationPrevious
                            href={`/servers?page=${currentPage - 1}${
                              currentCategory !== 'All' ? `&category=${encodeURIComponent(currentCategory)}` : ''
                            }${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''}`}
                          />
                        </PaginationItem>
                      )}

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        // Show first page, last page, and pages around current page
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationLink
                                href={`/servers?page=${page}${
                                  currentCategory !== 'All'
                                    ? `&category=${encodeURIComponent(currentCategory)}`
                                    : ''
                                }${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''}`}
                                isActive={page === currentPage}
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        }

                        // Show ellipsis for gaps
                        if (
                          (page === 2 && currentPage > 3) ||
                          (page === totalPages - 1 && currentPage < totalPages - 2)
                        ) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          );
                        }

                        return null;
                      })}

                      {currentPage < totalPages && (
                        <PaginationItem>
                          <PaginationNext
                            href={`/servers?page=${currentPage + 1}${
                              currentCategory !== 'All' ? `&category=${encodeURIComponent(currentCategory)}` : ''
                            }${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''}`}
                          />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
