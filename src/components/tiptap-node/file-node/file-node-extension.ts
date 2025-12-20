import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { FileNodeView } from "./file-node";

export interface FileOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    file: {
      setFile: (options: {
        src: string;
        name: string;
        size?: number;
      }) => ReturnType;
    };
  }
}

export const FileExtension = Node.create<FileOptions>({
  name: "file",

  group: "block",

  draggable: true,

  selectable: true,

  atom: true,

  addAttributes() {
    return {
      src: {
        default: null
      },
      name: {
        default: null
      },
      size: {
        default: null
      }
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="file"]'
      }
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(
        { "data-type": "file" },
        this.options.HTMLAttributes,
        HTMLAttributes
      )
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(FileNodeView);
  },

  addCommands() {
    return {
      setFile:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options
          });
        }
    };
  }
});
