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

export default function SortLegal({ selected, onChange }: Props) {
  return (
    <div>
      <Select value={selected} onValueChange={onChange}>
        <SelectTrigger className="px-4 py-3 flex gap-4 min-w-48 min-h-14 text-base font-medium">
          <SelectValue placeholder="Filter par" />
        </SelectTrigger>
        <SelectContent className="h-full data-[side=bottom]:translate-y-1 data-[side=bottom]:-translate-x-4 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1">
          <SelectItem value="Newest">Newest</SelectItem>
          <SelectItem value="Oldest">Oldest</SelectItem>
          <SelectItem value="MostRelevant">Most Read</SelectItem>
          <SelectItem value="MostPopular">Most Popular</SelectItem>
          <SelectItem value="EditorsPick">Editor&apos;s Pick</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
