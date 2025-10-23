"use client";

import { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import SectionTitle from "@/components/typography/section-title";
import { productionData } from "@/data/news-data";
import ProductionCard from "../card/production-card";
import { ArrowLeftIcon } from "@/icons/arrow-left-icon";
import { ArrowRightIcon } from "@/icons/arrow-right-icon";

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
      const cardWidth = el.querySelector("div > div")?.clientWidth || 300;
      const visibleCards = Math.floor(el.clientWidth / cardWidth) || 1;
      const totalPages = Math.ceil(productionData.length / visibleCards);
      setDotCount(totalPages);
    };

    updateDots();
    window.addEventListener("resize", updateDots);
    return () => window.removeEventListener("resize", updateDots);
  }, []);

  /** Track scroll to update active dot */
  useEffect(() => {
    const el = desktopRef.current;
    if (!el) return;

    const handleScroll = () => {
      const totalWidth = el.scrollWidth - el.clientWidth;
      const scrollRatio = el.scrollLeft / totalWidth;
      const newIndex = Math.round(scrollRatio * (dotCount - 1));
      setActiveIndex(newIndex);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [dotCount]);

  return (
    <div className="hidden h-full md:flex items-start gap-10">
      <div className="flex flex-col justify-between h-full items-start w-full max-w-xs shrink-0">
        <SectionTitle>Les dernières publications</SectionTitle>

        <div className="flex flex-row justify-between w-full items-center">
          {/* Arrows */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scroll("left")}
              className="rounded-full w-12 h-12 border hover:border-primary grid place-content-center"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="rounded-full w-12 h-12 border hover:border-primary grid place-content-center"
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
                  "h-2 rounded-full transition-all duration-300",
                  activeIndex === i ? "bg-primary w-8 h-[6px]" : "bg-border w-2"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* SCROLL AREA */}
      <div
        ref={desktopRef}
        className="flex gap-8 overflow-x-auto scroll-smooth hide-scrollbar w-full snap-x snap-mandatory"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {productionData.map((news, i) => (
          <ProductionCard
            key={i}
            data={news}
            className="snap-start flex-shrink-0 w-[320px]"
            variant="desktop"
          />
        ))}
      </div>
    </div>
  );
}
