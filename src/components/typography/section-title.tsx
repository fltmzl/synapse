import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

export default function SectionTitle({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <h1
      className={cn(
        "text-[26px] lg:text-[48px] font-semibold leading-[120%] tracking-tight text-primary",
        className
      )}
    >
      {children}
    </h1>
  );
}
