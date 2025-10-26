"use client";

import { H1 } from "@/components/typography/h1";
import { H2 } from "@/components/typography/h2";
import { NewsItem } from "@/types/news.type";
import Image from "next/image";
import Link from "next/link";

type Props = {
  category: string;
  date: string;
  title: string;
  image: string;
};

export default function NewsCard({ category, date, title, image }: Props) {
  return (
    <article>
      <Link href="#">
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
              <span className="text-base tracking-[-0.01em] leading-[150%] text-muted-foreground font-medium">
                {category}
              </span>
              <span className="mx-3 w-px h-[14px] bg-border" />
              <span className=" text-base tracking-[-0.01em] leading-[150%] text-muted-foreground font-medium">
                {date}
              </span>
            </div>
            <H1>{title}</H1>
          </div>
        </div>
      </Link>
    </article>
  );
}
