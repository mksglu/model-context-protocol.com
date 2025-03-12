import React from 'react';

import Link from 'next/link';

import CategoryList from '@/components/core/servers/CategoryList';
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

import { Code, Search, Star } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

// Server Component
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-semibold leading-tight text-gray-900 sm:text-2xl">
                MCP Servers
              </h1>
              <p className="mt-1 text-xs text-gray-600 sm:text-sm">
                Browse and discover Model Context Protocol compatible servers
              </p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 sm:gap-3 md:ml-4 md:mt-0">
              <a
                href="https://github.com/mksglu/mcp-base"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none sm:px-4 sm:py-2 sm:text-sm"
              >
                <FaGithub className="mr-1.5 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                View on GitHub
              </a>
              <Link
                href="/docs"
                className="inline-flex items-center rounded-md border border-transparent bg-[#2da44e] px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-[#2c974b] focus:outline-none sm:px-4 sm:py-2 sm:text-sm"
              >
                Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row">
          {/* Sidebar - Fixed on top for mobile, sidebar for desktop */}
          <div className="w-full flex-shrink-0 lg:w-64">
            <div className="lg:sticky lg:top-20">
              {/* Search */}
              <div className="mb-4 sm:mb-6">
                <form action="/servers" method="GET">
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      type="text"
                      name="search"
                      placeholder="Find a server..."
                      defaultValue={searchQuery}
                      autoComplete="off"
                      className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    />
                    {currentCategory !== 'All' && (
                      <input type="hidden" name="category" value={currentCategory} />
                    )}
                  </div>
                </form>
              </div>

              {/* Categories - Client Component olarak değiştirildi */}
              <CategoryList
                categoryCounts={categoryCounts}
                currentCategory={currentCategory}
                searchQuery={searchQuery}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results */}
            <div className="overflow-hidden rounded-md border border-gray-200 bg-white">
              <div className="flex items-center justify-between border-b border-gray-200 px-3 py-2 sm:px-4 sm:py-3">
                <h2 className="text-xs font-medium text-gray-900 sm:text-sm">
                  {searchQuery
                    ? `Results for "${searchQuery}"`
                    : currentCategory === 'All'
                      ? 'All servers'
                      : `${currentCategory} servers`}
                </h2>
                <span className="text-xs text-gray-500 sm:text-sm">All</span>
              </div>

              {/* Server List */}
              <ul className="divide-y divide-gray-200">
                {servers.length > 0 ? (
                  servers.map((server) => (
                    <li key={server.id} className="hover:bg-gray-50">
                      <Link
                        href={`/servers/${server.slug}`}
                        className="block px-3 py-3 sm:px-4 sm:py-4"
                      >
                        <div className="flex items-start">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="truncate text-sm font-medium text-blue-600 hover:underline sm:text-base">
                                {server.name}
                              </h3>
                              <div className="flex items-center gap-1 text-gray-600">
                                <Star className="h-3 w-3 fill-current text-amber-400 sm:h-4 sm:w-4" />
                                <span className="text-xs font-medium">{server.stars}</span>
                              </div>
                            </div>
                            <p className="mt-1 line-clamp-2 text-xs text-gray-600 sm:text-sm">
                              {server.description || 'No description provided'}
                            </p>
                            <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-gray-500 sm:gap-3">
                              {server.language && (
                                <div className="flex items-center gap-1.5">
                                  <span className="h-2 w-2 rounded-full bg-primary sm:h-2.5 sm:w-2.5" />
                                  <span>{server.language}</span>
                                </div>
                              )}
                              {server.categories && server.categories.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {server.categories.map((category, index) => (
                                    <Badge
                                      key={index}
                                      variant="secondary"
                                      className="bg-blue-50 text-xs text-blue-600 hover:bg-blue-100"
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
                  <div className="px-4 py-6 text-center sm:py-8">
                    <Code className="mx-auto h-8 w-8 text-gray-400 sm:h-10 sm:w-10" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No servers found</h3>
                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                      {searchQuery
                        ? `No servers matching "${searchQuery}" in ${
                            currentCategory === 'All'
                              ? 'any category'
                              : `the ${currentCategory} category`
                          }`
                        : `No servers in ${
                            currentCategory === 'All'
                              ? 'any category'
                              : `the ${currentCategory} category`
                          }`}
                    </p>
                    <div className="mt-4 sm:mt-6">
                      <Link
                        href="/servers"
                        className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none sm:px-4 sm:py-2 sm:text-sm"
                      >
                        View all servers
                      </Link>
                    </div>
                  </div>
                )}
              </ul>

              {/* Pagination */}
              {servers.length > 0 && totalPages > 1 && (
                <div className="border-t border-gray-200 px-3 py-2 sm:px-6 sm:py-3">
                  <Pagination>
                    <PaginationContent className="flex flex-wrap justify-center gap-1">
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationPrevious
                            href={`/servers?page=${currentPage - 1}${
                              currentCategory !== 'All'
                                ? `&category=${encodeURIComponent(currentCategory)}`
                                : ''
                            }${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''}`}
                            className="text-xs hover:bg-blue-500 sm:text-sm"
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
                                className="h-8 w-8 text-xs hover:bg-blue-500 sm:h-10 sm:w-10 sm:text-sm"
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
                              <PaginationEllipsis className="text-xs sm:text-sm" />
                            </PaginationItem>
                          );
                        }

                        return null;
                      })}

                      {currentPage < totalPages && (
                        <PaginationItem>
                          <PaginationNext
                            href={`/servers?page=${currentPage + 1}${
                              currentCategory !== 'All'
                                ? `&category=${encodeURIComponent(currentCategory)}`
                                : ''
                            }${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''}`}
                            className="text-xs hover:bg-blue-500 sm:text-sm"
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
