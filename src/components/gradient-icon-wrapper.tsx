import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

type Props = {
  size?: "default" | "lg";
};

export default function GradientIconWrapper({
  children,
  size = "default"
}: PropsWithChildren<Props>) {
  return (
    <div
      className={cn(
        "min-w-8 h-8 size-8 bg-gradient-to-b from-zinc-200 to-zinc-100 border border-zinc-300 rounded-full grid place-content-center",
        {
          "size-10": size === "lg"
        }
      )}
    >
      {children}
    </div>
  );
}
