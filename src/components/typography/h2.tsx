import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export function H2({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <h2
      className={cn(
        "scroll-m-20 text-base tracking-[-0.01em] leading-[150%] text-muted-foreground font-medium",
        className
      )}
    >
      {children}
    </h2>
  );
}
