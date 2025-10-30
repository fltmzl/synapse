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
import FindData from "@/components/find-data";

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

      <FindData />

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
