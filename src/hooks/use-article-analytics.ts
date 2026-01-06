"use client";

import { useEffect, useRef } from "react";
import { ArticleService } from "@/services/article.api";

export default function useArticleAnalytics(id: string | undefined) {
  const startTimeRef = useRef<number>(Date.now());
  const hasIncrementedView = useRef(false);

  useEffect(() => {
    if (!id) return;

    // Increment view once per session/mount
    if (!hasIncrementedView.current) {
      ArticleService.incrementView(id);
      hasIncrementedView.current = true;
    }

    startTimeRef.current = Date.now();

    return () => {
      const endTime = Date.now();
      const durationSeconds = Math.floor(
        (endTime - startTimeRef.current) / 1000
      );

      // Only track if they stayed for more than 3 seconds to avoid noise
      if (durationSeconds > 3) {
        ArticleService.updateReadTime(id, durationSeconds);
      }
    };
  }, [id]);
}
