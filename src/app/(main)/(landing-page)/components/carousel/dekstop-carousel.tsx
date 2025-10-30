"use client";

import { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import SectionTitle from "@/components/typography/section-title";
import { productionData } from "@/data/news-data";
import ProductionCard from "../card/production-card";
import { ArrowLeftIcon } from "@/icons/arrow-left-icon";
import { ArrowRightIcon } from "@/icons/arrow-right-icon";
import { cn } from "@/lib/utils";

export default function DesktopCarousel() {
  const desktopRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dotCount, setDotCount] = useState(1);

  /** Scroll handler */
  const scroll = (dir: "left" | "right") => {
    const el = desktopRef.current;
    if (!el) return;
    const scrollWidth = el.clientWidth;
    el.scrollBy({
      left: dir === "left" ? -scrollWidth : scrollWidth,
      behavior: "smooth"
    });
  };

  /** Dynamic dots count */
  useEffect(() => {
    const updateDots = () => {
      const el = desktopRef.current;
      if (!el) return;

      const cards = Array.from(el.children).filter(
        (child) => !(child as HTMLElement).classList.contains("spacer")
      );
      const firstCard = cards[0] as HTMLElement;
      const cardWidth = firstCard?.getBoundingClientRect?.().width || 0;
      if (!cardWidth) return;

      const visibleCards = Math.max(1, Math.floor(el.clientWidth / cardWidth));
      const totalScrollableWidth =
        cards.length * (cardWidth + 24) - 24 - el.clientWidth;
      const totalPages = Math.max(
        1,
        Math.round(totalScrollableWidth / el.clientWidth + 1)
      );

      setDotCount(totalPages);
      setActiveIndex((prev) => Math.min(prev, totalPages - 1));
    };

    const timeout = setTimeout(updateDots, 50);
    window.addEventListener("resize", updateDots);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updateDots);
    };
  }, []);

  /** Track scroll to update active dot */
  useEffect(() => {
    const el = desktopRef.current;
    if (!el) return;

    const handleScroll = () => {
      const cards = Array.from(el.children).filter(
        (child) => !(child as HTMLElement).classList.contains("spacer")
      ) as HTMLElement[];

      if (cards.length === 0) return;

      const cardWidth = cards[0].clientWidth;
      const gap = 24; // sesuai gap-6
      const totalCardsWidth = cards.length * (cardWidth + gap) - gap;
      const visibleCards = Math.max(1, Math.floor(el.clientWidth / cardWidth));
      const pageWidth = visibleCards * (cardWidth + gap);
      const totalPages = Math.ceil(cards.length / visibleCards);
      const maxIndex = totalPages - 1;

      const rawIndex = Math.round(el.scrollLeft / pageWidth);
      const nearRightEnd =
        el.scrollLeft + el.clientWidth >= totalCardsWidth - 10; // batas real tanpa spacer

      const newIndex = nearRightEnd
        ? maxIndex
        : Math.min(Math.max(rawIndex, 0), maxIndex);

      setActiveIndex(newIndex);
    };

    el.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => el.removeEventListener("scroll", handleScroll);
  }, [dotCount]);

  return (
    <div className="hidden h-full md:flex items-start gap-16 md:justify-end 2xl:translate-x-20 3xl:justify-center">
      <div className="flex flex-col justify-between h-full items-start w-full max-w-xs shrink-0">
        <SectionTitle>Les dernières publications</SectionTitle>

        <div className="flex flex-row justify-between w-full items-center">
          {/* Arrows */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scroll("left")}
              className="bg-background rounded-full w-12 h-12 border hover:border-primary grid place-content-center"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="bg-background rounded-full w-12 h-12 border hover:border-primary grid place-content-center"
            >
              <ArrowRightIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: dotCount }).map((_, i) => (
              <span
                key={i}
                className={clsx(
                  "h-1.5 rounded-full transition-all duration-300",
                  activeIndex === i ? "bg-primary w-8 h-1.5" : "bg-border w-1.5"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* SCROLL AREA */}
      <div
        ref={desktopRef}
        className="flex gap-6 overflow-x-auto scroll-smooth hide-scrollbar lg:pr-14"
        style={{
          WebkitOverflowScrolling: "touch",
          overflowX: "scroll",
          scrollSnapType: "x mandatory"
        }}
      >
        {productionData.map((news, i) => (
          <ProductionCard
            key={i}
            {...news}
            className="snap-start flex-shrink-0"
            variant="desktop"
          />
        ))}

        {/* Spacer kanan biar gak nempel layar */}
        <div className="flex-shrink-0 w-[24px]" />
      </div>
    </div>
  );
}
