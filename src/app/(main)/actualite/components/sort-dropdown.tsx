"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

type Props = {
  selected: string;
  onChange: (val: string) => void;
};

export const SortDropdown = ({ selected, onChange }: Props) => {
  return (
    <div>
      <Select value={selected} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Filter par" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Newest">Newest</SelectItem>
          <SelectItem value="Oldest">Oldest</SelectItem>
          <SelectItem value="MostPopular">Most Popular</SelectItem>
          <SelectItem value="EditorsPick">Editor&apos;s Pick</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
