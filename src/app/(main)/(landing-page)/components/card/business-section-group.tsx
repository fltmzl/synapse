"use client";

import { Article } from "@/types/article.type";
import NewsCornerLargeCard from "./news-corner-large-card";
import NewsCornerSmallCard from "./news-corner-small-card";
import { format } from "date-fns";

type Props = {
  articles: Article[];
};

export default function BusinessSectionGroup({ articles }: Props) {
  if (articles.length === 0) return null;

  const mainArticle = articles[0];
  const sideArticles = articles.slice(1);

  return (
    <div className="flex flex-col h-full">
      <NewsCornerLargeCard
        title={mainArticle.title}
        image={mainArticle.coverImage || ""}
        href={`/news/${mainArticle.slug}`}
        description={
          mainArticle.content?.replace(/<[^>]*>/g, "").slice(0, 150) || ""
        }
        dateString={
          mainArticle.createdAt
            ? format(mainArticle.createdAt.toDate(), "MMM dd, yyyy")
            : "Unknown date"
        }
      />

      <div className="flex flex-col mt-4">
        {sideArticles.map((article, i) => (
          <NewsCornerSmallCard
            key={article.id || i}
            title={article.title}
            href={`/news/${article.slug}`}
            image={article.coverImage || ""}
            dateString={
              article.createdAt
                ? format(article.createdAt.toDate(), "MMM dd, yyyy")
                : "Unknown date"
            }
          />
        ))}
      </div>
    </div>
  );
}
