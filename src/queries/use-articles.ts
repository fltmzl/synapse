"use client";

import { QUERIES } from "@/constants/queries.constant";
import { ArticleService } from "@/services/article.api";
import { ArticleQueryOptions } from "@/types/article.type";
import { useQuery } from "@tanstack/react-query";

export default function useArticles(options: ArticleQueryOptions = {}) {
  return useQuery({
    queryKey: [QUERIES.ARTICLES, options],
    queryFn: async () => {
      const response = await ArticleService.getAll(options);
      return response.data;
    }
  });
}
