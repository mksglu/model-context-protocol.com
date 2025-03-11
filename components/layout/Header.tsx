'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Search from '@/components/layout/Search';

import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <header className={`sticky top-0 z-50 w-full bg-white border-b border-gray-200 transition-shadow ${scrolled ? 'shadow-sm' : ''}`}>
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-4">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <span className="text-xl font-semibold text-gray-900">MCP Directory</span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-1">
                <Link 
                  href="/servers" 
                  className={`px-3 py-2 text-sm font-medium ${pathname?.startsWith('/servers') ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Servers
                </Link>
                <Link 
                  href="/clients" 
                  className={`px-3 py-2 text-sm font-medium ${pathname?.startsWith('/clients') ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Clients
                </Link>
                <Link 
                  href="/blog" 
                  className={`px-3 py-2 text-sm font-medium ${pathname?.startsWith('/blog') ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Blog
                </Link>
              </nav>
            </div>

            {/* Search */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:block relative">
                <div className="flex items-center h-8 w-64 rounded-md border border-gray-300 bg-gray-50 px-3 text-sm">
                  <span className="text-gray-500 text-xs">/</span>
                  <input 
                    type="text" 
                    placeholder="Search or jump to..." 
                    className="ml-2 flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
                    onClick={() => setSearchOpen(true)}
                  />
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-gray-600 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white md:hidden pt-16">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/servers" 
                className="px-3 py-2 text-base font-medium text-gray-900 border-b border-gray-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Servers
              </Link>
              <Link 
                href="/clients" 
                className="px-3 py-2 text-base font-medium text-gray-900 border-b border-gray-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Clients
              </Link>
              <Link 
                href="/blog" 
                className="px-3 py-2 text-base font-medium text-gray-900 border-b border-gray-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-16">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium">Search</h3>
              <button onClick={() => setSearchOpen(false)}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              <Search open={searchOpen} onOpenChange={setSearchOpen} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
