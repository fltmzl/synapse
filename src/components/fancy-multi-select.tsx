"use client";

import * as React from "react";
import { ChevronDown, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList
} from "@/components/ui/command-default";
import { Command as CommandPrimitive } from "cmdk";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

type Option = Record<"value" | "label", string>;

type Props = {
  options: Option[];
  onValueChange: (values: Option[]) => void;
  defaultValue?: Option[];
  placeholder?: string;
  value: Option[];
};

export function FancyMultiSelect({
  onValueChange,
  options,
  defaultValue,
  placeholder,
  value
}: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Option[]>(value);
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    onValueChange(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const handleUnselect = React.useCallback((option: Option) => {
    setSelected((prev) => prev.filter((s) => s.value !== option.value));
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  const selectables = options.filter((option) => !selected.includes(option));

  const getPlaceholder = () => {
    if (selected.length) return "";
    if (placeholder) return placeholder;
    return "Select...";
  };

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div
        className={cn(
          "relative group rounded-md border border-input p-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring",
          {
            "h-10": !selected.length
          }
        )}
      >
        <div className="flex flex-wrap gap-1">
          {selected.map((option) => {
            return (
              <Badge
                key={option.value}
                variant="muted"
                className="rounded-[3px]"
              >
                {option.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(option);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(option)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={getPlaceholder()}
            className="flex-1 bg-background outline-none placeholder:text-muted-foreground text-xs font-medium"
          />

          <ChevronDown className="absolute right-3 size-4" />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((framework) => {
                  return (
                    <CommandItem
                      key={framework.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={(value) => {
                        setInputValue("");
                        setSelected((prev) => [...prev, framework]);
                      }}
                      className={"cursor-pointer text-xs font-medium"}
                    >
                      {framework.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}
