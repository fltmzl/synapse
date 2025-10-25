"use client";

import { forecastPosts } from "@/data/business-data";
import NewsCornerLargeCard from "./news-corner-large-card";
import NewsCornerSmallCard from "./news-corner-small-card";

export default function BusinessForecast() {
  return (
    <div>
      <NewsCornerLargeCard
        title={forecastPosts[0].title}
        image={forecastPosts[0].img}
        href={"/"}
        description={forecastPosts[0].desc || ""}
        dateString={forecastPosts[0].date}
      />

      <div>
        {forecastPosts.slice(1).map((post, i) => (
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
