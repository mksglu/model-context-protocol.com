import React from 'react';

import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'MCP Directory',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Blog', href: '/blog' },
        {
          label: 'Documentation',
          href: 'https://modelcontextprotocol.io/introduction',
          external: true,
        },
        { label: 'Contact', href: 'https://mksg.lu', external: true },
      ],
    },
    {
      title: 'Menu',
      links: [
        { label: 'Servers', href: '/servers' },
        { label: 'Clients', href: '/clients' },
      ],
    },
  ];

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 py-8 md:grid-cols-3">
          <div className="col-span-1">
            <Link href="/" className="flex items-center">
              <span className="rounded-md bg-gradient-to-r from-black to-gray-900 px-2 py-1 text-xl font-bold text-white">
                MCP Directory
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">Model Context Protocol Directory</p>
            <p className="mt-2 text-sm text-gray-500">
              © {currentYear} model-context-protocol.com
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-sm text-gray-600 hover:text-gray-900">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 py-4">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 text-xs text-gray-500 md:mb-0">
              <span>
                The Model Context Protocol (MCP) is an open standard for AI model communication.
              </span>
            </div>
            <div className="text-xs text-gray-500">
              <span>Powered by </span>
              <a
                href="https://mksg.lu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:underline"
              >
                Mert Koseoglu
              </a>
              <span className="ml-1 rounded-full bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-600">
                Software Forge
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
