"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import useCategoriesWithCount from "@/queries/use-categories-with-count";
import { useMemo } from "react";

type Props = {
  selected: string;
  onSelect: (val: string) => void;
};

export default function NewsFilter({ selected, onSelect }: Props) {
  const { data: categoriesData, isLoading } = useCategoriesWithCount();

  const categories = useMemo(() => {
    if (!categoriesData) return [];

    const allCount = categoriesData.reduce(
      (acc, cat) => acc + cat.totalArticles,
      0
    );
    const allCategory = { label: "Tout", value: "All", count: allCount };

    return [
      allCategory,
      ...categoriesData.map((cat) => ({
        label: cat.name,
        value: cat.name,
        count: cat.totalArticles
      }))
    ];
  }, [categoriesData]);

  if (isLoading) {
    return (
      <div className="flex gap-3 overflow-x-auto hide-scrollbar">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-10 w-24 bg-muted animate-pulse rounded-md"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-3 overflow-x-auto hide-scrollbar">
      {categories.map(({ label, value, count }) => {
        const isActive = selected === value;
        return (
          <Button
            key={label}
            onClick={() => onSelect(value)}
            variant="ghost"
            className={cn(
              "hover:bg-background rounded-md px-6 py-3 text-md font-medium border transition-all leading-[140%] tracking-tighter hover:border-primary",
              isActive ? "border-primary bg-background" : "border bg-background"
            )}
          >
            <span
              className={cn(
                isActive ? "text-primary" : "group-hover:text-primary"
              )}
            >
              {label}
            </span>
            <span
              className={cn(
                "ml-1",
                isActive
                  ? "text-muted-foreground font-regular"
                  : "text-regular text-muted-foreground group-hover:text-muted-foreground"
              )}
            >
              ({count})
            </span>
          </Button>
        );
      })}
    </div>
  );
}
