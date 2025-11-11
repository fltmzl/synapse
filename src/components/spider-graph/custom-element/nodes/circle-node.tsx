import { cn } from "@/lib/utils";
import * as React from "react";

type Props = {
  color?: string;
  selected?: boolean;
};

export default function CircleNode({
  color = "bg-secondary",
  selected = false
}: Props) {
  return (
    <div className="relative">
      <div
        className={cn(
          "w-4 h-4 rounded-full border-[1.2px] border-white shadow-sm shadow-black/35",
          color
        )}
      ></div>

      {selected && (
        <div
          className={cn(
            "opacity-20 rounded-full w-4 h-4 scale-170 absolute top-0",
            color
          )}
        ></div>
      )}
    </div>
  );
}
