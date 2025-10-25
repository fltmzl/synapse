"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SearchIcon } from "lucide-react";

type SearchBarProps = {
  onSearch: (value: string) => void;
};

export const SearchSocialNetwork = ({ onSearch }: SearchBarProps) => {
  const [value, setValue] = useState("");

  return (
    <div className="max-w-md  justify-center flex gap-2 w-full flex-col lg:flex-row ">
      <div className="w-full">
        <SearchIcon className="absolute ml-3 mt-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Try 'tax reform', or 'elections'..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="pl-9"
        />
      </div>
      <Button onClick={() => onSearch(value)}>Search</Button>
    </div>
  );
};
