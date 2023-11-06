"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Mic, ChevronLeft, ChevronRight } from "lucide-react";

import SectionHeader from "@/components/util/SectionHeader";

export default function HorizontalScrollSection({
  heading,
  description,
  children,
  link,
}: {
  heading: string;
  description: string;
  children: any;
  link: string;
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [needsScroll, setNeedsScroll] = useState(true);
  const [scrollPosition, setScrollPosition] = useState("left");
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (
      scrollRef.current &&
      scrollRef.current.scrollWidth <= scrollRef.current.offsetWidth
    ) {
      setNeedsScroll(false);
    }

    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", () => {
        if (scrollRef.current) {
          const maxScroll =
            scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
          if (
            scrollRef.current.offsetWidth + scrollRef.current.scrollLeft >=
            scrollRef.current.scrollWidth
          ) {
            setScrollPosition("right");
          } else if (scrollRef.current.scrollLeft === 0) {
            setScrollPosition("left");
          } else {
            setScrollPosition("middle");
          }
        }
      });
    }
  }, []);

  const scrollRight = () => {
    if (scrollRef.current) {
      const childElement = scrollRef.current.children[0] as HTMLElement;
      const itemWidth = childElement.offsetWidth;
      scrollRef.current.scrollBy({ left: itemWidth, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      const childElement = scrollRef.current.children[0] as HTMLElement;
      const itemWidth = childElement.offsetWidth;
      scrollRef.current.scrollBy({ left: -itemWidth, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (
      scrollRef.current &&
      scrollRef.current.scrollWidth > scrollRef.current.offsetWidth
    ) {
      setShowButtons(true);
    } else {
      setShowButtons(false);
    }
  }, []);

  return (
    <div className={`flex w-full flex-col gap-4`}>
      <div className="flex justify-between">
        <SectionHeader heading={heading} description={description} />

        <div className="flex flex-col gap-2">
          {showButtons && (
            <div className="flex w-full flex-row justify-end">
              {/* we can include "items-start" on the line below to make the buttons start at the top */}
              <div className="grid w-fit grid-cols-2 gap-2">
                <button
                  onClick={scrollLeft}
                  disabled={scrollPosition === "left"}
                  className="disabled:opacity-50"
                >
                  <ChevronLeft
                    className="flex rounded-full bg-foreground/10 px-1 transition-all duration-100 ease-in-out hover:bg-foreground/25"
                    size={24}
                  />
                </button>
                <button
                  onClick={scrollRight}
                  className="disabled:opacity-50"
                  disabled={scrollPosition === "right"}
                >
                  <ChevronRight
                    className="flex rounded-full bg-foreground/10 px-1 transition-all duration-100 ease-in-out hover:bg-foreground/25"
                    size={24}
                  />
                </button>
              </div>
            </div>
          )}

          {link !== undefined ? (
            <Link className="hidden sm:block" href={link}>
              <button className="group flex flex-row items-center gap-1 text-sm font-normal text-white opacity-80 transition-opacity duration-200 hover:opacity-100">
                <p>EXPLORE ALL</p>
                <ChevronRight
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  size={17}
                />
              </button>
            </Link>
          ) : null}
        </div>
      </div>

      <div className="max-w-full">
        <div
          className="flex snap-x gap-4 overflow-y-visible overflow-x-scroll scrollbar-hide"
          ref={scrollRef}
        >
          {children}
        </div>
      </div>
      {link !== undefined ? (
        <Link href={link} className="block sm:hidden">
          <button className="group flex flex-row items-center gap-1 text-sm font-normal text-white opacity-80 transition-opacity duration-200 hover:opacity-100">
            <p>EXPLORE ALL</p>
            <ChevronRight
              className="transition-transform duration-200 group-hover:translate-x-1"
              size={17}
            />
          </button>
        </Link>
      ) : null}
    </div>
  );
}
