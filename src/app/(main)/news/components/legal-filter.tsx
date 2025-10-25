"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, Ghost } from "lucide-react";
import { ArrowUpIcon } from "@/icons/arrow-up-icon";
import { Chevron } from "react-day-picker";

interface Props {
  onFilterChange: (filter: string, value: string[]) => void;
}

export const LegalFilter = ({ onFilterChange }: Props) => {
  const categories = [
    "Tax Law",
    "Labor Law",
    "Environment",
    "Immigration",
    "Indigenous Rights"
  ];
  const territories = [
    "Martinique",
    "Guadeloupe",
    "Réunion",
    "Mayotte",
    "French Guiana"
  ];
  const persons = [
    "Éric Dubois",
    "Sophie Laurent",
    "Marc Rivière",
    "Jean-Paul Lévy",
    "Louise Morel"
  ];

  const [selected, setSelected] = useState({
    category: [] as string[],
    territory: [] as string[],
    person: [] as string[]
  });

  const handleToggle = (type: keyof typeof selected, value: string) => {
    const updated = selected[type].includes(value)
      ? selected[type].filter((v) => v !== value)
      : [...selected[type], value];
    const newState = { ...selected, [type]: updated };
    setSelected(newState);
    onFilterChange(type, updated);
  };

  const handleClear = (type: keyof typeof selected) => {
    const newState = { ...selected, [type]: [] };
    setSelected(newState);
    onFilterChange(type, []);
  };

  const renderPopover = (
    label: string,
    type: keyof typeof selected,
    options: string[]
  ) => {
    const count = selected[type].length;
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full lg:w-auto gap-3 px-4 py-3 flex items-center lg:justify-between min-w-[140px] rounded-sm border border-gray-300 text-foreground bg-transparent hover:text-foreground hover:bg-transparent hover:border-primary text-md leading-[140%] tracking-tighter font-medium "
            )}
          >
            {label}
            <ChevronDownIcon className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-2 rounded-md shadow-md border  bg-background">
          <Command className="border-0 shadow-none rounded-sm">
            <CommandInput
              placeholder={`Search ${label.toLowerCase()}`}
              className="placeholder:text-muted-foreground"
            />
            <div className="flex items-center justify-between text-xs py-1 text-muted-foreground">
              <span>{count} selected</span>
              {count > 0 && (
                <button
                  onClick={() => handleClear(type)}
                  className="text-primary hover:underline"
                >
                  Clear filter
                </button>
              )}
            </div>
            <CommandList className="h-full overflow-y-auto">
              <CommandEmpty>No results found.</CommandEmpty>
              <div className="flex flex-col gap-1">
                {options.map((item) => (
                  <div key={item} className="flex flex-col">
                    <CommandItem
                      className="justify-between flex items-center gap-2 cursor-pointer text-sm"
                      onSelect={() => handleToggle(type, item)}
                    >
                      <span>{item}</span>
                      <Checkbox
                        checked={selected[type].includes(item)}
                        onCheckedChange={() => handleToggle(type, item)}
                        className="rounded-sm"
                      />
                    </CommandItem>
                  </div>
                ))}
              </div>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row  gap-3 lg:items-center">
      <span className="text-md text-muted-foreground font-medium ">
        Filter by
      </span>
      {renderPopover("Catégorie", "category", categories)}
      {renderPopover("Territoire", "territory", territories)}
      {renderPopover("Person", "person", persons)}
    </div>
  );
};
