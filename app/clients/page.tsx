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
  getClientsWithPagination,
  searchClients,
} from '@/backend/queries/clients';

import { Code, Search, Star } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

interface ClientsPageProps {
  searchParams: {
    page?: string;
    category?: string;
    search?: string;
  };
}

export default async function ClientsPage({ searchParams }: ClientsPageProps) {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const currentCategory = searchParams.category || 'All';
  const searchQuery = searchParams.search || '';

  const { data: clients, totalPages } = searchQuery
    ? await searchClients(searchQuery, currentPage, 15, currentCategory)
    : await getClientsWithPagination(currentPage, 15, currentCategory);

  const categoryCounts = await getCategoryCounts();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-semibold leading-tight text-gray-900">MCP Clients</h1>
              <p className="mt-1 text-sm text-gray-600">
                Browse and discover Model Context Protocol client implementations
              </p>
            </div>
            <div className="mt-4 flex space-x-3 md:ml-4 md:mt-0">
              <a
                href="https://github.com/mksglu/mcp-base"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
              >
                <FaGithub className="mr-2 h-4 w-4" />
                View on GitHub
              </a>
              <Link
                href="/docs"
                className="inline-flex items-center rounded-md border border-transparent bg-[#2da44e] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#2c974b] focus:outline-none"
              >
                Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar */}
          <div className="w-full flex-shrink-0 lg:w-64">
            <div className="sticky top-20">
              {/* Search */}
              <div className="mb-6">
                <form action="/clients" method="GET">
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      type="text"
                      name="search"
                      placeholder="Find a client..."
                      defaultValue={searchQuery}
                      className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    />
                    {currentCategory !== 'All' && (
                      <input type="hidden" name="category" value={currentCategory} />
                    )}
                  </div>
                </form>
              </div>

              {/* Categories */}
              <div className="overflow-hidden rounded-md border border-gray-200 bg-white">
                <div className="border-b border-gray-200 px-4 py-3">
                  <h2 className="text-sm font-medium text-gray-900">Categories</h2>
                </div>
                <div className="px-4 py-3">
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/clients"
                        className={`flex items-center justify-between text-sm ${
                          currentCategory === 'All'
                            ? 'font-medium text-blue-600'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <span>All</span>
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                          {categoryCounts.All}
                        </span>
                      </Link>
                    </li>
                    {Object.entries(categoryCounts)
                      .filter(([category]) => category !== 'All')
                      .map(([category, count]) => (
                        <li key={category}>
                          <Link
                            href={`/clients?category=${encodeURIComponent(category)}`}
                            className={`flex items-center justify-between text-sm ${
                              currentCategory === category
                                ? 'font-medium text-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            <span>{category}</span>
                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                              {count}
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
            <div className="overflow-hidden rounded-md border border-gray-200 bg-white">
              <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                <h2 className="text-sm font-medium text-gray-900">
                  {searchQuery
                    ? `Results for "${searchQuery}"`
                    : currentCategory === 'All'
                      ? 'All clients'
                      : `${currentCategory} clients`}
                </h2>
                <span className="text-sm text-gray-500">All</span>
              </div>

              {/* Client List */}
              <ul className="divide-y divide-gray-200">
                {clients.length > 0 ? (
                  clients.map((client) => (
                    <li key={client.id} className="hover:bg-gray-50">
                      <Link href={`/clients/${client.slug}`} className="block px-4 py-4">
                        <div className="flex items-start">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="truncate text-base font-medium text-blue-600 hover:underline">
                                {client.name}
                              </h3>
                              <div className="flex items-center gap-1 text-gray-600">
                                <Star className="h-4 w-4 fill-current text-amber-400" />
                                <span className="text-xs font-medium">{client.stars}</span>
                              </div>
                            </div>
                            <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                              {client.description || 'No description provided'}
                            </p>
                            <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                              {client.language && (
                                <div className="flex items-center gap-1.5">
                                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                                  <span>{client.language}</span>
                                </div>
                              )}
                              {client.categories && client.categories.length > 0 && (
                                <div className="flex flex-wrap gap-1">
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
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No clients found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {searchQuery
                        ? `No clients matching "${searchQuery}" in ${
                            currentCategory === 'All'
                              ? 'any category'
                              : `the ${currentCategory} category`
                          }`
                        : `No clients in ${
                            currentCategory === 'All'
                              ? 'any category'
                              : `the ${currentCategory} category`
                          }`}
                    </p>
                    <div className="mt-6">
                      <Link
                        href="/clients"
                        className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none"
                      >
                        View all clients
                      </Link>
                    </div>
                  </div>
                )}
              </ul>

              {/* Pagination */}
              {clients.length > 0 && totalPages > 1 && (
                <div className="border-t border-gray-200 px-4 py-3 sm:px-6">
                  <Pagination>
                    <PaginationContent>
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationPrevious
                            href={`/clients?page=${currentPage - 1}${
                              currentCategory !== 'All'
                                ? `&category=${encodeURIComponent(currentCategory)}`
                                : ''
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
                                href={`/clients?page=${page}${
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
                            href={`/clients?page=${currentPage + 1}${
                              currentCategory !== 'All'
                                ? `&category=${encodeURIComponent(currentCategory)}`
                                : ''
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
