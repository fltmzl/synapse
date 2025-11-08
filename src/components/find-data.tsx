"use client";

import { sources } from "@/data/find-data";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CircleCheckIcon } from "@/icons/circle-check-icon";
import { CircleOutlineIcon } from "@/icons/circle-outline-icon";
import { ArrowUpIcon } from "@/icons/arrow-up-icon";
import { useRef, useState } from "react";

type Props = {
  handleSend: (userMessage: string) => void;
};

export default function FindData({ handleSend }: Props) {
  const [activeSource, setActiveSource] = useState("All");
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="w-full max-w-[909px] mx-auto">
      <div className="bg-section border rounded-[14px] px-2">
        {/* Source Filter */}
        <div className="flex gap-2 px-4 py-4 pb-0 overflow-x-auto hide-scrollbar lg:overflow-x-hidden">
          <h1 className="flex items-center justify-center text-muted-foreground">
            Source
          </h1>
          {sources.map(({ name, icon: Icon }) => (
            <Button
              key={name}
              variant="ghost"
              onClick={() => setActiveSource(name)}
              className={cn(
                "!px-3 !py-2 flex items-center justify-center gap-3 rounded-md transition-all h-10",
                activeSource === name
                  ? "bg-primary/5 border border-primary text-primary"
                  : "border text-foreground"
              )}
            >
              <div className="flex gap-1 items-center">
                <Icon
                  className={cn(
                    "transition-colors size-5",
                    activeSource === name
                      ? "text-primary/60"
                      : "text-muted-foreground/50"
                  )}
                />
                <span
                  className={cn(
                    "transition-colors text-base tracking-[-0.01em] leading-[150%] text-muted-foreground font-normal",
                    activeSource === name ? "text-primary" : "text-foreground"
                  )}
                >
                  {name}
                </span>
              </div>
              {activeSource === name ? (
                <CircleCheckIcon className="text-primary " />
              ) : (
                <CircleOutlineIcon className="text-border" />
              )}
            </Button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative mt-4 mb-1">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Entrez votre requête...."
            className="bg-background w-full min-h-[212px] max-h-[400px] resize-none rounded-xl shadow-sm p-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all scrollbar-custom"
          />
          <button
            onClick={() => {
              handleSend(value);
              setValue("");
            }}
            className="absolute bottom-6 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-sm bg-primary"
          >
            <ArrowUpIcon className="w-6 h-6 text-background" />
          </button>
        </div>
      </div>
    </div>
  );
}
