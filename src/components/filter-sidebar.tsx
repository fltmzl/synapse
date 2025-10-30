"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from "@/components/ui/accordion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  groups: Record<string, { label: string; value: string }[]>;
  value: string[] | null;
  setValue: (
    value: string[] | null | ((old: string[] | null) => string[] | null),
    options?: Record<string, unknown>
  ) => Promise<URLSearchParams>;
}

export default function SidebarFilters({ groups, value, setValue, isLast = false }: Props & { isLast?: boolean }) {
  const selected = value ?? [];
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  const toggleValue = (val: string) => {
    setValue((old) => {
      const current = old ?? [];
      return current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val];
    });
  };

  const toggleShowMore = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
<div className={cn("w-full p-5", !isLast && "border-b")}>      <Accordion
        type="multiple"
        className="p-0"
        defaultValue={Object.keys(groups)}
      >
        {Object.entries(groups).map(([key, items]) => {
          const isExpanded = expandedSections[key] ?? false;
          const visibleItems = isExpanded ? items : items.slice(0, 5);

          return (
            <AccordionItem
              key={key}
              value={key}
              className="flex flex-col gap-4 py-0"
            >
              <AccordionTrigger className="flex items-center font-medium text-foreground leading-[140%] tracking-tighter text-xl  hover:text-primary transition-colors py-0">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </AccordionTrigger>

              <AccordionContent className="transition-all duration-300 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down pb-0">
                <div className="space-y-2">
                  {visibleItems.map((item) => (
                    <label
                      key={item.value}
                      className="flex items-center gap-2 text-base cursor-pointer select-none"
                    >
                      <Checkbox
                        checked={selected.includes(item.value)}
                        onCheckedChange={() => toggleValue(item.value)}
                        className="text-muted-foreground"
                      />
                      {item.label}
                    </label>
                  ))}

                  {items.length > 5 && (
                    <button
                      type="button"
                      onClick={() => toggleShowMore(key)}
                      className="text-primary text-sm mt-2 hover:underline"
                    >
                      {isExpanded ? "Show less" : "Show more"}
                    </button>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
