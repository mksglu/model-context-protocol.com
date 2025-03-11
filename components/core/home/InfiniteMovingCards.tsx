import { useCallback, useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { Card } from '@/backend/types/types';

import { cn } from '@/lib/utils';

import { Star } from 'lucide-react';
import { FaGithub, FaCodeBranch } from 'react-icons/fa6';

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
  speed = 'medium',
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
        containerRef.current.style.setProperty('--animation-duration', '20s');
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
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-[100px] bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-[100px] bg-gradient-to-l from-white to-transparent" />

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
            className="relative h-[130px] w-[350px] max-w-full flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white p-4 transition-all hover:shadow-sm"
            key={item.id}
          >
            {/* Card Content Container */}
            <div className="relative flex h-full flex-col">
              {/* Header Section */}
              <div className="flex items-center gap-2">
                <FaGithub className="h-4 w-4 text-gray-600" />
                <h3 className="truncate text-base font-semibold text-blue-600 hover:underline">
                  {item.name}
                </h3>
              </div>
              
              {/* Description */}
              <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                {item.description || 'No description provided'}
              </p>
              
              {/* Footer with metadata */}
              <div className="mt-auto flex flex-wrap items-center gap-4 pt-2 text-xs text-gray-500">
                {item.language && (
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                    <span>{item.language}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5" />
                  <span>{item.stars.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <FaCodeBranch className="h-3 w-3" />
                  <span>-</span>
                </div>
                
                {item.categories && item.categories.length > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600">
                      {item.categories[0]}
                    </span>
                    {item.categories.length > 1 && (
                      <span className="text-[10px]">+{item.categories.length - 1}</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Full Card Link */}
            <Link href={`/${type}/${item.slug}`} className="absolute inset-0 z-10" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfiniteMovingCards;
