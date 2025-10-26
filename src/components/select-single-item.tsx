import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Props = {
  listItems: { label: string; value: string }[];
  classNames?: Partial<{
    button: string;
  }>;
  selected: string;
  onChange: (val: string) => void;
};

export default function SelectSingleItem({
  onChange,
  selected,
  classNames,
  listItems
}: Props) {
  return (
    <Select value={selected} onValueChange={onChange}>
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
      <SelectContent align="end" className="select-content-width-full">
        {listItems.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
