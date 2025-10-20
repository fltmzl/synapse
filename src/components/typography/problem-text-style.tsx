import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

export default function ProblemTextStyle({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <p
      className={cn(
        "text-2xl lg:text-[40px] font-semibold leading-[120%] tracking-tight text-primary",
        className
      )}
    >
      {children}
    </p>
  );
}
