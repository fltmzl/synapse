"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
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
import { Spinner } from "../spinner";

interface Option {
  value: string;
  label: string;
}

interface ComboboxCreateProps {
  options: Option[];
  value?: string;
  onValueChange: (value: string) => void;
  onCreate?: (value: string) => void;
  isCreating?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  createText?: string;
  className?: string;
  disabled?: boolean;
}

export function ComboboxCreate({
  options,
  value,
  onValueChange,
  onCreate,
  isCreating,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  emptyText = "No option found.",
  createText = "Create",
  className,
  disabled = false
}: ComboboxCreateProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (currentValue: string) => {
    onValueChange(currentValue === value ? "" : currentValue);
    setOpen(false);
  };

  const handleCreate = () => {
    if (onCreate && searchQuery) {
      onCreate(searchQuery);
      setSearchQuery("");
    }
  };

  const showCreateOption =
    searchQuery &&
    !options.some(
      (option) => option.label.toLowerCase() === searchQuery.toLowerCase()
    );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between font-normal p-3",
            {
              "text-muted-foreground": !Boolean(selectedOption?.label)
            },
            className
          )}
          disabled={disabled}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[var(--radix-popover-trigger-width)] w-full p-0">
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty className="py-2 px-2">
              <p className="text-sm text-muted-foreground mb-2">{emptyText}</p>
              {showCreateOption && onCreate && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start px-2 h-8 text-primary hover:text-primary hover:bg-primary/10"
                  onClick={handleCreate}
                  disabled={isCreating}
                >
                  {isCreating ? <Spinner /> : <Plus className="mr-2 h-4 w-4" />}
                  {createText} &quot;{searchQuery}&quot;
                </Button>
              )}
            </CommandEmpty>
            <CommandGroup className="py-3 px-0">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => handleSelect(option.value)}
                  className="flex items-center justify-between px-3 py-1 cursor-pointer"
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
