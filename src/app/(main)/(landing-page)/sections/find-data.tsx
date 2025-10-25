"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, MoveUpRight, User, Landmark, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import SectionTitle from "@/components/typography/section-title";
import { H4 } from "@/components/typography/h4";
import { P } from "@/components/typography/paragraph";
import { infoOptions, sources } from "@/data/find-data";
import { CircleCheckIcon } from "@/icons/circle-check-icon";
import { CircleOutlineIcon } from "@/icons/circle-outline-icon";
import { ArrowUpIcon } from "@/icons/arrow-up-icon";
import { ArrowUpRightIcon } from "@/icons/arrow-up-right";
import { BuildingBankIcon } from "@/icons/building-bank-icon";
import { BuildingSkyScraperIcon } from "@/icons/building-skyscraper-icon";

export default function FindDataPage() {
  const [activeSource, setActiveSource] = useState("All");
  const [activeInfo, setActiveInfo] = useState("person");
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // auto-resize textarea saat user mengetik
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 300) + "px"; // max ~300px
  }, [value]);

  return (
    <div className="bg-background">
      <section className="max-w-7xl mx-auto py-16 lg:py-25 w-full px-6 flex flex-col gap-10 lg:gap-16">
        {/* Header */}
        <div className="text-center flex flex-col gap-2">
          <SectionTitle>Accéder à la base</SectionTitle>
          <P className="lg:text-[18px] lg:leading-[140%] lg:tracking-[-0.01em]">
            Utiliser l&apos;IA pour recherche une information, une donnée, un
            rapport ou une source de confiance
          </P>
        </div>

        <div className="w-full max-w-[58rem] mx-auto ">
          <div className="bg-section border rounded-[14px] px-2">
            {/* Source Filter */}
            <div className="flex gap-2 px-4 py-4 pb-0 overflow-x-auto hide-scrollbar lg:overflow-x-hidden ">
              <h1 className="flex items-center justify-center text-muted-foreground">
                Source
              </h1>
              {sources.map(({ name, icon: Icon }) => (
                <Button
                  key={name}
                  size="sm"
                  variant={activeSource === name ? "default" : "outline"}
                  onClick={() => setActiveSource(name)}
                  className={cn(
                    "flex items-center justify-center gap-3 rounded-md transition-all h-10 bg-transparent",
                    activeSource === name
                      ? "bg-primary/5 hover:bg-primary/5 border border-primary text-primary"
                      : " border text-foreground"
                  )}
                >
                  <div className="flex gap-1 items-center">
                    <Icon
                      className={cn(
                        "transition-colors size-5",
                        activeSource === name
                          ? "text-primary"
                          : "text-muted-foreground/50"
                      )}
                    />

                    <span
                      className={cn(
                        "transition-colors text-base tracking-[-0.01em] leading-[150%] text-muted-foreground font-normal",
                        activeSource === name
                          ? "text-primary"
                          : "text-foreground"
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
              <button className="absolute bottom-6 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-sm bg-primary">
                <ArrowUpIcon className="w-6 h-6 text-background" />
              </button>
            </div>
          </div>
        </div>

        <hr className="w-full max-w-[826px] mx-auto" />
        {/* Specific Info Section */}
        <div className=" text-center flex flex-col gap-8 items-center">
          <H4>Le répertoire des territoires</H4>

          <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            {infoOptions.map((opt) => (
              <div
                key={opt.id}
                className={cn(
                  "group cursor-pointer transition-all rounded-xl border  hover:border-primary"
                )}
              >
                <div className="p-5 flex flex-col justify-between h-full gap-6">
                  {/* Icon + Arrow */}
                  <div className="flex items-start justify-between">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-sm flex items-center justify-center border transition-all duration-200",
                        "bg-muted/50 text-foreground/80 group-hover:bg-primary group-hover:text-background group-hover:border-primary"
                      )}
                    >
                      {opt.id === "person" && <User className="w-4 h-4" />}
                      {opt.id === "company" && (
                        <BuildingBankIcon className="w-4 h-4" />
                      )}
                      {opt.id === "directory" && (
                        <BuildingSkyScraperIcon className="w-4 h-4" />
                      )}
                    </div>

                    <div
                      className={cn(
                        "w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-200",
                        "text-foreground/80 group-hover:text-primary group-hover:border-primary group-hover:bg-primary/10"
                      )}
                    >
                      <ArrowUpRightIcon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="text-left flex flex-col gap-2">
                    <h4 className="text-[18px] font-medium text-foreground leading-6 tracking-[-0.02em]">
                      {opt.title}
                    </h4>
                    <p className="text-base font-regular tracking-[-0.01em] leading-5 text-muted-foreground">
                      {opt.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
