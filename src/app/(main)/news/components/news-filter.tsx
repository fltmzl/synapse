"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = [
  { label: "Tout", count: 120 },
  { label: "Politique", count: 28 },
  { label: "Citoyenne", count: 32 },
  { label: "Juridique", count: 29 },
  { label: "Analyse", count: 31 }
];

type Props = {
  selected: string;
  onSelect: (val: string) => void;
};

export default function NewsFilter({ selected, onSelect }: Props) {
  return (
    <div className="flex gap-3 overflow-x-auto hide-scrollbar">
      {categories.map(({ label, count }) => {
        const isActive = selected === label;
        return (
          <Button
            key={label}
            onClick={() => onSelect(label)}
            variant="ghost"
            className={cn(
              "hover:bg-background rounded-md px-6 py-4 text-md font-medium border transition-all leading-[140%] tracking-tighter hover:border-primary",
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
