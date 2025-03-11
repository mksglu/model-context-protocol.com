'use client';

import { useEffect, useState } from 'react';

import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollY = window.scrollY;

    const isNearBottom = scrollY + clientHeight >= scrollHeight - 100;

    if (isNearBottom) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={scrollToTop}
        className={`hover:border-primary-300 dark:hover:border-primary-600 focus:ring-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 group flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 ${
          isVisible ? 'translate-y-0 opacity-90' : 'pointer-events-none translate-y-10 opacity-0'
        } `}
        aria-label="Sayfanın üstüne çık"
      >
        <ArrowUp size={18} strokeWidth={2} className="transition-transform group-hover:scale-110" />
      </button>
    </div>
  );
}
