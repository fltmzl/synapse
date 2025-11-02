import { cn } from "@/lib/utils";
import { Copy, Upload } from "lucide-react";
import { useState } from "react";

type ChatBubbleProps = {
  sender: "user" | "ai";
  content: string;
};

export function ChatBubble({ sender, content }: ChatBubbleProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content.replace(/<[^>]+>/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUpload = () => {
    console.log("Upload clicked!");
  };

  const isAI = sender === "ai";

  return (
    <div
      className={cn(
        "flex  flex-col space-y-1",
        isAI ? "items-start" : "items-end"
      )}
    >
      <div
        className={cn(
          " rounded-md prose prose-sm dark:prose-invert prose-neutral max-w-none",
          "prose-headings:leading-[110%] prose-headings:tracking-[-0.03em] prose-headings:font-medium",
          "prose-h1:text-2xl prose-h1:lg:text-[40px]",
          "prose-h2:text-2xl prose-headings:mt-4",
          "prose-h3:text-xl",
          "prose-h4:text-lg",
          "prose-h5:text-base",
          "prose-h6:text-sm",
          "prose-p:my-2 prose-p:lg:text-[18px] prose-p:leading-[140%] prose-p:tracking-[-0.01em]",
          isAI
            ? "px-4 pt-3 text-foreground"
            : "px-4 py-3 text-base leading-[150%] tracking-[-0.01em] bg-background border shadow-xs"
        )}
      >
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      {isAI && (
        <div className="flex items-center gap-4 ml-6 ">
          <button
            onClick={handleCopy}
            className="flex items-center text-xs text-muted-foreground hover:text-foreground transition"
          >
            <Copy size={20}  />
            {/* {copied ? "Copied!" : ""} */}
          </button>

          <button
            onClick={handleUpload}
            className="flex items-center text-xs text-muted-foreground hover:text-foreground transition"
          >
            <Upload size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
