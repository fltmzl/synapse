"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { newsData, productionData } from "@/data/news-data";
import SectionTitle from "@/components/typography/section-title";
import { ArrowLeftIcon } from "@/icons/arrow-left-icon";
import { ArrowRightIcon } from "@/icons/arrow-right-icon";
import ExploreCard from "../card/explore-card";
import SectionContainer from "@/components/container/section-container";
import { H4 } from "@/components/typography/h4";

export default function ExploreArticle() {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleCount = 3;
  const totalItems = newsData.length;
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;
    const cardWidth = containerRef.current.children[0].clientWidth + 24; // width + gap
    containerRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth"
    });
  };

  const handleNext = () => {
    if (activeIndex < totalItems - visibleCount) {
      const next = activeIndex + 1;
      setActiveIndex(next);
      scrollToIndex(next);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      const prev = activeIndex - 1;
      setActiveIndex(prev);
      scrollToIndex(prev);
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateIndex = () => {
      const cardWidth = el.children[0].clientWidth + 24;
      const newIndex = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(newIndex);
    };

    el.addEventListener("scroll", updateIndex);
    return () => el.removeEventListener("scroll", updateIndex);
  }, []);

  return (
    <SectionContainer className="w-full flex flex-col gap-6 lg:gap-10 py-6 pl-4 lg:py-20 lg:pl-20 h-full">
      <div className="max-w-7xl mx-autoa">
        <h1 className="font-medium text-2xl lg:text-[40px] text-left leading-[110%] tracking-[-0.02em]">
          Explore more articles
        </h1>

        {/* Carousel wrapper */}
        <div className="relative w-full overflow-hidden overflow-x-auto hide-scrollbar scroll-smooth snap-x snap-mandatory ">
          <div
            className="flex transition-transform duration-700 ease-in-out gap-6 h-full"
            style={{
              transform: `translateX(-${activeIndex * (100 / visibleCount)}%)`
            }}
          >
            {newsData.map((news, i) => (
              <div key={i} className="snap-start flex-shrink-0 h-full">
                <ExploreCard {...news} />
              </div>
            ))}
          </div>
        </div>

        {/* Controls + Dots */}
        <div className="flex justify-between items-center w-full pr-10">
          {/* Dots */}
          <div className="flex gap-2">
            {Array.from({ length: totalItems - visibleCount + 1 }).map(
              (_, i) => (
                <span
                  key={i}
                  className={clsx(
                    "h-1.5 rounded-full transition-all duration-300",
                    activeIndex === i ? "bg-primary w-6" : "bg-border w-2"
                  )}
                />
              )
            )}
          </div>

          {/* Controls */}
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={clsx(
                "bg-background rounded-full w-10 h-10 border grid place-content-center",
                activeIndex === 0 && "opacity-40 cursor-not-allowed"
              )}
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              disabled={activeIndex >= totalItems - visibleCount}
              className={clsx(
                "bg-background rounded-full w-10 h-10 border grid place-content-center",
                activeIndex >= totalItems - visibleCount &&
                  "opacity-40 cursor-not-allowed"
              )}
            >
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
