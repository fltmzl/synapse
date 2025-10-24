"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

interface Props {
  selected: string;
  onChange: (val: string) => void;
}

export const SortLegal = ({ selected, onChange }: Props) => {
  return (
    <div>
      <Select value={selected} onValueChange={onChange}>
        <SelectTrigger className="p-4 flex gap-4 min-w-48 min-h-14">
          <SelectValue placeholder="Filter par" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Newest">Newest</SelectItem>
          <SelectItem value="Oldest">Oldest</SelectItem>
          <SelectItem value="MostRelevant">Most Read</SelectItem>
          <SelectItem value="MostPopular">Most Popular</SelectItem>
          <SelectItem value="EditorsPick">Editor&apos;s Pick</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
