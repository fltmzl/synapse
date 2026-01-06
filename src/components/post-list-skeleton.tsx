import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface PostListSkeletonProps {
  count?: number;
}

export default function PostListSkeleton({ count = 5 }: PostListSkeletonProps) {
  return (
    <div className="flex flex-col divide-y divide-border">
      {Array.from({ length: count }).map((_, i, arr) => {
        const isFirst = i === 0;
        const isLast = i === arr.length - 1;

        return (
          <div
            key={i}
            className={cn(
              "flex gap-5 lg:gap-6 lg:items-center lg:flex-row flex-col",
              !isFirst && "pt-8",
              !isLast && "pb-8"
            )}
          >
            {/* Image Skeleton */}
            <Skeleton className="w-full flex-shrink-0 h-[200px] lg:w-[240px] lg:h-[150px] rounded-md" />

            <div className="flex flex-col gap-2 w-full">
              {/* Meta info (Category | Date) */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-20" />
                <span className="mx-1 w-[2px] h-[14px] bg-border" />
                <Skeleton className="h-5 w-24" />
              </div>

              {/* Title */}
              <Skeleton className="h-7 w-3/4" />
              <Skeleton className="h-7 w-1/2" />
            </div>

            {/* Arrow Icon Skeleton (Desktop) */}
            <div className="hidden lg:flex items-center">
              <Skeleton className="w-12 h-12 rounded-full" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
