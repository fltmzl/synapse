"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SearchIcon, X } from "lucide-react";
import { on } from "events";

export default function SearchPersonality({ onSearch }: { onSearch: (value: string) => void }) {
  const [value, setValue] = useState("");

  const clearInput = () => {
    setValue("");
  };
  return (
    <div className="relative w-full h-full rounded-md flex justify-center pl-5 pr-2 py-2  border bg-background">
      <Input
        placeholder="Entrez un nom..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="relative p-0 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      {/* Tombol clear (X) */}
      {value && (
        <button
          onClick={clearInput}
          className="absolute right-16 top-1/2 -translate-y-1/2 text-muted-foreground/80 "
        >
          <X className="w-6 h-6 stroke-[1.5]" />
        </button>
      )}

      {/* Tombol Search */}
      <Button
        size="icon"
        onClick={() => onSearch(value)}
        className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md bg-primary hover:bg-background hover:border-primary w-10 h-10 flex items-center justify-center"
      >
        <SearchIcon className="h-4 w-4 text-white hover:text-primary " />
      </Button>
    </div>
  );
}
