"use client";

import { QUERIES } from "@/constants/queries.constant";
import { ArticleService } from "@/services/article.api";
import { SectionCategory } from "@/types/article.type";
import { useQuery } from "@tanstack/react-query";

export default function useArticles(sectionCategory?: SectionCategory) {
  return useQuery({
    queryKey: [QUERIES.ARTICLES, sectionCategory],
    queryFn: () => ArticleService.getAll(sectionCategory)
  });
}
