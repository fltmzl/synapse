"use client";

import { useEffect, useRef, useState } from "react";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import SectionTitle from "@/components/typography/section-title";
import { H4 } from "@/components/typography/h4";
import { P } from "@/components/typography/paragraph";
import { infoOptions } from "@/data/find-data";
import { ArrowUpRightIcon } from "@/icons/arrow-up-right";
import { BuildingBankIcon } from "@/icons/building-bank-icon";
import { BuildingSkyScraperIcon } from "@/icons/building-skyscraper-icon";
import FindData from "@/components/find-data";
import { ChatBubble } from "../../database/sections/chat-bubble";
import ChatContainer from "../../database/sections/chat-container";
import ChatWrapper from "../../database/sections/chat-wrapper";

export default function FindDataPage() {
  return (
    <div className="bg-background">
      <section className=" max-w-7xl mx-auto py-16 lg:py-25 w-full px-6 flex flex-col gap-10 lg:gap-16">
        <ChatWrapper initialShowPopular={false} />

        <hr className="w-full max-w-[826px] mx-auto" />

        {/* Specific Info Section */}
        <div className="text-center flex flex-col gap-8 items-center">
          <H4>Le répertoire des territoires</H4>

          <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            {infoOptions.map((opt) => (
              <div
                key={opt.id}
                className={cn(
                  "group cursor-pointer transition-all rounded-xl border hover:border-primary"
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
