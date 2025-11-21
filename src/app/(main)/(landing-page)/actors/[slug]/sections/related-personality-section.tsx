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
import { DirectoryItem } from "@/types/directory.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function RelatedPersonalitySection() {
  const scrollRefDesktop = useRef<HTMLDivElement>(null);
  const scrollRefMobile = useRef<HTMLDivElement>(null);

  const scrollDesktop = (direction: "left" | "right") => {
    if (!scrollRefDesktop.current) return;
    const scrollAmount = 350;
    scrollRefDesktop.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  const scrollMobile = (direction: "left" | "right") => {
    if (!scrollRefMobile.current) return;

    const el = scrollRefMobile.current;
    const pageWidth = el.clientWidth;
    el.scrollBy({
      left: direction === "left" ? -pageWidth : pageWidth,
      behavior: "smooth"
    });
  };

  return (
    <section className="overflow-x-hidden bg-background">
      <div className="py-12 lg:py-20">
        {/* DEKSTOP */}
        <div className="hidden lg:flex items-center justify-between mb-10 max-w-7xl mx-6 xl:mx-auto">
          <h2 className="text-[28px] leading-[130%] tracking-[-0.02em] lg:text-[40px] font-medium lg:leading-[110%] lg:tracking-[-0.03em]">
            Related personality
          </h2>

          <div className="flex gap-3">
            <button
              onClick={() => scrollDesktop("left")}
              className="p-2 border rounded-full hover:bg-muted transition"
              aria-label="Scroll left"
            >
              <ArrowLeftIcon className="size-5 text-muted-foreground" />
            </button>
            <button
              onClick={() => scrollDesktop("right")}
              className="p-2 border rounded-full hover:bg-muted transition"
              aria-label="Scroll right"
            >
              <ArrowRightIcon className="size-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRefDesktop}
          className="hidden lg:flex gap-4 overflow-x-auto hide-scrollbar scroll-smooth max-w-full px-6 3xl:max-w-7xl 3xl:mx-auto"
        >
          {directory.slice(0, 6).map((item) => (
            <Card key={item.slug} item={item} />
          ))}
        </div>

        {/* MOBILE */}
        <div className="flex flex-col lg:hidden mb-6">
          <h2 className="text-[24px] font-semibold mb-4">
            Related personality
          </h2>
        </div>

        <div className="flex lg:hidden flex-col items-center">
          <div
            ref={scrollRefMobile}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar scroll-smooth w-full"
          >
            {Array.from({ length: Math.ceil(directory.length / 2) }).map(
              (_, index) => {
                const start = index * 2;
                const pair = directory.slice(start, start + 2);
                return (
                  <div
                    key={index}
                    className="snap-center flex-shrink-0 w-full flex flex-col gap-4"
                  >
                    {pair.map((item) => (
                      <Card key={item.slug} item={item} />
                    ))}
                  </div>
                );
              }
            )}
          </div>

          <div className="flex justify-start w-full gap-4 mt-6">
            <button
              onClick={() => scrollMobile("left")}
              className="p-3 border rounded-full hover:bg-muted transition"
              aria-label="Scroll left"
            >
              <ArrowLeftIcon className="size-5 text-muted-foreground" />
            </button>
            <button
              onClick={() => scrollMobile("right")}
              className="p-3 border rounded-full hover:bg-muted transition"
              aria-label="Scroll right"
            >
              <ArrowRightIcon className="size-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ item }: { item: DirectoryItem }) {
  return (
    <article className="relative border rounded-[12px] flex flex-col justify-between hover:shadow-sm transition-all bg-background min-w-full lg:min-w-[405px]">
      <Badge size="lg" variant="muted" className="absolute top-4 right-4">
        {item.category}
      </Badge>

      <div className="flex flex-col items-start gap-4 py-6 px-5 border-b">
        <div className="flex items-center justify-center w-16 h-16 bg-[#EEF6FF] rounded-full">
          <Avatar className="w-20 h-20">
            <AvatarImage
              src={"http://placehold.jpw/100x100.png"}
              alt={"actor"}
            />
            <AvatarFallback>
              <span className="text-xl">JD</span>
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="space-y-2">
          <div className="font-medium text-xl leading-[130%] tracking-[-0.02em]">
            Marie Clarie
          </div>
          <div className="text-base text-muted-foreground">CEO Synapse</div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex flex-col lg:flex-row items-start gap-2">
          <div className="flex gap-2 items-center min-w-[108px]">
            <BuildingIcon className="size-5 text-muted-foreground" />
            <span className="text-muted-foreground leading-[150%] text-base tracking-[-0.01em]">
              Affiliation
            </span>
          </div>
          <span className="text-[var(--font-navy)] leading-[150%] text-base tracking-[-0.01em] font-medium">
            Directeur Synapse
          </span>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-2">
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
      </div>

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
          <span className="text-secondary text-sm font-medium">
            View profile
          </span>
          <ArrowRightBoldIcon className="size-[18px] text-primary" />
        </Link>
      </div>
    </article>
  );
}
