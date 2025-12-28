"use client";

import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { FileIcon, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./file-node.scss";

export const FileNodeView = (props: NodeViewProps) => {
  const { src, name, size } = props.node.attrs;

  const handleDelete = () => {
    props.deleteNode();
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <NodeViewWrapper className="tiptap-file-node-wrapper group relative block my-4">
      <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/30 transition-all group-hover:ring-2 group-hover:ring-primary">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <FileIcon className="h-6 w-6" />
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          <span className="text-sm font-medium truncate">
            {name || "Unnamed file"}
          </span>
          {size && (
            <span className="text-xs text-muted-foreground">
              {formatFileSize(size)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              download={name}
            >
              <Download className="h-4 w-4" />
            </a>
          </Button>
          <Button
            variant="destructive"
            size="icon"
            className="h-8 w-8"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </NodeViewWrapper>
  );
};
