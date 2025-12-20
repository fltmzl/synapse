"use client";

import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./video-node.scss";

export const VideoNodeView = (props: NodeViewProps) => {
  const { src, alt, title } = props.node.attrs;

  const handleDelete = () => {
    props.deleteNode();
  };

  return (
    <NodeViewWrapper className="tiptap-video-node-wrapper group relative inline-block w-full max-w-2xl">
      <video
        src={src}
        controls
        className="tiptap-video w-full rounded-lg shadow-sm transition-all group-hover:ring-2 group-hover:ring-primary"
      >
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <Button
          variant="destructive"
          size="icon"
          className="h-8 w-8 rounded-full shadow-lg"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </NodeViewWrapper>
  );
};
