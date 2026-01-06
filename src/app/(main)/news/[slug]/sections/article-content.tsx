"use client";

import React from "react";
import ArticleCard from "./article-card";
import ExploreArticle from "./explore-article";
import useArticleBySlug from "@/queries/use-article-by-slug";
import ArticleSkeleton from "../skeletons/article-skeleton";
import ArticleError from "../components/article-error";
import useArticleAnalytics from "@/hooks/use-article-analytics";

export default function ArticleContent({ slug }: { slug: string }) {
  const {
    data: article,
    isFetching,
    isError,
    refetch
  } = useArticleBySlug(slug);

  useArticleAnalytics(article?.id);

  if (isFetching) return <ArticleSkeleton />;

  if (isError) return <ArticleError onRetry={() => refetch()} />;

  return (
    <section className="w-full min-h-screen p-4 flex flex-col gap-4">
      <ArticleCard articleDetail={article || null} />
      <ExploreArticle />
    </section>
  );
}
