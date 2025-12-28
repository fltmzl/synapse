"use client";

import React from "react";
import ArticleCard from "./article-card";
import ExploreArticle from "./explore-article";
import useArticleBySlug from "@/queries/use-article-by-slug";

export default function ArticleContent({ slug }: { slug: string }) {
  console.log({ slug });
  const { data: article, isLoading, isError } = useArticleBySlug(slug);

  console.log({ article });

  return (
    <section className="w-full min-h-screen p-4 flex flex-col gap-4">
      <ArticleCard articleDetail={article || null} />
      <ExploreArticle />
    </section>
  );
}
