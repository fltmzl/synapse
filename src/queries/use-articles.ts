"use client";

import { QUERIES } from "@/constants/queries.constant";
import { ArticleService } from "@/services/article.api";
import { useQuery } from "@tanstack/react-query";

export default function useArticles() {
  return useQuery({
    queryKey: [QUERIES.ARTICLES],
    queryFn: ArticleService.getAll
  });
}
