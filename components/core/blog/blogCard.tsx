import React from 'react';

import Link from 'next/link';

import { CalendarIcon, ChevronRightIcon } from '@radix-ui/react-icons';

interface BlogCardProps {
  title: string;
  description: string;
  keyword: string[];
  date: string;
  slug: string;
}

const BlogCard = ({ title, description, keyword, date, slug }: BlogCardProps) => {
  return (
    <div className="mb-8 rounded-lg border-b border-gray-200 p-4 pb-8 transition-all duration-300 last:border-0 hover:bg-gray-50 hover:shadow-sm">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {keyword.map((kw, index) => (
              <span
                key={index}
                className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                {kw}
              </span>
            ))}
          </div>
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-3 w-3 text-gray-500" />
            <span className="text-xs text-gray-500">{date}</span>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 transition-colors hover:text-blue-600">
          {title}
        </h2>

        <p className="text-sm leading-relaxed text-gray-600">{description}</p>

        <div className="flex items-center pt-3">
          <Link
            href={`/blog/${slug}`}
            className="group flex items-center bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-sm font-medium text-transparent transition-colors hover:from-orange-600 hover:to-pink-600"
          >
            Read article
            <ChevronRightIcon className="ml-1 h-4 w-4 text-pink-500 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
