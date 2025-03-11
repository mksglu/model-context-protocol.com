'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import AddServerModal from '@/components/core/modals/AddServerModal';
import Search from '@/components/layout/Search';
import { Button } from '@/components/ui/button';

import { AnimatePresence, motion } from 'framer-motion';
import {
  BookOpen,
  LogIn,
  Menu,
  Network,
  Search as SearchIcon,
  Server,
  X,
  Zap,
} from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [addServerOpen, setAddServerOpen] = useState(false);

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
      <AddServerModal open={addServerOpen} onOpenChange={setAddServerOpen} />
      <Search open={searchOpen} onOpenChange={setSearchOpen} />

      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full px-4 transition-all duration-500 sm:px-6 md:px-8 ${
          scrolled ? 'bg-background/80 backdrop-blur-xl shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 sm:gap-8">
                <Link href="/" className="flex items-center transition-all hover:opacity-90">
                  <div className="flex items-center">
                    <div className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary via-accent to-primary p-0.5">
                      <div className="rounded-[0.7rem] bg-background/95 px-3 py-2 transition-all group-hover:bg-background/80">
                        <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-lg font-bold tracking-tight text-transparent">
                          MCP<span className="text-primary">.</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>

                <nav className="hidden items-center space-x-1 lg:flex">
                  {[
                    { href: '/servers', icon: Server, label: 'Servers' },
                    { href: '/clients', icon: Network, label: 'Clients' },
                    { href: '/blog', icon: BookOpen, label: 'Blog' },
                  ].map(({ href, icon: Icon, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="group relative rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span className="absolute inset-0 rounded-lg bg-primary/0 transition-colors group-hover:bg-primary/5" />
                      <span className="relative flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {label}
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="hidden items-center gap-3 lg:flex">
                <Button
                  variant="outline"
                  className="group relative overflow-hidden rounded-lg border-border bg-background/50 px-4 text-sm font-medium text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground"
                  onClick={() => setSearchOpen(true)}
                >
                  <span className="absolute inset-0 bg-primary/0 transition-colors group-hover:bg-primary/5" />
                  <span className="relative flex items-center gap-2">
                    <SearchIcon className="h-4 w-4" />
                    Search
                    <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
                      <span className="text-xs">⌘</span>K
                    </kbd>
                  </span>
                </Button>

                <Button
                  variant="outline"
                  className="group relative overflow-hidden rounded-lg border-border px-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setAddServerOpen(true)}
                >
                  <span className="absolute inset-0 bg-primary/0 transition-colors group-hover:bg-primary/5" />
                  <span className="relative flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Add Server
                  </span>
                </Button>

                <Button
                  className="relative overflow-hidden rounded-lg bg-gradient-to-r from-primary to-accent px-4 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg"
                >
                  <span className="absolute inset-0 bg-white/0 transition-colors hover:bg-white/10" />
                  <span className="relative flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </span>
                </Button>
              </div>

              <div className="lg:hidden">
                <Button
                  variant="ghost"
                  className="relative overflow-hidden rounded-lg p-2"
                  aria-label="Menu"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <span className="absolute inset-0 bg-primary/0 transition-colors hover:bg-primary/5" />
                  {isMobileMenuOpen ? (
                    <X className="relative h-5 w-5 text-foreground" />
                  ) : (
                    <Menu className="relative h-5 w-5 text-foreground" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 top-full mx-4 mt-2 overflow-hidden rounded-xl border border-border bg-background/95 shadow-lg backdrop-blur-xl lg:hidden"
            >
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="p-4"
              >
                <nav className="flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    className="group relative w-full overflow-hidden rounded-lg border-border bg-background/50 text-sm font-medium text-muted-foreground backdrop-blur-sm"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setSearchOpen(true);
                    }}
                  >
                    <span className="absolute inset-0 bg-primary/0 transition-colors group-hover:bg-primary/5" />
                    <span className="relative flex w-full items-center justify-between">
                      <span className="flex items-center gap-2">
                        <SearchIcon className="h-4 w-4" />
                        Search
                      </span>
                      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
                        <span className="text-xs">⌘</span>K
                      </kbd>
                    </span>
                  </Button>

                  {[
                    { href: '/servers', icon: Server, label: 'Servers' },
                    { href: '/clients', icon: Network, label: 'Clients' },
                    { href: '/blog', icon: BookOpen, label: 'Blog' },
                  ].map(({ href, icon: Icon, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="group relative rounded-lg p-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="absolute inset-0 rounded-lg bg-primary/0 transition-colors group-hover:bg-primary/5" />
                      <span className="relative flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {label}
                      </span>
                    </Link>
                  ))}

                  <div className="my-2 border-t border-border opacity-50" />

                  <Button
                    variant="outline"
                    className="group relative w-full overflow-hidden rounded-lg border-border text-sm font-medium text-muted-foreground"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setAddServerOpen(true);
                    }}
                  >
                    <span className="absolute inset-0 bg-primary/0 transition-colors group-hover:bg-primary/5" />
                    <span className="relative flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Add Server
                    </span>
                  </Button>

                  <Button
                    className="relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-primary to-accent text-sm font-medium text-white shadow-md transition-all hover:shadow-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="absolute inset-0 bg-white/0 transition-colors hover:bg-white/10" />
                    <span className="relative flex items-center gap-2">
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </span>
                  </Button>
                </nav>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
