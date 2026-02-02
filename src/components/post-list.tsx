"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon, ImageOff } from "lucide-react";
import { H4 } from "@/components/typography/h4";
import { cn } from "@/lib/utils";
import { NewsItem } from "@/types/news.type";
import { Skeleton } from "./ui/skeleton";

interface PostListProps {
  data: NewsItem[];
  variant?: "opportunity" | "news";
}

export default function PostList({
  data,
  variant = "opportunity"
}: PostListProps) {
  return (
    <div
      className={cn(
        "flex flex-col",
        variant === "news" && "divide-y divide-border"
      )}
    >
      {data.slice(0, 5).map((post, i, arr) => {
        const isFirst = i === 0;
        const isLast = i === arr.length - 1;

        return (
          <Link
            key={post.title + i}
            href={variant === "news" ? `/news/${post.slug}` : "#"}
            className="block group"
          >
            <article
              className={cn(
                "flex gap-5 lg:gap-6 lg:items-center lg:flex-row flex-col",
                variant === "opportunity"
                  ? `pt-8 ${i !== arr.length - 1 ? "border-b pb-8" : ""}`
                  : [
                      !isFirst && "pt-8",
                      !isLast && "pb-8 border-b border-border"
                    ]
              )}
            >
              <div className="relative w-full flex-shrink-0 h-[200px] lg:w-[240px] lg:h-[150px] rounded-md">
                {post.images ? (
                  <Image
                    src={post.images[0]}
                    alt={post.title}
                    fill
                    className="object-cover rounded-[4px]"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-muted rounded-[4px] grid place-content-center text-muted-foreground">
                    <ImageOff className="mx-auto mb-2" />
                    No Cover Image
                  </div>
                )}

                {variant === "opportunity" && (
                  <button className="absolute top-3 right-3 rounded-full w-10 h-10 border bg-white/80 backdrop-blur-md border-gray-300 group-hover:border-primary grid place-content-center lg:hidden">
                    <ArrowUpRightIcon className="w-5 h-5 text-gray-700" />
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-2 w-full">
                {variant === "opportunity" ? (
                  <span className="text-base tracking-[-0.01em] leading-[150%] text-muted-foreground font-regular">
                    {post.date}
                  </span>
                ) : (
                  <div className="flex items-center">
                    <span className="text-base tracking-normal leading-[150%] text-muted-foreground font-regular">
                      {post.category}
                    </span>
                    <span className="mx-3 w-[2px] h-[14px] bg-border" />
                    <span className="text-base tracking-normal leading-[150%] text-muted-foreground font-regular">
                      {post.date}
                    </span>
                  </div>
                )}

                <H4 className="leading-[140%] tracking-[-0.02em] group-hover:text-primary">
                  {post.title}
                </H4>

                {variant === "opportunity" && (
                  <p className="line-clamp-2 text-base tracking-[-0.01em] leading-[150%] text-muted-foreground">
                    {post.description}
                  </p>
                )}
              </div>

              <div
                className={cn(
                  "items-center",
                  variant === "opportunity" ? "hidden lg:flex" : "flex"
                )}
              >
                <button className="group-hover:border-primary rounded-full w-12 h-12 border grid place-content-center">
                  <ArrowUpRightIcon className="w-6 h-6" />
                </button>
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  );
}
