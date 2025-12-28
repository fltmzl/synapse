"use client";

import { QUERIES } from "@/constants/queries.constant";
import { CategoryService } from "@/services/category.api";
import { useQuery } from "@tanstack/react-query";

export default function useCategories() {
  return useQuery({
    queryKey: [QUERIES.CATEGORIES],
    queryFn: CategoryService.getAll
  });
}
