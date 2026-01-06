import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function NewsCardSkeleton() {
  return (
    <div className="w-full h-[364px] overflow-hidden rounded-md">
      <Skeleton className="w-full h-[260px]" />
      <div className="flex flex-col gap-5 mt-5">
        <Skeleton className="w-5/12 h-4" />
        <Skeleton className="w-full h-4" />
      </div>
    </div>
  );
}
