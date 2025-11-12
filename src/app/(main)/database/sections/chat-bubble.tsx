import { cn } from "@/lib/utils";
import { Copy, Files, Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type ChatBubbleProps = {
  sender: "user" | "ai";
  text: string;
  fileName?: string;
  fileUrl?: string;
  sourceName?: string;
  sourceUrl?: string;
};

export function ChatBubble({
  sender,
  text,
  fileName,
  fileUrl,
  sourceName,
  sourceUrl
}: ChatBubbleProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text.replace(/<[^>]+>/g, ""));
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
          "prose-h2:text-2xl",
          "prose-h3:text-xl",
          "prose-h4:text-lg",
          "prose-h5:text-base",
          "prose-h6:text-sm",
          "prose-p:my-2 prose-p:text-base prose-p:leading-[140%] prose-p:tracking-[-0.01em]",
          "prose-li:text-base prose-li:leading-[140%] prose-li:tracking-[-0.01em]",
          isAI
            ? "text-foreground"
            : "px-4 py-3 text-base leading-[150%] tracking-[-0.01em] bg-background border shadow-xs"
        )}
      >
        <div dangerouslySetInnerHTML={{ __html: text }} />
        {fileName && fileUrl && (
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full lg:w-max flex items-center gap-3 mt-3 border rounded-[8px] py-3 pl-3 pr-5 hover:bg-muted/50 transition shadow-xs no-underline"
          >
            <Files
              size={24}
              strokeWidth={1}
              className="text-muted-foreground"
            />
            <div className="flex flex-col text-sm ">
              <span className="font-medium no-underline text-base leading-[130%] tracking-[-0.02em] text-foreground/85">
                {fileName}
              </span>
              <span className="text-muted-foreground text-sm leading-[140%] tracking-[-0.01em] no-underline ">
                0.2 MB
              </span>
            </div>
          </a>
        )}

        {/* Source link */}
        {sourceName && sourceUrl && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 mt-3 border rounded-sm py-[6px] pl-2 pr-3 hover:bg-muted/50 transition text-sm w-full lg:w-max h-max no-underline"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <Image
                src="/images/prod-2.png"
                alt="Source"
                className="object-cover w-5 h-5 rounded-full"
              />
            </div>
            <span className="hover:underline text-base leading-[150%] tracking-[-0.01em] text-foreground/70">
              {sourceName}
            </span>
          </a>
        )}
      </div>

      {isAI && (
        <div className="flex items-center gap-4 mt-3">
          <button
            onClick={handleCopy}
            className="flex items-center text-xs text-muted-foreground hover:text-foreground transition"
          >
            <Copy size={20} />
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
