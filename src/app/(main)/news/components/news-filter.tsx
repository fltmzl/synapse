"use client";

import { Button } from "@/components/ui/button";

const categories = [
  { label: "Tout", count: 120 },
  { label: "Politique", count: 28 },
  { label: "Citoyenne", count: 32 },
  { label: "Juridique", count: 29 },
  { label: "Analyse", count: 31 }
];

interface Props {
  selected: string;
  onSelect: (val: string) => void;
}

export const NewsFilter = ({ selected, onSelect }: Props) => {
  return (
    <div className="flex gap-3 overflow-x-auto hide-scrollbar">
      {categories.map(({ label, count }) => {
        const isActive = selected === label;
        return (
          <Button
            key={label}
            onClick={() => onSelect(label)}
            variant="ghost"
            className={`hover:bg-background rounded-md px-6 py-4 text-md font-medium border transition-all leading-[140%] tracking-tighter
              ${
                isActive
                  ? "border-primary bg-background"
                  : "border bg-background"
              }
              hover:border-primary 
            `}
          >
            <span
              className={`${
                isActive ? "text-primary " : "group-hover:text-primary"
              }`}
            >
              {label}
            </span>
            <span
              className={`ml-1 ${
                isActive
                  ? "text-muted-foreground"
                  : "text-muted-foreground group-hover:text-muted-foreground"
              }`}
            >
              ({count})
            </span>
          </Button>
        );
      })}
    </div>
  );
};
