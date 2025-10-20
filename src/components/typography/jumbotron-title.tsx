import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

export default function JumbotronTitle({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <h1
      className={cn(
        "text-[32px] lg:text-[64px] font-semibold leading-[110%] tracking-tight text-white",
        className
      )}
    >
      {children}
    </h1>
  );
}
