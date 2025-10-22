"use client";

import Image from "next/image";
import { businessPosts } from "@/data/business-data";
import { H1 } from "@/components/typography/h1";

export default function BusinessCard() {
  return (
    <div>
      {/* Featured post */}
      <article>
        <div>
          <Image
            src={businessPosts[0].img}
            alt={businessPosts[0].title}
            width={1200}
            height={600}
            className="w-full mb-4 h-56 object-cover rounded-md"
          />
          <div className="flex flex-col gap-2">
            <p className="text-base text-muted-foreground">
              {businessPosts[0].date}
            </p>
            <H1>{businessPosts[0].title}</H1>
            <p className="line-clamp-3 mb-5 text-base text-muted-foreground">
              {businessPosts[0].desc}
            </p>
          </div>
        </div>

        {/* Small list under featured */}
        <div>
          {businessPosts.slice(1).map((post, i) => (
            <div
              key={i}
              className="border-t border-gray-200 py-5 flex items-center gap-4"
            >
              <Image
                src={post.img}
                alt={post.title}
                width={96}
                height={64}
                className="rounded-sm object-cover flex-shrink-0"
              />
              <div className="flex flex-col justify-center gap-2">
                <p className="text-xs">{post.date}</p>
                <h4 className="text-lg font-medium leading-snug tracking-tight">
                  {post.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
