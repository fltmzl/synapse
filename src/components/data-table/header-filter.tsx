import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Column } from "@tanstack/react-table";
import React from "react";
import DebouncedInput from "./debounce-input";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: Column<any, unknown>;
};

export default function HeaderFilter({ column }: Props) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  const sortedUniqueValues = React.useMemo(() => {
    if (!column || typeof column.getFacetedUniqueValues !== "function")
      return [];

    return filterVariant === "range"
      ? []
      : Array.from(column.getFacetedUniqueValues()?.keys() || [])
          .sort()
          .slice(0, 5000);
  }, [column, filterVariant]);

  if (filterVariant === "range")
    return (
      <div className="flex gap-2">
        <DebouncedInput
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          className="h-8 w-20"
          type="number"
          placeholder="Min"
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
        />

        <DebouncedInput
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          className="h-8 w-20"
          type="number"
          placeholder="Max"
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
        />
      </div>
    );

  if (filterVariant === "select")
    return (
      <Select
        onValueChange={(value) =>
          value === "all"
            ? column.setFilterValue("")
            : column.setFilterValue(value)
        }
        defaultValue={columnFilterValue?.toString() || "all"}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All</SelectItem>
            {sortedUniqueValues.map((value) => (
              <SelectItem value={value} key={value}>
                {value}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );

  if (filterVariant === "text")
    return (
      <DebouncedInput
        onChange={(value) => column.setFilterValue(value)}
        className="h-8"
        type="text"
        value={(columnFilterValue ?? "") as string}
      />
    );

  return null;
}
