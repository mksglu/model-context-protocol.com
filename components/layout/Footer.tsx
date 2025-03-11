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
        { label: 'Documentation', href: 'https://modelcontextprotocol.io/introduction', external: true },
        { label: 'Contact', href: 'https://mksg.lu', external: true },
      ],
    },
    {
      title: 'Products',
      links: [
        { label: 'Servers', href: '/servers' },
        { label: 'Clients', href: '/clients' },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Copyright */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-semibold text-gray-900">MCP Directory</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Model Context Protocol Directory
            </p>
            <p className="mt-2 text-sm text-gray-500">
              © {currentYear} model-context-protocol.com
            </p>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
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
                      <Link
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xs text-gray-500 mb-4 md:mb-0">
              <span>The Model Context Protocol (MCP) is an open standard for AI model communication.</span>
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
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-medium">
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
