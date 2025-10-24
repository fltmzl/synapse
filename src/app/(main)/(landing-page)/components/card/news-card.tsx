"use client";

import { H1 } from "@/components/typography/h1";
import { H2 } from "@/components/typography/h2";
import { NewsItem } from "@/types/news.type";
import Image from "next/image";

export default function NewsCard({ category, date, title, image }: NewsItem) {
  return (
    <div className="flex flex-col gap-5">
      <div className="relative w-full h-[260px] overflow-hidden rounded-md">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover "
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <H2 className=" border-r pr-3">{category}</H2>
          <H2 className="pl-3"> {date}</H2>
        </div>
        <H1>{title}</H1>
      </div>
    </div>
  );
}
