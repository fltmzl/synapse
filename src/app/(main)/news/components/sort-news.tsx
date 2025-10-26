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

export default function SortNews({ selected, onChange }: Props) {
  return (
    <div>
      <Select value={selected} onValueChange={onChange}>
        <SelectTrigger className="text-base font-medium p-4 flex gap-4 min-w-48 min-h-14">
          <SelectValue placeholder="Filter par" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Newest">Date de parution</SelectItem>
          <SelectItem value="Oldest">Oldest</SelectItem>
          <SelectItem value="MostPopular">Le plus vu</SelectItem>
          <SelectItem value="EditorsPick">Most Popular</SelectItem>
          <SelectItem value="EditorsPick">Editor&apos;s Pick</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
