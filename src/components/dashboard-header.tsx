"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface DashboardHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export function DashboardHeader({
  title,
  description,
  actions,
  className
}: DashboardHeaderProps) {
  return (
    <header
      className={cn(
        "bg-background sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between gap-4 border-b px-4",
        className
      )}
    >
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
}
