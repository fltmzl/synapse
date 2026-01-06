"use client";

import { QUERIES } from "@/constants/queries.constant";
import { VideoService } from "@/services/video.api";
import { useQuery } from "@tanstack/react-query";

export default function useVideos(options?: {
  categories?: string[];
  territories?: string[];
  persons?: string[];
  search?: string;
  sortBy?: string;
}) {
  return useQuery({
    queryKey: [
      QUERIES.ARTICLES,
      "videos",
      options?.categories,
      options?.territories,
      options?.persons,
      options?.search,
      options?.sortBy
    ],
    queryFn: async () => {
      const response = await VideoService.getAll(options);
      return response.data;
    }
  });
}
