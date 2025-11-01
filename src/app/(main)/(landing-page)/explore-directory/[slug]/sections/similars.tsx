"use client";

import Link from "next/link";
import { directory } from "@/data/directory-data";
import { BuildingIcon } from "@/icons/building-icon";
import { MapPin, User } from "lucide-react";
import { FacebookFillIcon } from "@/icons/facebook-fill-icon";
import { InstagramIconFlat } from "@/icons/instagram-icon-flat";
import { LinkedinIconFlat } from "@/icons/linkedin-icon-flat";
import { ArrowRightBoldIcon } from "@/icons/arrow-right-bold-icon";
import { useRef } from "react";
import { ArrowLeftIcon } from "@/icons/arrow-left-icon";
import { ArrowRightIcon } from "@/icons/arrow-right-icon";

export default function AdministrationSimilars() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 350;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-background">
      <div className="py-12 lg:py-20 px-6 max-w-7xl mx-auto">
        {/* 🖥 DESKTOP HEADER */}
        <div className="hidden lg:flex items-center justify-between mb-10">
          <h1 className="text-[28px] leading-[130%] tracking-[-0.02em] lg:text-[40px] font-medium lg:leading-[110%] lg:tracking-[-0.03em]">
            Administration similaire
          </h1>

          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="p-2 border rounded-full hover:bg-muted transition"
              aria-label="Scroll left"
            >
              <ArrowLeftIcon className="size-5 text-muted-foreground" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 border rounded-full hover:bg-muted transition"
              aria-label="Scroll right"
            >
              <ArrowRightIcon className="size-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* 📱 MOBILE HEADER */}
        <div className="flex lg:hidden flex-col mb-6">
          <h1 className="text-[24px] leading-[130%] tracking-[-0.02em] font-medium mb-2">
            Administration similaire
          </h1>
        </div>

        {/* Card List */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto hide-scrollbar scroll-smooth"
        >
          {directory.slice(0, 6).map((item) => (
            <article
              key={item.slug}
              className="min-w-[320px] sm:min-w-[405px] border rounded-[12px] flex flex-col justify-between hover:shadow-sm transition-all"
            >
              {/* Header */}
              <div className="flex items-center gap-4 py-6 px-5 border-b">
                <div className="flex items-center justify-center w-16 h-16 bg-[#EEF6FF] rounded-full">
                  <BuildingIcon className="text-primary size-8 mx-4 " />
                </div>
                <span className="font-medium text-lg leading-[130%] tracking-[-0.02em]">
                  {item.name}
                </span>
              </div>

              {/* Middle */}
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-5">
                  <div className="flex gap-2 items-center min-w-[108px]">
                    <BuildingIcon className="size-5 text-muted-foreground" />
                    <span className="text-muted-foreground leading-[150%] text-base tracking-[-0.01em]">
                      Category
                    </span>
                  </div>
                  <span className="text-[var(--font-navy)] leading-[150%] text-base tracking-[-0.01em] font-medium">
                    {item.category}
                  </span>
                </div>

                <div className="flex items-start gap-5">
                  <div className="flex gap-2 items-center min-w-[108px]">
                    <MapPin
                      strokeWidth={1.5}
                      className="size-5 text-muted-foreground/80"
                    />
                    <span className="text-muted-foreground leading-[150%] text-base tracking-[-0.01em]">
                      Territory
                    </span>
                  </div>
                  <span className="text-[var(--font-navy)] leading-[150%] text-base tracking-[-0.01em] font-medium">
                    {item.territory}
                  </span>
                </div>

                <div className="flex items-start gap-5">
                  <div className="flex gap-2 items-center min-w-[108px]">
                    <User
                      strokeWidth={1}
                      className="size-5 text-muted-foreground/80"
                    />
                    <span className="text-muted-foreground leading-[150%] text-base tracking-[-0.01em]">
                      PIC
                    </span>
                  </div>
                  <span className="text-[var(--font-navy)] leading-[150%] text-base tracking-[-0.01em] font-medium">
                    {item.pic}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t py-4 px-6 flex items-center justify-between bg-[var(--body)] rounded-b-[12px]">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <FacebookFillIcon className="size-[18px]" />
                  <InstagramIconFlat className="size-[18px]" />
                  <LinkedinIconFlat className="size-[18px]" />
                </div>

                <Link
                  href={`/explore-directory/${item.slug}`}
                  className="flex items-center gap-[6px]"
                >
                  <span className="text-primary text-sm font-medium">
                    View detail
                  </span>
                  <ArrowRightBoldIcon className="size-[18px] text-primary" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* 📱 MOBILE SCROLL BUTTONS (under card) */}
        <div className="flex lg:hidden  gap-3 mt-6">
          <button
            onClick={() => scroll("left")}
            className="p-2 border rounded-full hover:bg-muted transition"
          >
            <ArrowLeftIcon className="size-5 text-muted-foreground" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 border rounded-full hover:bg-muted transition"
          >
            <ArrowRightIcon className="size-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
}
