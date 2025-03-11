import React from 'react';

import Link from 'next/link';

import { FaDiscord, FaGithub, FaXTwitter } from 'react-icons/fa6';
import { IoIosMail } from 'react-icons/io';

const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-gradient-to-b from-background to-background/80 pt-16 pb-12">
      <div className="absolute inset-0 bg-grid-primary/5 [mask-image:linear-gradient(to_bottom,transparent,white,white,transparent)]" />
      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" className="mb-6 flex items-center transition-all hover:opacity-90">
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
            <p className="mb-6 text-sm text-muted-foreground md:text-base">
              The largest collection of MCP Servers, featuring Awesome MCP Servers and Claude MCP
              integration.
            </p>
            <div className="flex space-x-4">
              <Link 
                href="#" 
                className="group relative rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="absolute inset-0 rounded-lg bg-primary/0 transition-colors group-hover:bg-primary/5" />
                <FaXTwitter size={18} className="relative" />
              </Link>
              <Link 
                href="#" 
                className="group relative rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="absolute inset-0 rounded-lg bg-primary/0 transition-colors group-hover:bg-primary/5" />
                <FaGithub size={18} className="relative" />
              </Link>
              <Link 
                href="#" 
                className="group relative rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="absolute inset-0 rounded-lg bg-primary/0 transition-colors group-hover:bg-primary/5" />
                <FaDiscord size={18} className="relative" />
              </Link>
              <Link 
                href="#" 
                className="group relative rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="absolute inset-0 rounded-lg bg-primary/0 transition-colors group-hover:bg-primary/5" />
                <IoIosMail size={18} className="relative" />
              </Link>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="mb-4 text-base font-medium text-foreground">Resources</h3>
            <ul className="space-y-3">
              {[
                { href: '#', label: 'Model Context Protocol' },
                { href: '#', label: 'MCP Starter Guide' },
                { href: '#', label: 'Claude MCP Servers' },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group relative text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label}
                    <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full opacity-50" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="mb-4 text-base font-medium text-foreground">Community</h3>
            <ul className="space-y-3">
              {[
                { href: '#', label: 'Telegram' },
                { href: '#', label: 'Discord' },
                { href: '#', label: 'GitHub' },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group relative text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label}
                    <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full opacity-50" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="mb-4 text-base font-medium text-foreground">Legal</h3>
            <ul className="space-y-3">
              {[
                { href: '/privacy-policy', label: 'Privacy Policy' },
                { href: '/terms-of-service', label: 'Terms of Service' },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group relative text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label}
                    <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full opacity-50" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center border-t border-border py-6 text-center text-sm text-muted-foreground">
          <p>©{new Date().getFullYear()} model-context-protocol. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
