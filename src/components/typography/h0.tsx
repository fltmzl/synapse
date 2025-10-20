import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type Props = {
  className?: string;
};

export function H0({ className, children }: PropsWithChildren<Props>) {
  return (
    <p
      className={cn(
        "text-secondary scroll-m-20 text-center text-[32px] font-semibold tracking-tight text-balance leading-[120%]",
        className
      )}
    >
      {children}
    </p>
  );
}
