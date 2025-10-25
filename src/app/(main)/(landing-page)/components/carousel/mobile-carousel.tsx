"use client";

import { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import { productionData } from "@/data/news-data";
import SectionTitle from "@/components/typography/section-title";
import ProductionCard from "../card/production-card";
import { ArrowLeftIcon } from "@/icons/arrow-left-icon";
import { ArrowRightIcon } from "@/icons/arrow-right-icon";

export default function MobileCarousel() {
  const mobileRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dotCount, setDotCount] = useState(1);

  const scroll = (dir: "left" | "right") => {
    const el = mobileRef.current;
    if (!el) return;
    const width = el.clientWidth;
    el.scrollBy({ left: dir === "left" ? -width : width, behavior: "smooth" });
  };

  useEffect(() => {
    const el = mobileRef.current;
    if (!el) return;
    const handleScroll = () => {
      const newIndex = Math.round(el.scrollLeft / el.clientWidth);
      setActiveIndex(newIndex);
    };
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  /** Dynamic dots count */
  useEffect(() => {
    const updateDots = () => {
      const el = mobileRef.current;
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
    const el = mobileRef.current;
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
    <div className="md:hidden flex flex-col items-center text-center gap-10 pr-6">
      <SectionTitle>Les dernières publications</SectionTitle>

      <div
        ref={mobileRef}
        className="w-full overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex gap-6">
          {productionData.map((news, i) => (
            <div key={i} className="snap-center flex-shrink-0 w-full">
              <ProductionCard data={news} variant="mobile" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between w-full items-center">
        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-6">
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
        <div className="flex items-center justify-center gap-1 mt-4">
          {productionData.map((_, i) => (
            <span
              key={i}
              className={clsx(
                "h-2 rounded-full transition-all duration-300",
                activeIndex === i ? "bg-primary w-8" : "bg-border w-2"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
