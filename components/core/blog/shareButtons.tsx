'use client';

import React from 'react';

import { ResponseBlogPost } from '@/backend/types/types';

import { FaLinkedin, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';

type SharePlatform = 'twitter' | 'linkedin' | 'whatsapp';

interface ShareButtonsProps {
  post: ResponseBlogPost;
  shareUrl: string;
}

export default function ShareButtons({ post, shareUrl }: ShareButtonsProps) {
  const handleShare = (platform: SharePlatform) => {
    const text = encodeURIComponent(post.title);
    const url = encodeURIComponent(shareUrl);

    const shareLinks = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
    };

    window.open(shareLinks[platform], '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      <button
        onClick={() => handleShare('twitter')}
        className="rounded-full bg-black p-2 text-white transition-colors hover:bg-gray-800"
      >
        <FaXTwitter size={18} />
      </button>

      <button
        onClick={() => handleShare('linkedin')}
        className="rounded-full bg-[#0077b5] p-2 text-white transition-colors hover:bg-[#006396]"
      >
        <FaLinkedin size={18} />
      </button>

      <button
        onClick={() => handleShare('whatsapp')}
        className="rounded-full bg-[#25D366] p-2 text-white transition-colors hover:bg-[#20bd5a]"
      >
        <FaWhatsapp size={18} />
      </button>
    </div>
  );
}
