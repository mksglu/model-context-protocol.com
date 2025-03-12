import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-12">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6">
          <div className="text-[120px] font-bold leading-none text-blue-600">404</div>
        </div>

        <h2 className="mb-4 text-2xl font-medium text-gray-900">Page Not Found</h2>

        <p className="mb-8 text-gray-600">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center rounded-md border border-blue-600 px-5 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
