import { cn } from "@/lib/utils";
import { Copy, Download, Files } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { VertexAnswerResponse } from "@/types/vertex-ai.type";
import Image from "next/image";

type ChatBubbleProps = {
  sender: "user" | "ai";
  text: string;
  fileName?: string;
  fileUrl?: string;
  sourceName?: string;
  sourceUrl?: string;
  references?: VertexAnswerResponse["answer"]["references"];
};

export function ChatBubble({
  sender,
  text,
  fileName,
  fileUrl,
  references
}: ChatBubbleProps) {
  const [copied, setCopied] = useState(false);
  const [hoveredRef, setHoveredRef] = useState<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref: any;
    rect: DOMRect;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(text.replace(/<[^>]+>/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isAI = sender === "ai";

  useEffect(() => {
    if (!containerRef.current || !isAI) return;

    const container = containerRef.current;
    let timeoutId: NodeJS.Timeout | null = null;

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(".vertex-citation");
      if (target) {
        if (timeoutId) clearTimeout(timeoutId);
        const refId = target.getAttribute("data-ref");
        const refIndex = parseInt(refId || "0") - 1;
        const ref = references?.[refIndex];
        if (ref) {
          setHoveredRef({
            ref,
            rect: target.getBoundingClientRect()
          });
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      timeoutId = setTimeout(() => {
        setHoveredRef(null);
      }, 100);
    };

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(".vertex-citation");
      if (target) {
        const refId = target.getAttribute("data-ref");
        const refIndex = parseInt(refId || "0") - 1;
        const ref = references?.[refIndex];
        if (ref?.gcsUri) {
          window.open(
            `/api/storage/download?uri=${encodeURIComponent(ref.gcsUri)}`,
            "_blank"
          );
        }
      }
    };

    container.addEventListener("mouseover", handleMouseOver);
    container.addEventListener("mouseout", handleMouseOut);
    container.addEventListener("click", handleClick);

    return () => {
      container.removeEventListener("mouseover", handleMouseOver);
      container.removeEventListener("mouseout", handleMouseOut);
      container.removeEventListener("click", handleClick);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isAI, references]);

  const handlePopupClick = () => {
    if (hoveredRef?.ref?.gcsUri) {
      window.open(
        `/api/storage/download?uri=${encodeURIComponent(hoveredRef.ref.gcsUri)}`,
        "_blank"
      );
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col space-y-1 w-full relative",
        isAI ? "items-start" : "items-end"
      )}
    >
      <div
        ref={containerRef}
        className={cn(
          "rounded-md prose prose-neutral max-w-none w-full relative",
          "prose-headings:leading-[110%] prose-headings:tracking-[-0.03em] prose-headings:font-medium",
          "prose-h1:text-2xl prose-h1:lg:text-[40px] prose-h1:my-4",
          "prose-h2:text-xl prose-h2:lg:text-2xl prose-h2:my-3",
          "prose-h3:text-lg prose-h3:lg:text-xl prose-h3:my-2",
          "prose-p:my-2 prose-p:text-base prose-p:leading-[160%] prose-p:tracking-[-0.01em]",
          "prose-li:text-base prose-li:leading-[160%] prose-li:tracking-[-0.01em]",
          "prose-strong:font-semibold prose-strong:text-foreground",
          isAI
            ? "text-foreground"
            : "px-4 py-3 text-base leading-[150%] tracking-[-0.01em] bg-background border shadow-xs max-w-max ml-auto"
        )}
      >
        <div dangerouslySetInnerHTML={{ __html: text }} />

        {/* Hover Popup for Citation */}
        {hoveredRef && (
          <div
            className="fixed z-[9999] bg-background border shadow-2xl rounded-xl p-3 flex flex-col gap-2 w-[240px] cursor-pointer animate-in fade-in zoom-in duration-200"
            onMouseEnter={() => {
              // Stay open when mouse enters popup
              const refId = hoveredRef.ref.referenceId; // dummy but ok
              setHoveredRef((prev) => prev);
            }}
            onMouseLeave={() => setHoveredRef(null)}
            onClick={handlePopupClick}
            style={{
              top: hoveredRef.rect.top - 120,
              left: Math.max(
                20,
                Math.min(
                  window.innerWidth - 260,
                  hoveredRef.rect.left - 110 + hoveredRef.rect.width / 2
                )
              )
            }}
          >
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-muted border overflow-hidden flex items-center justify-center">
                {hoveredRef.ref.thumbnail ? (
                  <Image
                    width={48}
                    height={48}
                    src={
                      hoveredRef.ref.thumbnail.startsWith("data:")
                        ? hoveredRef.ref.thumbnail
                        : `data:image/png;base64,${hoveredRef.ref.thumbnail}`
                    }
                    className="w-full h-full object-cover"
                    alt=""
                  />
                ) : (
                  <Files size={20} className="text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold text-foreground truncate">
                  {hoveredRef.ref.chunkInfo?.documentMetadata?.title ||
                    hoveredRef.ref.structuredDocumentInfo?.document ||
                    "Document"}
                </p>
                <div className="flex items-center gap-1 mt-1 text-[11px] text-muted-foreground font-medium uppercase">
                  <Download size={10} />
                  Click to download
                </div>
              </div>
            </div>
            {hoveredRef.ref.snippet && (
              <p className="text-[11px] text-foreground/70 leading-relaxed italic line-clamp-2 mt-1 border-t pt-2">
                ...{" "}
                {hoveredRef.ref.snippet.replace(
                  /__START_OF_ANNOTATION__|__END_OF_ANNOTATION__/g,
                  ""
                )}{" "}
                ...
              </p>
            )}
          </div>
        )}

        {/* Source References Cards */}
        {isAI && references && references.length > 0 && (
          <div className="mt-8 pt-6 border-t not-prose space-y-8">
            <p className="text-base font-semibold text-foreground mb-4">
              Sources
            </p>
            <div className="flex flex-col gap-8">
              {references.map((ref, i) => {
                let title = `Source ${i + 1}`;
                let url = "#";
                let isImage = false;
                let fileTypeLabel = "Document";

                const docInfo = ref.structuredDocumentInfo;
                const chunkInfo = ref.chunkInfo;

                if (docInfo) {
                  const data = docInfo.structData;
                  title =
                    data.company_name ||
                    data.person_name ||
                    data.title ||
                    title;
                  url =
                    data.social_linkedin ||
                    data.company_website ||
                    data.url ||
                    url;
                } else if (chunkInfo) {
                  const meta = chunkInfo.documentMetadata;
                  title = meta.title || title;
                  url = meta.uri || url;
                }

                // Check extension for icons
                if (
                  url.toLowerCase().endsWith(".pdf") ||
                  title.toLowerCase().includes("pdf")
                ) {
                  fileTypeLabel = "PDF document";
                } else if (
                  url.toLowerCase().match(/\.(png|jpg|jpeg|gif|webp)$/) ||
                  title.toLowerCase().includes("image")
                ) {
                  isImage = true;
                  fileTypeLabel = "PNG image"; // Generic PNG label as seen in user screenshot
                }

                // Override URL and add thumbnail from enrichment
                const thumbnail = ref.thumbnail;
                const snippet = ref.snippet?.replace(
                  /__START_OF_ANNOTATION__|__END_OF_ANNOTATION__/g,
                  ""
                );

                if (ref.gcsUri) {
                  url = `/api/storage/download?uri=${encodeURIComponent(ref.gcsUri)}`;
                }

                return (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-start gap-4 no-underline hover:bg-muted/30 p-2 -m-2 rounded-lg transition"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-foreground leading-tight truncate mb-1">
                        {title}
                      </h4>

                      <div className="flex items-center gap-1.5 mb-2">
                        <div
                          className={cn(
                            "flex items-center justify-center rounded-[3px] p-0.5",
                            isImage ? "bg-red-500" : "bg-red-600"
                          )}
                        >
                          {isImage ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect
                                width="18"
                                height="18"
                                x="3"
                                y="3"
                                rx="2"
                                ry="2"
                              ></rect>
                              <circle cx="9" cy="9" r="2"></circle>
                              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                            </svg>
                          ) : (
                            <span className="text-[8px] font-bold text-white px-0.5 leading-none">
                              PDF
                            </span>
                          )}
                        </div>
                        <span className="text-[12px] text-muted-foreground font-medium">
                          {fileTypeLabel}
                        </span>
                      </div>

                      {snippet && (
                        <p className="text-[13px] text-foreground/80 leading-relaxed line-clamp-2 italic">
                          ... {snippet} ...
                        </p>
                      )}
                    </div>

                    {thumbnail && (
                      <div className="shrink-0 w-24 h-16 rounded-xl bg-muted overflow-hidden border shadow-sm self-center">
                        <Image
                          src={
                            thumbnail.startsWith("data:")
                              ? thumbnail
                              : `data:image/png;base64,${thumbnail}`
                          }
                          alt={title}
                          width={96}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        )}

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
      </div>

      {/* {isAI && (
        <div className="flex items-center gap-4 mt-3">
          <button
            onClick={handleCopy}
            className="flex items-center text-xs text-muted-foreground hover:text-foreground transition"
          >
            <Copy size={20} />
          </button>
        </div>
      )} */}
    </div>
  );
}
