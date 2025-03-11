import { useCallback, useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { Card } from '@/backend/types/types';

import { cn } from '@/lib/utils';

import { Star } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

type InfiniteMovingCardsProps = {
  items: Card[];
  direction?: 'left' | 'right';
  speed?: 'slow' | 'medium' | 'fast';
  pauseOnHover?: boolean;
  className?: string;
  type?: 'servers' | 'clients';
};

const InfiniteMovingCards = ({
  items,
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  className,
  type = 'servers',
}: InfiniteMovingCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  const getDirection = useCallback(() => {
    if (containerRef.current) {
      if (direction === 'left') {
        containerRef.current.style.setProperty('--animation-direction', 'forwards');
      } else {
        containerRef.current.style.setProperty('--animation-direction', 'reverse');
      }
    }
  }, [direction]);

  const getSpeed = useCallback(() => {
    if (containerRef.current) {
      if (speed === 'fast') {
        containerRef.current.style.setProperty('--animation-duration', '1s');
      } else if (speed === 'medium') {
        containerRef.current.style.setProperty('--animation-duration', '40s');
      } else {
        containerRef.current.style.setProperty('--animation-duration', '80s');
      }
    }
  }, [speed]);

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }, [getDirection, getSpeed]);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  return (
    <div
      ref={containerRef}
      className={cn('scroller relative z-20 mx-auto max-w-7xl overflow-hidden', className)}
    >
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-[100px] bg-gradient-to-r from-gray-50 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-[100px] bg-gradient-to-l from-gray-50 to-transparent" />

      <ul
        ref={scrollerRef}
        className={cn(
          'flex min-w-full shrink-0 gap-4 py-4',
          start && 'animate-scroll',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
      >
        {items.map((item) => (
          <li
            className="group relative h-[250px] w-[350px] max-w-full flex-shrink-0 overflow-hidden rounded-2xl bg-gradient-to-b from-white to-gray-50/50 p-6 transition-all"
            key={item.id}
          >
            {/* Subtle Border */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-black/[0.04]" />
            
            {/* Card Content Container */}
            <div className="relative z-20 flex h-full flex-col">
              {/* Header Section */}
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="truncate text-base font-medium text-gray-800">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span className="text-xs font-medium">{item.stars}</span>
                    </div>
                  </div>
                  {item.language && (
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary/60" />
                      <p className="text-xs text-gray-500">{item.language}</p>
                    </div>
                  )}
                </div>
                
                <a
                  href={item.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 text-gray-400 transition-colors hover:text-gray-600"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaGithub className="h-4 w-4" />
                </a>
              </div>

              {/* Description */}
              <div className="mt-4">
                <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
                  {item.description}
                </p>
              </div>

              {/* Categories */}
              {item.categories && item.categories.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                  {item.categories.map((category, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full bg-black/[0.02] px-2 py-0.5 text-[10px] font-medium text-gray-600"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-black/[0.02] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Full Card Link */}
            <Link href={`/${type}/${item.slug}`} className="absolute inset-0 z-30" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfiniteMovingCards;
