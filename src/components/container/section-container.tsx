import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  className?: string;
};

export default function SectionContainer({
  children,
  className
}: React.PropsWithChildren<Props>) {
  return (
    <div
      className={cn("bg-background border rounded-md border-border", className)}
    >
      {children}
    </div>
  );
}
