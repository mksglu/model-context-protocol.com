'use client';

import React from 'react';

import { FaLinkedin, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';

type SharePlatform = 'twitter' | 'linkedin' | 'whatsapp';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const handleShare = (platform: SharePlatform) => {
    const text = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);

    const shareLinks = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${text}%20${encodedUrl}`,
    };

    window.open(shareLinks[platform], '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handleShare('twitter')}
        className="text-gray-500 hover:text-gray-700 p-1.5 rounded-md hover:bg-gray-100"
        aria-label="Share on Twitter"
      >
        <FaXTwitter size={16} />
      </button>

      <button
        onClick={() => handleShare('linkedin')}
        className="text-gray-500 hover:text-gray-700 p-1.5 rounded-md hover:bg-gray-100"
        aria-label="Share on LinkedIn"
      >
        <FaLinkedin size={16} />
      </button>

      <button
        onClick={() => handleShare('whatsapp')}
        className="text-gray-500 hover:text-gray-700 p-1.5 rounded-md hover:bg-gray-100"
        aria-label="Share on WhatsApp"
      >
        <FaWhatsapp size={16} />
      </button>
    </div>
  );
}
