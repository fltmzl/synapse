"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  groups: Record<string, { label: string; value: string }[]>;
  value: string[] | null;
  setValue: (
    value:
      | string[]
      | null
      | ((old: string[] | null) => string[] | null),
    options?: any
  ) => Promise<URLSearchParams>;
}

export default function SidebarFilters({ groups, value, setValue }: Props) {
  const selected = value ?? [];
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleValue = (val: string) => {
    setValue((old) => {
      const current = old ?? [];
      return current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val];
    });
  };

  return (
    <div className="w-full lg:w-64 space-y-6">

      {Object.entries(groups).map(([key, items]) => {
        const isOpen = openSections[key] ?? true;
        const visibleItems = isOpen ? items.slice(0, 5) : items;

        return (
          <div key={key} className="border-b pb-4">
            <button
              className="flex justify-between items-center w-full font-semibold text-sm"
              onClick={() => toggleSection(key)}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
              {isOpen ? (
                <ChevronUp className="size-4" />
              ) : (
                <ChevronDown className="size-4" />
              )}
            </button>

            {isOpen && (
              <div className="mt-3 space-y-2">
                {visibleItems.map((item) => (
                  <label
                    key={item.value}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <Checkbox
                      checked={selected.includes(item.value)}
                      onCheckedChange={() => toggleValue(item.value)}
                    />
                    {item.label}
                  </label>
                ))}

                {items.length > 5 && (
                  <button className="text-primary text-sm mt-2">
                    Show more
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
