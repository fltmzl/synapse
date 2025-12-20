"use client";

import { QUERIES } from "@/constants/queries.constant";
import { ArticleService } from "@/services/article.api";
import { useQuery } from "@tanstack/react-query";

export default function useArticle(id: string) {
  return useQuery({
    queryKey: [QUERIES.ARTICLES, id],
    queryFn: () => ArticleService.getById(id),
    enabled: !!id
  });
}
