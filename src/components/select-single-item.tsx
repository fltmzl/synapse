import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { JSX } from "react";

type Props = {
  listItems: { label: string; value: string }[];
  classNames?: Partial<{
    button: string;
  }>;
  selected: string;
  onChange: (val: string) => void;
  customSelectTrigger?: () => JSX.Element;
  align?: "center" | "end" | "start";
};

export default function SelectSingleItem({
  onChange,
  selected,
  classNames,
  listItems,
  align = "end",
  customSelectTrigger
}: Props) {
  return (
    <Select value={selected} onValueChange={onChange}>
      {customSelectTrigger ? (
        customSelectTrigger()
      ) : (
        <Button
          variant="outline"
          size="2md"
          className={cn(
            "leading-[140%] tracking-tighter w-[172px] flex justify-between",
            classNames?.button
          )}
          asChild
        >
          <SelectTrigger>
            <SelectValue
              placeholder="Filter par"
              className="font-medium leading-[140%] tracking-tighter text-base"
            />
          </SelectTrigger>
        </Button>
      )}
      <SelectContent
        align={align}
        className="select-content-width-full min-w-40"
      >
        {listItems.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
