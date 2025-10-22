import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type Props = {
  className?: string;
};

export function P({ className, children }: PropsWithChildren<Props>) {
  return (
    <p
      className={cn(
        "scroll-m-20 text-sm font-regular tracking-[-0.01em] leading-[140%] text-muted-foreground",
        className
      )}
    >
      {children}
    </p>
  );
}
