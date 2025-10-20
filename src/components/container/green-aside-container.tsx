import { cn } from "@/lib/utils";
import React from "react";

export default function GreenAsideContainer({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "md:min-w-[520px] relative overflow-hidden bg-primary px-6 rounded-[10px]",
        className
      )}
    >
      {children}
    </aside>
  );
}
