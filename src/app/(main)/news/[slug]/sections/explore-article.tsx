"use client";

import { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import { newsData } from "@/data/news-data";
import SectionContainer from "@/components/container/section-container";
import ExploreCard from "../card/explore-card";
import { ArrowLeftIcon } from "@/icons/arrow-left-icon";
import { ArrowRightIcon } from "@/icons/arrow-right-icon";

export default function ExploreArticle() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeDot, setActiveDot] = useState(0);
  const [dotCount, setDotCount] = useState(1);

  // Scroll kanan / kiri
  const scroll = (dir: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;
    const scrollWidth = el.clientWidth;
    el.scrollBy({
      left: dir === "left" ? -scrollWidth : scrollWidth,
      behavior: "smooth"
    });
  };

  // Hitung jumlah dots
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateDots = () => {
      const scrollWidth = el.scrollWidth;
      const viewWidth = el.clientWidth;
      // ⛔ Fix: pastikan totalPages minimal 1 (supaya dots tidak hilang)
      const totalPages = Math.max(1, Math.ceil(scrollWidth / viewWidth));
      setDotCount(totalPages);
    };

    updateDots();
    window.addEventListener("resize", updateDots);
    return () => window.removeEventListener("resize", updateDots);
  }, []);

  // Update dot aktif saat scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const totalScrollable = el.scrollWidth - el.clientWidth;
      if (totalScrollable <= 0) return;
      const progress = scrollLeft / totalScrollable;
      const index = Math.round(progress * (dotCount - 1));
      setActiveDot(index);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [dotCount]);

  return (
    <SectionContainer
      className="
        w-full flex flex-col gap-6 lg:gap-16 py-6 pl-4 lg:py-20 lg:pl-20 h-full
        3xl:items-center 3xl:pl-0
      "
    >
      <div className="w-full flex flex-col gap-6 lg:gap-16 3xl:max-w-[1400px] 3xl:mx-auto">
        {/* TITLE */}
        <h1 className="font-medium text-2xl lg:text-[40px] text-left leading-[110%] tracking-[-0.03em]">
          Explore more articles
        </h1>

        {/* CAROUSEL */}
        <div className="w-full flex flex-col gap-10 3xl:max-w-[1400px] 3xl:mx-auto 3xl:items-center pr-6">
          {/* SCROLL AREA */}
          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar"
          >
            {newsData.map((news, i) => (
              <div
                key={i}
                className="snap-start flex-shrink-0 h-full"
                style={{ scrollSnapAlign: "start" }}
              >
                <ExploreCard {...news} />
              </div>
            ))}
          </div>

          {/* DOTS + ARROWS */}
          <div className="flex justify-between items-center w-full pr-10">
            {/* Dots */}
            <div className="flex gap-2">
              {Array.from({ length: dotCount }).map((_, i) => (
                <span
                  key={i}
                  className={clsx(
                    "h-1.5 rounded-full transition-all duration-300",
                    activeDot === i ? "bg-primary w-6" : "bg-border w-2"
                  )}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              <button
                onClick={() => scroll("left")}
                className="bg-background rounded-full w-10 h-10 border grid place-content-center hover:border-primary transition"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="bg-background rounded-full w-10 h-10 border grid place-content-center hover:border-primary transition"
              >
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
