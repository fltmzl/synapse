"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { SearchIcons } from "@/icons/search-icon";

type SearchBarProps = {
  onSearch: (value: string) => void;
};

export default function SearchSocialNetwork({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState("");

  return (
    <div className=" justify-center flex gap-2 w-full flex-col lg:flex-row  ">
      <div className=" lg:w-[428px] relative">
        <SearchIcons className="absolute ml-3 mt-[14px] h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Try 'tax reform', or 'elections'..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="pl-9"
        />
      </div>
      <Button onClick={() => onSearch(value)} className="px-6">
        Recherchez
      </Button>
    </div>
  );
}
