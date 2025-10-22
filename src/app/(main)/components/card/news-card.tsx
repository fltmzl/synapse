"use client";

import { H1 } from "@/components/typography/h1";
import { H2 } from "@/components/typography/h2";
import Image from "next/image";

type NewsCardProps = {
  category: string;
  date: string;
  title: string;
  image: string;
};

export default function NewsCard({
  category,
  date,
  title,
  image
}: NewsCardProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="relative w-full h-[260px] overflow-hidden rounded-md">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover transition-transform duration-500 group-hover:scale-105"
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
