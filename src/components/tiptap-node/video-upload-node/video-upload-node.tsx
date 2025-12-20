"use client";

import { useRef, useState } from "react";
import type { NodeViewProps } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";
import { Button } from "@/components/tiptap-ui-primitive/button";
import { CloseIcon } from "@/components/tiptap-icons/close-icon";
import { VideoIcon, CloudUpload } from "lucide-react";
import "@/components/tiptap-node/image-upload-node/image-upload-node.scss"; // Reuse styles
import { focusNextNode, isValidPosition } from "@/lib/tiptap-utils";

// Reuse FileItem and useFileUpload logic from image-upload-node if possible,
// but for now I'll just adapt it here for simplicity.

export const VideoUploadNode: React.FC<NodeViewProps> = (props) => {
  const { accept, limit, maxSize } = props.node.attrs;
  const inputRef = useRef<HTMLInputElement>(null);
  const extension = props.extension;
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async (files: File[]) => {
    if (files.length === 0) return;
    const file = files[0];

    if (file.size > maxSize) {
      extension.options.onError?.(
        new Error(`File too large. Max ${maxSize / 1024 / 1024}MB`)
      );
      return;
    }

    setIsUploading(true);
    try {
      const url = await extension.options.upload(
        file,
        (ev: { progress: number }) => {
          setProgress(ev.progress);
        }
      );

      if (url) {
        const pos = props.getPos();
        if (isValidPosition(pos)) {
          props.editor
            .chain()
            .focus()
            .deleteRange({ from: pos, to: pos + props.node.nodeSize })
            .setVideo({ src: url, alt: file.name })
            .run();
          focusNextNode(props.editor);
        }
      }
    } catch (err) {
      extension.options.onError?.(
        err instanceof Error ? err : new Error("Upload failed")
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) handleUpload(Array.from(files));
  };

  return (
    <NodeViewWrapper
      className="tiptap-image-upload"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
    >
      <div className="tiptap-image-upload-drag-area">
        <div className="tiptap-image-upload-dropzone">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <VideoIcon className="h-6 w-6" />
          </div>
        </div>
        <div className="tiptap-image-upload-content">
          <span className="tiptap-image-upload-text">
            {isUploading ? (
              `Uploading... ${progress.toFixed(2)}%`
            ) : (
              <em>Click to upload video</em>
            )}
          </span>
          <span className="tiptap-image-upload-subtext">
            Max {maxSize / 1024 / 1024}MB.
          </span>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />
    </NodeViewWrapper>
  );
};
