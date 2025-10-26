"use client";

import { H4 } from "@/components/typography/h4";
import { ArrowUpRightIcon } from "@/icons/arrow-up-right";
import Image from "next/image";
import Link from "next/link";

type Props = {
  slug: string;
  category: string;
  date: string;
  title: string;
  images: string[];
};

export default function NewsCard({
  slug,
  category,
  date,
  title,
  images
}: Props) {
  return (
    <Link href={`/news/${slug}`} className="block group">
      <article className="flex gap-5 lg:items-center lg:flex-row flex-col ">
        <div className="relative w-full flex-shrink-0 h-[200px] lg:w-[240px] lg:h-[150px] rounded-md">
          <Image
            src={images[0]}
            alt={title}
            fill
            className="object-cover rounded-md "
            priority
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
          <H4 className="group-hover:text-primary">{title}</H4>
        </div>
        <div className="flex items-center">
          <button className="group-hover:border-primary rounded-full w-12 h-12 border  grid place-content-center ">
            <ArrowUpRightIcon className="w-6 h-6" />
          </button>
        </div>
      </article>
    </Link>
  );
}
