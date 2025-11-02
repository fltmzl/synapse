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
import { ChatBubble } from "./chat-bubble";

type Message = {
  sender: "user" | "ai";
  text: string;
};
export default function DataInsight() {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showPopular, setShowPopular] = useState<boolean>(true);
  const handleSend = (userMessage: string): void => {
    if (showPopular) setShowPopular(false);
const aiResponse = `
  <p>In <strong>Guadeloupe</strong>, the unemployment rate for <strong>2023</strong> was <strong>12%</strong>.</p>
  <p>
    This marks a small but significant improvement compared to 2022 (12.8%), reflecting better labor integration programs and growth in tourism-related jobs.
  </p>

  <div class="mt-3">
    <p><strong>📊 Key Economic Indicators (2023)</strong></p>
    <ol class="list-disc">
      <li>Workforce population: <strong>40,000</strong></li>
      <li>Registered companies: <strong>1,452</strong> (slight increase from 2022)</li>
      <li>Average monthly income: <strong>€1,115</strong></li>
      <li>GDP growth rate: <strong>5%</strong>, indicating solid post-pandemic recovery.</li>
    </ol>
  </div>
`;

   const newMessages: Message[] = [
      { sender: "user", text: userMessage },
      { sender: "ai", text: aiResponse }
    ];

    setMessages((prev) => [...prev, ...newMessages]);
  };

  const questions = [
    "Education level in Guadeloupe",
    "Healthcare access in Mayotte",
    "Key industries in French Guiana",
    "Population in workforce (all territories)",
    "Tourism contribution to GDP"
  ];

 useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 300) + "px";
  }, [value]);

  const hasChat = messages.length > 0;

  return (
    <div>
      <section className="max-w-7xl mx-auto py-12 lg:py-20 w-full px-6 flex flex-col gap-10 lg:gap-16">
       {hasChat && (
          <div className="flex flex-col gap-6 lg:gap-8">
            {messages.map((msg, idx) => (
              <ChatBubble key={idx} sender={msg.sender} content={msg.text} />
            ))}
          </div>
        )}
        {!hasChat && (
          <div className="text-center flex flex-col gap-4">
            <h1 className="text-5xl font-medium leading-[110%] tracking-[-0.03em]">
              Base de données
            </h1>
            <P className="lg:text-[18px] lg:leading-[140%] lg:tracking-[-0.01em]">
              Rechercher une information ou un contenu relatif aux Outre-Mer
            </P>
          </div>
        )}

        <FindData onSend={handleSend} />

        {!hasChat &&showPopular && (
          <div className="text-center flex flex-col gap-4 items-center">
            <h2 className="text-lg font-medium leading-[140%] tracking-[-0.02em]">
              Les questions les plus populaires
            </h2>

            <div className="flex flex-wrap justify-center gap-2 lg:gap-3 max-w-4xl">
              {questions.map((question, i) => (
                <Button
                  key={i}
                  variant="outline"
                  onClick={() => handleSend(question)} 
                  className="rounded-md bg-transparent border text-base font-regular leading-[150%] tracking-tighter text-foreground/70 hover:bg-muted transition py-2 px-4 lg:p-2"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
