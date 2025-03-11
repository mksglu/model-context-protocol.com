import React from 'react';

import Link from 'next/link';

import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text';
import { GridPattern } from '@/components/magicui/grid-pattern';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Cover } from '@/components/ui/cover';
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
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

import {
  getCategoryCounts,
  getClientsWithPagination,
  searchClients,
} from '@/backend/queries/clients';

import { categories } from '@/data/categories';

import { clsx } from 'clsx';
import { Code, Github, Search, Star } from 'lucide-react';

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
    <div className="container mx-auto max-w-7xl px-6 py-20">
      <main className="relative flex flex-1 flex-col items-center justify-center text-center">
        <GridPattern className="opacity-100" width={30} height={30} strokeDasharray="1 3" />
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm">
              <span className="mr-2">💻</span>
              <AnimatedShinyText shimmerWidth={150}>+50 MCP Clients in list</AnimatedShinyText>
            </div>
          </div>

          <h1 className="mb-6 text-5xl font-bold md:text-7xl">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-gray-900 text-transparent">
              Discover{' '}
            </span>
            <span>
              <Cover>MCP Clients</Cover>
            </span>
          </h1>

          <p className="mb-10 text-xl text-gray-600 md:text-2xl">
            Find the best MCP clients for your needs.
          </p>

          <div className="flex justify-center">
            <form action="/clients" className="relative w-full max-w-md">
              <Input
                type="text"
                name="search"
                placeholder="Search with keywords..."
                className="pr-10"
                autoComplete="off"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 transform text-muted-foreground hover:text-foreground"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </main>

      <div className="mb-4 mt-12">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-2 py-4">
            <Link
              href={`/clients?category=All${searchQuery ? `&search=${searchQuery}` : ''}`}
              className={clsx('inline-block', currentCategory === 'All' && 'pointer-events-none')}
            >
              <Badge
                variant="outline"
                className={clsx(
                  'px-4 py-2 text-sm font-medium',
                  currentCategory === 'All'
                    ? 'border-blue-200 bg-blue-50'
                    : 'hover:border-blue-200 hover:bg-blue-50'
                )}
              >
                All <span className="ml-1 text-blue-500">+{categoryCounts.All || 0}</span>
              </Badge>
            </Link>
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/clients?category=${category}${searchQuery ? `&search=${searchQuery}` : ''}`}
                className={clsx(
                  'inline-block',
                  currentCategory === category && 'pointer-events-none'
                )}
              >
                <Badge
                  variant="outline"
                  className={clsx(
                    'px-4 py-2 text-sm font-medium',
                    currentCategory === category
                      ? 'border-blue-200 bg-blue-50'
                      : 'hover:border-blue-200 hover:bg-blue-50'
                  )}
                >
                  {category}{' '}
                  <span
                    className={clsx(
                      'ml-1',
                      currentCategory === category ? 'text-blue-500' : 'text-gray-500'
                    )}
                  >
                    {categoryCounts[category] || 0}
                  </span>
                </Badge>
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <h2 className="mb-6 text-2xl font-bold">All MCP Clients</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clients && clients.length > 0 ? (
          clients.map((client) => (
            <Card
              key={client.id}
              className="group relative h-full max-w-full flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-white p-[2px] shadow-sm transition-all hover:shadow-md"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative flex h-full flex-col rounded-xl bg-white p-6">
                <div className="flex h-full flex-col">
                  <div className="flex items-start justify-between">
                    <h3 className="line-clamp-1 text-lg font-semibold">{client.name}</h3>
                    <a
                      href={client.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="z-10 text-gray-500 hover:text-gray-700"
                      aria-label="View on GitHub"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-yellow-500" />
                      <span className="ml-1 text-sm">{client.stars.toLocaleString()}</span>
                    </div>
                    {client.language && (
                      <div className="flex items-center text-gray-500">
                        <Code className="h-4 w-4" />
                        <span className="ml-1 text-sm">{client.language}</span>
                      </div>
                    )}
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                    {client.description || 'No description available'}
                  </p>

                  {client.categories && client.categories.length > 0 && (
                    <div className="mt-auto pt-4">
                      <div className="flex flex-wrap gap-1.5">
                        {client.categories.map((category, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="rounded-full bg-gray-50 px-2 py-0.5 text-xs font-normal text-gray-700"
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <Link
                  href={`/clients/${client.slug}`}
                  className="absolute inset-0"
                  aria-label={`View ${client.name} details`}
                >
                  <span className="sr-only">View client details</span>
                </Link>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-3 py-10 text-center">
            <p className="text-lg text-gray-500">
              No clients found. Try a different search or category.
            </p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    href={`/clients?page=${currentPage - 1}${
                      currentCategory !== 'All' ? `&category=${currentCategory}` : ''
                    }${searchQuery ? `&search=${searchQuery}` : ''}`}
                  />
                </PaginationItem>
              )}

              {[...Array(totalPages)].map((_, i) => {
                const pageNumber = i + 1;
                // Show first page, last page, and pages around current page
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href={`/clients?page=${pageNumber}${
                          currentCategory !== 'All' ? `&category=${currentCategory}` : ''
                        }${searchQuery ? `&search=${searchQuery}` : ''}`}
                        isActive={pageNumber === currentPage}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }

                // Show ellipsis for page gaps
                if (pageNumber === 2 || pageNumber === totalPages - 1) {
                  return (
                    <PaginationItem key={i}>
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
                      currentCategory !== 'All' ? `&category=${currentCategory}` : ''
                    }${searchQuery ? `&search=${searchQuery}` : ''}`}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
