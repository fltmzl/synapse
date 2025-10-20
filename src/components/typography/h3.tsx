import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type Props = {
  className?: string;
};

export function H3({ className, children }: PropsWithChildren<Props>) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-xs font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
}
