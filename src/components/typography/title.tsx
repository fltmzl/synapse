import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export function Title({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-3xl lg:text-[3.25rem] font-medium tracking-[-0.03em] leading-[110%]",
        className
      )}
    >
      {children}
    </h1>
  );
}
