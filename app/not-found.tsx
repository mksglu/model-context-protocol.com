import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-indigo-50 px-4 py-12">
      <div className="mx-auto max-w-md text-center">
        <div className="relative mb-8">
          <div className="select-none bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-[150px] font-extrabold leading-none text-transparent">
            404
          </div>
          <div className="absolute inset-0 -z-10 scale-110 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 opacity-30 blur-xl"></div>
        </div>

        <h2 className="mb-4 text-3xl font-bold text-gray-900">Page Not Found</h2>

        <p className="mb-8 text-gray-600">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-3 font-medium text-white shadow-lg transition-all hover:-translate-y-1 hover:from-orange-600 hover:to-pink-600 hover:shadow-orange-500/30"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
