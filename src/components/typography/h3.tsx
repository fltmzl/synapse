import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export function H3({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-sm tracking-[-0.01em] leading-[140%] text-muted-foreground font-regular",
        className
      )}
    >
      {children}
    </h3>
  );
}
