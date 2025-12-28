"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface TagsInputProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function TagsInput({
  value,
  defaultValue = [],
  onChange,
  placeholder = "Type and press Enter",
  disabled
}: TagsInputProps) {
  const [tags, setTags] = React.useState<string[]>(value ?? defaultValue);
  const [input, setInput] = React.useState("");

  // sync controlled value
  React.useEffect(() => {
    if (value) setTags(value);
  }, [value]);

  const updateTags = (next: string[]) => {
    setTags(next);
    onChange?.(next);
  };

  const addTag = (raw: string) => {
    const tag = raw.trim();
    if (!tag) return;
    if (tags.includes(tag)) return;

    updateTags([...tags, tag]);
    setInput("");
  };

  const removeTag = (tag: string) => {
    updateTags(tags.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input.replace(",", ""));
    }

    if (e.key === "Backspace" && !input && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-md border border-input bg-background px-3 py-2",
        disabled && "opacity-50"
      )}
    >
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="secondary"
          className="flex items-center gap-1"
        >
          {tag}
          {!disabled && (
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1 rounded-sm hover:bg-muted"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </Badge>
      ))}

      <Input
        disabled={disabled}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="h-8 min-w-[120px] flex-1 border-none p-0 focus-visible:ring-0"
      />
    </div>
  );
}
