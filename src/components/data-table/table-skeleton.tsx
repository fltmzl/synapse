import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function TableSkeleton() {
  const rows = Array.from(Array(10).keys());

  return (
    <div className="flex flex-col gap-2">
      {rows.map((row) => (
        <div className="flex gap-10 h-16 py-5 px-3" key={row}>
          <Skeleton className="w-28 h-full" />
          <Skeleton className="w-full h-full" />
          <Skeleton className="w-full h-full" />
          <Skeleton className="w-full h-full" />
          <Skeleton className="w-full h-full" />
        </div>
      ))}
    </div>
  );
}
