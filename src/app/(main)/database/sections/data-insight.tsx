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
import Link from "next/link";

const questions = [
  "Education level in Guadeloupe",
  "Healthcare access in Mayotte",
  "Key industries in French Guiana",
  "Population in workforce (all territories)",
  "Tourism contribution to GDP"
];

export default function DataInsight() {
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
    <div>
      <section className="max-w-7xl mx-auto py-12 lg:py-20 w-full px-6 flex flex-col gap-10 lg:gap-16">
        {/* Header */}
        <div className="text-center flex flex-col gap-4">
          <h1 className="text-5xl font-medium leading-[110%] tracking-[-0.03em]">
            Base de données
          </h1>
          <P className="lg:text-[18px] lg:leading-[140%] lg:tracking-[-0.01em]">
            Rechercher une information ou un contenu relatif aux Outre-Mer
          </P>
        </div>

        <div className="w-full max-w-[58rem] mx-auto ">
          <div className="bg-section border rounded-[14px] px-[5px]">
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
            <div className="relative mt-4 ">
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

        {/* Specific Info Section */}
        <div className=" text-center flex flex-col gap-4 items-center">
          <h2 className="text-lg font-medium leading-[140%] tracking-[-0.02em]">
            Les questions les plus populaires
          </h2>

          <div className="flex flex-wrap justify-center gap-2 lg:gap-3 max-w-4xl">
            {questions.map((q, i) => (
              <Button
                key={i}
                variant="outline"
                className="rounded-md bg-transparent border text-base font-regular leading-[150%] tracking-tighter text-foreground/70 hover:bg-muted transition py-2 px-4 lg:p-2"
              >
                <Link href="#">{q}</Link>
              </Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
