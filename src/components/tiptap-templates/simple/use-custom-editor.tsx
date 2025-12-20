"use client";

import { useEditor } from "@tiptap/react";

// --- Tiptap Core Extensions ---
import { Highlight } from "@tiptap/extension-highlight";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Placeholder, Selection } from "@tiptap/extensions";
import { StarterKit } from "@tiptap/starter-kit";
import { toast } from "sonner";

// --- Tiptap Node ---
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";
import { VideoExtension } from "@/components/tiptap-node/video-node/video-node-extension";
import { VideoUploadNode } from "@/components/tiptap-node/video-upload-node/video-upload-node-extension";
import { FileExtension } from "@/components/tiptap-node/file-node/file-node-extension";
import { FileUploadNode } from "@/components/tiptap-node/file-upload-node/file-upload-node-extension";

// --- Lib ---
import {
  handleImageUpload,
  handleVideoUpload,
  handleFileUpload,
  MAX_FILE_SIZE
} from "@/lib/tiptap-utils";

type Props = {
  content: string;
};

export default function useCustomEditor({ content }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
        class: "simple-editor"
      }
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true
        }
      }),
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      Placeholder.configure({
        // Use a placeholder:
        placeholder: "Write something …"
        // Use different placeholders depending on the node type:
        // placeholder: ({ node }) => {
        //   if (node.type.name === 'heading') {
        //     return 'What’s the title?'
        //   }

        //   return 'Can you add some further context?'
        // },
      }),
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => toast.error(error.message)
      }),
      VideoExtension,
      VideoUploadNode.configure({
        upload: handleVideoUpload,
        onError: (error) => toast.error(error.message)
      }),
      FileExtension,
      FileUploadNode.configure({
        upload: handleFileUpload,
        onError: (error) => toast.error(error.message)
      })
    ],
    content
  });

  return editor;
}
