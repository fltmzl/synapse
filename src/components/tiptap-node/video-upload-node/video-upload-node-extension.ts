import { mergeAttributes, Node } from "@tiptap/react";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { VideoUploadNode as VideoUploadNodeComponent } from "./video-upload-node";
import type { NodeType } from "@tiptap/pm/model";

export type UploadFunction = (
  file: File,
  onProgress?: (event: { progress: number }) => void,
  abortSignal?: AbortSignal
) => Promise<string>;

export interface VideoUploadNodeOptions {
  type?: string | NodeType | undefined;
  accept?: string;
  limit?: number;
  maxSize?: number;
  upload?: UploadFunction;
  onError?: (error: Error) => void;
  onSuccess?: (url: string) => void;
  HTMLAttributes: Record<string, unknown>;
}

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    videoUpload: {
      setVideoUploadNode: (options?: VideoUploadNodeOptions) => ReturnType;
    };
  }
}

export const VideoUploadNode = Node.create<VideoUploadNodeOptions>({
  name: "videoUpload",

  group: "block",

  draggable: true,

  selectable: true,

  atom: true,

  addOptions() {
    return {
      type: "video",
      accept: "video/*",
      limit: 1,
      maxSize: 50 * 1024 * 1024, // 50MB
      upload: undefined,
      onError: undefined,
      onSuccess: undefined,
      HTMLAttributes: {}
    };
  },

  addAttributes() {
    return {
      accept: {
        default: this.options.accept
      },
      limit: {
        default: this.options.limit
      },
      maxSize: {
        default: this.options.maxSize
      }
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="video-upload"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes({ "data-type": "video-upload" }, HTMLAttributes)
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(VideoUploadNodeComponent);
  },

  addCommands() {
    return {
      setVideoUploadNode:
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

export default VideoUploadNode;
