import SectionContainer from "@/components/container/section-container";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function ArticleSkeleton() {
  return (
    <SectionContainer className="lg:pt-10 lg:pb-16 py-8 flex justify-center">
      <div className="w-full flex flex-col gap-10 px-6 max-w-7xl mx-auto">
        <div className="py-0 lg:px-10">
          <header className="flex flex-col gap-6 lg:gap-8 text-left py-0 px-0 lg:pt-16 pb-6 lg:pb-10 lg:px-[140px]">
            {/* Title Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-8 lg:h-10 w-full" />
              <Skeleton className="h-8 lg:h-10 w-3/4" />
            </div>

            {/* Metadata Skeleton (Category | Date) */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-24" />
              <span className="w-px h-5 bg-muted-foreground/30" />
              <Skeleton className="h-5 w-32" />
            </div>
          </header>

          {/* Main Image Skeleton */}
          <div className="relative w-full">
            <Skeleton className="w-full h-[200px] lg:h-[600px] rounded-md" />
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="border-none shadow-none lg:px-[180px] flex flex-col gap-8">
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-10/12" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-9/12" />
          </div>

          <div className="space-y-4 mt-4">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
          </div>

          {/* Share Section Skeleton */}
          <div className="flex items-center gap-4 mt-4">
            <Skeleton className="h-6 w-12" />
            <div className="flex gap-2">
              <Skeleton className="rounded-full w-[42px] h-[42px]" />
              <Skeleton className="rounded-full w-[42px] h-[42px]" />
              <Skeleton className="rounded-full w-[42px] h-[42px]" />
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
