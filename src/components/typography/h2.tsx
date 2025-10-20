import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export function H2({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <h2 className={cn("scroll-m-20 text-sm font-semibold", className)}>
      {children}
    </h2>
  );
}
