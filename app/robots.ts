import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://modelcontextprotocol.com';

  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/blog',
        '/about',
        '/servers',
        '/clients',
        '/privacy-policy',
        '/terms-of-service',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
