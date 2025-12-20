"use client";

import { useCallback } from "react";
import { type Editor } from "@tiptap/react";
import { FileIcon } from "lucide-react";
import { Button } from "@/components/tiptap-ui-primitive/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";

export const FileUploadButton = ({
  editor: providedEditor
}: {
  editor?: Editor | null;
}) => {
  const { editor } = useTiptapEditor(providedEditor);
  const handleFile = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().setFileUploadNode().run();
  }, [editor]);

  if (!editor) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button type="button" data-style="ghost" onClick={handleFile}>
          <FileIcon className="h-4 w-4 me-1" />
          File
        </Button>
      </TooltipTrigger>
      <TooltipContent>Upload file</TooltipContent>
    </Tooltip>
  );
};
