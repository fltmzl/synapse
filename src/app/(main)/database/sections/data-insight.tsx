"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { P } from "@/components/typography/paragraph";
import FindData from "@/components/find-data";
import { ChatBubble } from "./chat-bubble";
import ChatContainer from "./chat-container";

export default function DataInsight() {
  const [showPopular, setShowPopular] = useState<boolean>(true);

  const questions = [
    "Education level in Guadeloupe",
    "Healthcare access in Mayotte",
    "Key industries in French Guiana",
    "Population in workforce (all territories)",
    "Tourism contribution to GDP"
  ];

  const handlePopularClick = (q: string) => {
    (window as any).handleSend?.(q);
    setShowPopular(false);
  };

  return (
    <div>
      <section className="max-w-7xl mx-auto py-12 lg:py-20 w-full px-6 flex flex-col gap-10 lg:gap-16">
        <div className="max-w-[860px] mx-auto w-full">
         <ChatContainer />
        </div>

        <FindData />

        {showPopular && (
          <div className="text-center flex flex-col gap-4 items-center">
            <h2 className="text-lg font-medium leading-[140%] tracking-[-0.02em]">
              Les questions les plus populaires
            </h2>

            <div className="flex flex-wrap justify-center gap-2 lg:gap-3 max-w-4xl">
              {questions.map((question, i) => (
                <Button
                  key={i}
                  variant="outline"
                  onClick={() => handlePopularClick(question)}
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
