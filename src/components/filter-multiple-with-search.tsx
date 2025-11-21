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
  buttonSize?: "default" | "sm" | "md" | "2md" | "lg" | "xl" | "icon";
  buttonClassName?: string;
  buttonTextClassName?: string;
  arrowDownClassName?: string;
  popoverAlign?: "center" | "start" | "end";
};

export default function FilterMultipleWithSearch({
  listItems,
  placeholder,
  value,
  buttonLabel,
  setValue,
  buttonSize = "2md",
  buttonClassName,
  buttonTextClassName,
  arrowDownClassName,
  popoverAlign = "start"
}: Props) {
  const [open, setOpen] = React.useState(false);
  const isFiltered = React.useMemo(() => value.length > 0, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline-hover-primary"
          role="combobox"
          size={buttonSize}
          aria-expanded={open}
          className={cn(
            "w-full lg:w-max leading-[140%] tracking-tighter justify-center lg:justify-between h-fit gap-3 py-3 hover:text-foreground",
            buttonClassName,
            {
              "border-primary": isFiltered
            }
          )}
        >
          <span className={cn("min-w-18 lg:min-w-auto", buttonTextClassName)}>
            {buttonLabel}
          </span>
          <ChevronDown className={cn("size-5", arrowDownClassName)} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align={popoverAlign}
        className="min-w-[var(--radix-popover-trigger-width)] w-full p-0"
      >
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
                  Effacer filtres
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
