'use client';

import React from 'react';

import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  description: string;
  url: string;
}

export default function ShareButton({ title, description, url }: ShareButtonProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: description,
        url,
      });
    } else {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title
        )}&url=${encodeURIComponent(url)}`,
        '_blank'
      );
    }
  };

  return (
    <button
      onClick={handleShare}
      className="text-gray-500 hover:text-gray-700"
      aria-label="Share"
    >
      <Share2 className="h-5 w-5" />
    </button>
  );
} 