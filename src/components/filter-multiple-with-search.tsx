"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { Options } from "nuqs";
import * as React from "react";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";

type Props = {
  listItems: { label: string; value: string }[];
  value: string[];
  setValue: (
    value: string[] | ((old: string[] | null) => string[] | null) | null,
    options?: Options | undefined
  ) => Promise<URLSearchParams>;
  placeholder?: string;
  buttonLabel: string;
};

export default function FilterMultipleWithSearch({
  listItems,
  placeholder,
  value,
  buttonLabel,
  setValue
}: Props) {
  const [open, setOpen] = React.useState(false);
  const isFiltered = React.useMemo(() => value.length > 0, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline-hover-primary"
          role="combobox"
          size="2md"
          aria-expanded={open}
          className={cn(
            "justify-center lg:justify-between h-fit gap-3 hover:text-foreground",
            {
              "border-primary": isFiltered
            }
          )}
        >
          <span className="min-w-18 lg:min-w-auto">{buttonLabel}</span>
          <ChevronDown className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[232px] p-0">
        <Command className="p-1">
          <CommandInput
            placeholder={placeholder || "Search..."}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>Not found.</CommandEmpty>
            <CommandGroup className="p-0">
              <div className="flex items-center justify-between text-sm p-2">
                <span className="text-muted-foreground">
                  {value.length} selected
                </span>

                <button
                  onClick={() => setValue([])}
                  className="text-primary tracking-tight"
                >
                  Clear filter
                </button>
              </div>

              <div className="max-h-[224px] overflow-y-auto scrollbar-custom scrollbar-custom-sm scrollbar-custom-primary">
                {listItems.map((item) => (
                  <CommandItem
                    className="p-2 pl-4 cursor-pointer flex justify-between"
                    key={String(item.value)}
                    onSelect={(currentValue) => {
                      const isAlreadySelected = value.includes(currentValue);

                      if (isAlreadySelected) {
                        setValue(value.filter((v) => v !== currentValue));
                      } else {
                        setValue([...value, currentValue]);
                      }
                    }}
                  >
                    <span>{item.label}</span>
                    <Checkbox checked={value.includes(item.value)} />
                  </CommandItem>
                ))}
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
