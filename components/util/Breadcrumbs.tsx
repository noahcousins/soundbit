'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

export default function Breadcrumbs({ items }: { items: any }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ol className="inline-flex items-center space-x-1 text-xs md:space-x-3">
      {items
        .map(({ name, link }: { name: string; link: string }) => {
          let truncatedName = name;

          if (isMobile) {
            truncatedName = name.length > 40 ? `${name.slice(0, 30)}...` : name;
          } else {
            truncatedName = name.length > 70 ? `${name.slice(0, 60)}...` : name;
          }

          return (
            <li
              className="inline-flex items-center whitespace-nowrap font-medium uppercase text-primary"
              key={name}
            >
              {link ? (
                <Link href={link} className="hover:underline">
                  {truncatedName}
                </Link>
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="text-primary/90">{truncatedName}</p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="normal-case">{name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </li>
          );
        })
        .reduce((prev: any, curr: any, index: number, array: any) => {
          if (index === array.length - 1) {
            return [...prev, curr];
          } else {
            return [
              ...prev,
              curr,
              <ChevronRight size={16} className="text-primary" key={index} />
            ];
          }
        }, [])}
    </ol>
  );
}
