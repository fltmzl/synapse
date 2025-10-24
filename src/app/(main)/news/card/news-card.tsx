"use client";

import { H4 } from "@/components/typography/h4";
import { ArrowRightIcon } from "@/icons/arrow-right-icon";
import { ArrowUpRightIcon } from "@/icons/arrow-up-right";
import { NewsItem } from "@/types/news.type";
import Image from "next/image";

export default function NewsCard({ category, date, title, image }: NewsItem) {
  return (
    <div className="flex gap-5 lg:items-center lg:flex-row flex-col">
      <div className="relative w-full h-[200px] lg:w-[240px] lg:h-[150px]  rounded-md">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2  w-full">
        <div className="flex items-center">
          <span className="text-base tracking-normal leading-[150%] text-muted-foreground font-regular">
            {category}
          </span>
          <span className="mx-3 w-px h-[14px] bg-border" />
          <span className=" text-base tracking-normal leading-[150%] text-muted-foreground font-regular">
            {date}
          </span>
        </div>
        <H4>{title}</H4>
      </div>
      <div className="flex items-center">
        <button className="rounded-full w-12 h-12 border  grid place-content-center ">
          <ArrowUpRightIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
