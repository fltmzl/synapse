"use client";

import { useCallback } from "react";
import { type Editor } from "@tiptap/react";
import { VideoIcon } from "lucide-react";
import { Button } from "@/components/tiptap-ui-primitive/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";

export const VideoUploadButton = ({
  editor: providedEditor
}: {
  editor?: Editor | null;
}) => {
  const { editor } = useTiptapEditor(providedEditor);
  const handleVideo = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().setVideoUploadNode().run();
  }, [editor]);

  if (!editor) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button type="button" data-style="ghost" onClick={handleVideo}>
          <VideoIcon className="h-4 w-4 me-1" />
          Video
        </Button>
      </TooltipTrigger>
      <TooltipContent>Upload video</TooltipContent>
    </Tooltip>
  );
};
