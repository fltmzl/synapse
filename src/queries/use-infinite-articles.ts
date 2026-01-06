"use client";

import { QUERIES } from "@/constants/queries.constant";
import { ArticleService } from "@/services/article.api";
import { ArticleQueryOptions } from "@/types/article.type";
import { useInfiniteQuery } from "@tanstack/react-query";
import { QueryDocumentSnapshot } from "firebase/firestore";

export default function useInfiniteArticles(options: ArticleQueryOptions = {}) {
  return useInfiniteQuery({
    queryKey: [QUERIES.ARTICLES, "infinite", options],
    queryFn: ({ pageParam }) =>
      ArticleService.getAll({ ...options, lastVisible: pageParam }),
    initialPageParam: undefined as QueryDocumentSnapshot | undefined,
    getNextPageParam: (lastPage) => lastPage.lastVisible || undefined
  });
}
