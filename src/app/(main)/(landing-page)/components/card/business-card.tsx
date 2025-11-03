"use client";

import { businessPosts } from "@/data/business-data";
import NewsCornerLargeCard from "./news-corner-large-card";
import NewsCornerSmallCard from "./news-corner-small-card";

export default function BusinessCard() {
  return (
    <div>
      <NewsCornerLargeCard
        title={businessPosts[0].title}
        image={businessPosts[0].img}
        href={"/"}
        description={businessPosts[0].desc || ""}
        dateString={businessPosts[0].date}
      />

      <div>
        {businessPosts.slice(0, 2).map((post, i) => (
          <NewsCornerSmallCard
            key={post.title + i}
            title={post.title}
            href={"/"}
            image={post.img}
            dateString={post.date}
          />
        ))}
      </div>
    </div>
  );
}
