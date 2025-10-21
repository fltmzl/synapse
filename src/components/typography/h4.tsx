import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type Props = {
  className?: string;
};

export function H4({ className, children }: PropsWithChildren<Props>) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-2xl font-medium tracking-[-0.02em] leading-[110%]",
        className
      )}
    >
      {children}
    </h4>
  );
}
