'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white transition-shadow duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-6 md:space-x-8">
              <Link href="/" className="flex items-center">
                <span className="rounded-md bg-gradient-to-r from-black to-gray-900 px-2 py-1 text-xl font-bold text-white">
                  MCP Directory
                </span>
              </Link>

              <nav className="hidden items-center space-x-1 md:flex">
                <Link
                  href="/servers"
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    pathname?.startsWith('/servers')
                      ? 'border-b-2 border-neutral-800 text-neutral-900'
                      : 'text-neutral-600 hover:text-neutral-800'
                  }`}
                >
                  Servers
                </Link>
                <Link
                  href="/clients"
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    pathname?.startsWith('/clients')
                      ? 'border-b-2 border-neutral-800 text-neutral-900'
                      : 'text-neutral-600 hover:text-neutral-800'
                  }`}
                >
                  Clients
                </Link>
                <Link
                  href="/blog"
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    pathname?.startsWith('/blog')
                      ? 'border-b-2 border-neutral-800 text-neutral-900'
                      : 'text-neutral-600 hover:text-neutral-800'
                  }`}
                >
                  Blog
                </Link>
              </nav>
            </div>

            <button
              className="text-neutral-700 hover:text-neutral-900 focus:outline-none md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menü"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[1.5px] md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="fixed right-0 top-16 z-40 w-full overflow-y-auto rounded-bl-lg bg-white shadow-lg md:hidden">
            <div className="px-4 py-6">
              <div className="flex flex-col">
                <Link
                  href="/servers"
                  className={`px-2 py-3 text-base font-medium ${
                    pathname?.startsWith('/servers')
                      ? 'bg-neutral-100 text-neutral-900'
                      : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Servers
                </Link>
                <Link
                  href="/clients"
                  className={`px-2 py-3 text-base font-medium ${
                    pathname?.startsWith('/clients')
                      ? 'bg-neutral-100 text-neutral-900'
                      : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Clients
                </Link>
                <Link
                  href="/blog"
                  className={`px-2 py-3 text-base font-medium ${
                    pathname?.startsWith('/blog')
                      ? 'bg-neutral-100 text-neutral-900'
                      : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
