"use client";

import { QUERIES } from "@/constants/queries.constant";
import { ArticleService } from "@/services/article.api";
import { useQuery } from "@tanstack/react-query";

export default function useArticleBySlug(slug: string) {
  return useQuery({
    queryKey: [QUERIES.ARTICLES, slug],
    queryFn: () => ArticleService.getBySlug(slug),
    enabled: !!slug
  });
}
