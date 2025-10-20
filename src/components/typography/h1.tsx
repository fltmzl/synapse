import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export function H1({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-center text-xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h1>
  );
}
