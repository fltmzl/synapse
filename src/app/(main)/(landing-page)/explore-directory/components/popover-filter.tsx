// components/filter-popover.tsx
"use client";

import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import clsx from "clsx";
import { FilterIcon } from "@/icons/filter-icon";

interface FilterOption {
  label: string;
  value: string;
}

interface Filters {
  territoire: FilterOption[];
  category: FilterOption[];
}

interface FilterPopoverProps {
  filters: Filters;
  territoire: string[];
  setTerritoire: (value: string[]) => void;
  category: string[];
  setCategory: (value: string[]) => void;
  activeValues: string[];
  clearAll: () => void;
}

export default function FilterPopover({
  filters,
  territoire,
  setTerritoire,
  category,
  setCategory,
  activeValues,
  clearAll
}: FilterPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="py-3 px-4 gap-2 justify-start rounded-[8px] w-max"
        >
          <FilterIcon className="size-6 text-foreground" />
          <span className="text-base font-medium leading-[140%] tracking-[-0.01em] text-left">
            Filter
          </span>
          {activeValues.length > 0 && (
            <div>
              <span className=" bg-[#EEF6FF] text-primary text-sm font-medium leading-none rounded-full w-[22px] h-[22px] px-2 flex items-center justify-center">
                {activeValues.length}
              </span>
            </div>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-[220px] rounded-[12px] p-1 flex gap-1 flex-col "
      >
        <div className="flex items-center justify-between p-2">
          <p className="text-sm text-muted-foreground leading-[140%] tracking-[-0.01em]">
            {activeValues.length} selected
          </p>
          {activeValues.length > 0 && (
            <button
              onClick={clearAll}
              className="text-sm text-primary hover:underline leading-[140%] tracking-[-0.01em]"
            >
              Clear filter
            </button>
          )}
        </div>

        <div className="space-y-1">
          <NestedGroup
            label="Territoire"
            options={filters.territoire}
            selected={territoire}
            setSelected={setTerritoire}
          />

          <NestedGroup
            label="Domaine"
            options={filters.category}
            selected={category}
            setSelected={setCategory}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
function NestedGroup({
  label,
  options,
  selected,
  setSelected
}: {
  label: string;
  options: FilterOption[];
  selected: string[];
  setSelected: (v: string[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleValue = (value: string) =>
    setSelected(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );

  return (
    <div>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between">
          <PopoverTrigger onMouseOver={() => setIsOpen(true)} asChild>
            <button
              type="button"
              className="w-full text-left flex items-center justify-between py-2 px-4 rounded-md hover:bg-muted/80 transition"
            >
              <span className="text-base leading-[140%] tracking-[-0.01em]">
                {label}
              </span>
            </button>
          </PopoverTrigger>
        </div>

        <PopoverContent
          side="right"
          align="start"
          sideOffset={15}
          className={clsx("w-[189px] rounded-md p-1 shadow-lg ")}
        >
          <div className="space-y-2">
            {options.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center cursor-pointer p-2 justify-between hover:bg-muted/80 rounded-md transition"
              >
                <span className="text-base leading-[140%] tracking-[-0.01em]">
                  {opt.label}
                </span>
                <Checkbox
                  checked={selected.includes(opt.value)}
                  onCheckedChange={() => toggleValue(opt.value)}
                />
              </label>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
