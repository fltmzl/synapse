import { cn } from "@/lib/utils";
import * as React from "react";

type Props = {
  color?: string;
};

export default function HexagonNode({ color = "bg-red-500" }: Props) {
  return (
    <div className="relative flex items-center justify-center shadow-lg">
      {/* bayangan */}
      <div className="absolute top-1 w-4 h-4 bg-black/20 rounded-full blur-sm scale-90" />

      <div
        className="absolute w-5 h-5 bg-white"
        style={{
          clipPath:
            "polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)"
        }}
      />

      {/* bentuk hexagon */}
      <div
        className={cn("w-4 h-4", color)}
        style={{
          clipPath:
            "polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)"
        }}
      ></div>
    </div>
  );

  return (
    <div className="relative flex items-center justify-center rotate-90">
      {/* bayangan */}
      <div className="absolute top-1 w-4 h-4 bg-black/20 rounded-full blur-sm scale-90" />

      <div
        className="absolute w-4.5 h-4.5 bg-white"
        style={{
          clipPath:
            "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)"
        }}
      />

      {/* bentuk hexagon */}
      <div
        className={cn("w-4 h-4 shadow-md", color)}
        style={{
          clipPath:
            "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)"
        }}
      ></div>
    </div>
  );
}
