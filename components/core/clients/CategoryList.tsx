'use client';

import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { ChevronDown, ChevronUp } from 'lucide-react';

interface CategoryListProps {
  categoryCounts: Record<string, number>;
  currentCategory: string;
  searchQuery: string;
}

export default function CategoryList({
  categoryCounts,
  currentCategory,
  searchQuery,
}: CategoryListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    setIsOpen(!isMobile);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, [isMobile]);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [categoryCounts]);

  const toggleCategories = () => {
    setIsOpen(!isOpen);
  };

  const topCategories = Object.entries(categoryCounts)
    .filter(([category]) => category !== 'All')
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2);

  return (
    <div className="overflow-hidden rounded-md border border-gray-200 bg-white">
      <div
        className={`flex items-center justify-between border-b border-gray-200 px-3 py-2 sm:px-4 sm:py-3 ${
          isMobile ? 'cursor-pointer' : ''
        }`}
        onClick={isMobile ? toggleCategories : undefined}
      >
        <h2 className="text-sm font-medium text-gray-900">Categories</h2>
        {isMobile && (
          <div className="flex items-center">
            <span className="mr-2 text-xs text-gray-500">{isOpen ? 'Hide all' : 'Show all'}</span>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </div>
        )}
      </div>

      {!isOpen && isMobile && (
        <div className="border-b border-gray-100 px-3 py-2 sm:px-4">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
              All ({categoryCounts.All})
            </span>
            {topCategories.map(([category, count]) => (
              <span
                key={category}
                className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800"
              >
                {category} ({count})
              </span>
            ))}
            <span className="text-xs italic text-gray-500">and more...</span>
          </div>
        </div>
      )}

      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen || !isMobile ? `${contentHeight}px` : '0',
          opacity: isOpen || !isMobile ? 1 : 0,
        }}
      >
        <div className="px-3 py-2 sm:px-4 sm:py-3">
          <ul className="grid grid-cols-2 gap-x-2 gap-y-1.5 sm:block sm:space-y-2">
            <li>
              <Link
                href="/clients"
                className={`flex items-center justify-between text-xs sm:text-sm ${
                  currentCategory === 'All'
                    ? 'font-medium text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span>All</span>
                <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-600 sm:px-2">
                  {categoryCounts.All}
                </span>
              </Link>
            </li>
            {Object.entries(categoryCounts)
              .filter(([category]) => category !== 'All')
              .map(([category, count]) => (
                <li key={category}>
                  <Link
                    href={`/clients?category=${encodeURIComponent(category)}${
                      searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''
                    }`}
                    className={`flex items-center justify-between text-xs sm:text-sm ${
                      currentCategory === category
                        ? 'font-medium text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <span className="truncate">{category}</span>
                    <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-600 sm:px-2">
                      {count}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
