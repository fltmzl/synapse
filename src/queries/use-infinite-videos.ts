"use client";

import { QUERIES } from "@/constants/queries.constant";
import { VideoService } from "@/services/video.api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { QueryDocumentSnapshot } from "firebase/firestore";

export default function useInfiniteVideos(options?: {
  categories?: string[];
  territories?: string[];
  persons?: string[];
  search?: string;
  sortBy?: string;
  limit?: number;
}) {
  return useInfiniteQuery({
    queryKey: [
      QUERIES.ARTICLES,
      "videos",
      "infinite",
      options?.categories,
      options?.territories,
      options?.persons,
      options?.search,
      options?.sortBy
    ],
    queryFn: ({ pageParam }) =>
      VideoService.getAll({ ...options, lastVisible: pageParam }),
    initialPageParam: undefined as QueryDocumentSnapshot | undefined,
    getNextPageParam: (lastPage) => lastPage.lastVisible || undefined
  });
}
