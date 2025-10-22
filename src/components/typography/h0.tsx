import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type Props = {
  className?: string;
};

export function H0({ className, children }: PropsWithChildren<Props>) {
  return (
    <p
      className={cn(
        "text-foreground scroll-m-20 text-left lg:text-center text-[32px] font-medium tracking-tight leading-[120%]",
        className
      )}
    >
      {children}
    </p>
  );
}
