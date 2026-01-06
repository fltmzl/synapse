"use client";

import { QUERIES } from "@/constants/queries.constant";
import { CategoryService } from "@/services/category.api";
import { useQuery } from "@tanstack/react-query";

export default function useCategoriesWithCount() {
  return useQuery({
    queryKey: [QUERIES.CATEGORIES_WITH_COUNT],
    queryFn: () => CategoryService.getAllWithTotalArticles()
  });
}
