import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

export default function SectionTitle({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <h2
      className={cn(
        "text-3xl lg:text-[40px] font-medium leading-[110%] tracking-[-0.03em]",
        className
      )}
    >
      {children}
    </h2>
  );
}
