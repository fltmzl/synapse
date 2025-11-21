"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, X } from "lucide-react";
import { useQueryState } from "nuqs";

export default function SearchActors({
  onSearch
}: {
  onSearch: (value: string) => void;
}) {
  const [searchValue, setSearchValue] = useQueryState("search");
  const handleChange = (value: string) => {
    setSearchValue(value || null); 
  };

  const handleSubmit = () => {
    onSearch(searchValue || "");
  };

  const clearInput = () => {
    setSearchValue(null);
    onSearch("");
  };

  return (
    <div className="relative w-full h-full rounded-md flex justify-center pl-5 pr-2 py-2  border bg-background">
      <Input
        placeholder="Entrez un nom..."
        value={searchValue || ""}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        className="relative p-0 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      {searchValue && (
        <button
          onClick={clearInput}
          aria-label="Clear search input"
          className="absolute right-16 top-1/2 -translate-y-1/2 text-muted-foreground/80 "
        >
          <X className="w-6 h-6 stroke-[1.5]" />
        </button>
      )}

      <Button
        onClick={handleSubmit}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-primary hover:bg-primary/90 hover:border-primary w-12 h-12 flex items-center justify-center"
      >
        <SearchIcon className="h-4 w-4 text-white hover:text-primary " />
      </Button>
    </div>
  );
}
