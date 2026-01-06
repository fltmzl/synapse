"use client";

import { H1 } from "@/components/typography/h1";
import { H2 } from "@/components/typography/h2";
import { NewsItem } from "@/types/news.type";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  category: string;
  date: string;
  title: string;
  image: string;
  slug: string;
};

export default function NewsCard({
  category,
  date,
  title,
  image,
  slug
}: Props) {
  return (
    <article>
      <Link href={`/news/${slug}`}>
        <div className="flex flex-col gap-5">
          <div className="relative w-full h-[260px] overflow-hidden rounded-md">
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                priority
                className="object-cover "
              />
            ) : (
              <div className="w-full h-[260px] overflow-hidden rounded-md bg-muted text-muted-foreground grid place-content-center">
                <ImageOff className="mx-auto mb-2" />
                No Cover Image
              </div>
            )}
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
