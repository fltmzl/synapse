"use client";

import { Download, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  src: string;
  name: string;
  size?: string | number;
}

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export function FileAttachmentCard({ src, name, size }: Props) {
  const numericSize =
    typeof size === "string"
      ? parseInt(size, 10)
      : typeof size === "number"
        ? size
        : 0;

  return (
    <div className="not-prose my-6 rounded-xl border bg-card p-4 transition-all hover:bg-accent/50 dark:border-white/10">
      <div className="flex items-center gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <FileText className="size-6" />
        </div>
        <div className="flex flex-1 flex-col overflow-hidden">
          <span className="truncate text-sm font-medium leading-tight text-foreground">
            {name}
          </span>
          {numericSize > 0 ? (
            <span className="text-xs text-muted-foreground mt-1">
              {formatBytes(numericSize)}
            </span>
          ) : (
            <span className="text-xs text-muted-foreground mt-1">
              File Attachment
            </span>
          )}
        </div>
        <a
          href={src}
          download={name}
          target="_blank"
          rel="noopener noreferrer"
          className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
          title={`Download ${name}`}
        >
          <Download className="size-5" />
        </a>
      </div>
    </div>
  );
}
