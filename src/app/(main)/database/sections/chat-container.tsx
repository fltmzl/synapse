"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { P } from "@/components/typography/paragraph";
import FindData from "@/components/find-data";
import { ChatBubble } from "./chat-bubble";
import SectionTitle from "@/components/typography/section-title";

type Message = {
  sender: "user" | "ai";
  text: string;
  fileName?: string;
  fileUrl?: string;
  sourceName?: string;
  sourceUrl?: string;
};

type ChatContainerProps = {
  title?: string;
  subtitle?: string;
  showPopularQuestions?: boolean;
};

export default function ChatContainer({
  title = "Base de données",
  subtitle = "Rechercher une information ou un contenu relatif aux Outre-Mer",
  showPopularQuestions = true,
}: ChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showPopular, setShowPopular] = useState(showPopularQuestions);

  const handleSend = (userMessage: string): void => {
    if (showPopular) setShowPopular(false);

    const aiResponse = `
      <p>In <strong>Guadeloupe</strong>, the unemployment rate for <strong>2023</strong> was <strong>12%</strong>.</p>
      <p>This marks a small but significant improvement compared to 2022 (12.8%), reflecting better labor integration programs and growth in tourism-related jobs.</p>
      <div class="mt-3">
        <p><strong>📊 Key Economic Indicators (2023)</strong></p>
        <ol class="list-disc">
          <li>Workforce population: <strong>40,000</strong></li>
          <li>Registered companies: <strong>1,452</strong></li>
          <li>Average monthly income: <strong>€1,115</strong></li>
          <li>GDP growth rate: <strong>5%</strong></li>
        </ol>
      </div>
    `;

    const newMessages: Message[] = [
      { sender: "user", text: userMessage },
      {
        sender: "ai",
        text: aiResponse,
        fileName: "Martinique_GDP_growth_trend.png",
        fileUrl: "/0ee490b7-e479-4e78-8114-ff4c13414425.png",
        sourceName: "Banque de France – Overseas Economic Report",
        sourceUrl: "https://www.banque-france.fr",
      },
    ];

    setMessages((prev) => [...prev, ...newMessages]);
  };

  // biar bisa dipanggil dari FindData
  useEffect(() => {
    (window as any).handleSend = handleSend;
  }, []);

  const hasChat = messages.length > 0;

  const popularQuestions = [
    "Education level in Guadeloupe",
    "Healthcare access in Mayotte",
    "Key industries in French Guiana",
    "Population in workforce (all territories)",
    "Tourism contribution to GDP",
  ];

  return (
    <>
      <div className="max-w-[860px] mx-auto w-full p-0">
        {hasChat ? (
          <div className="flex flex-col gap-6 lg:gap-8">
            {messages.map((msg, idx) => (
              <ChatBubble key={idx} {...msg} />
            ))}
          </div>
        ) : (
          <div className="text-center flex flex-col gap-2">
            <SectionTitle>{title}</SectionTitle>
            <P className="lg:text-[18px] lg:leading-[140%] lg:tracking-[-0.01em]">
              {subtitle}
            </P>
          </div>
        )}
      </div>

     </>
  );
}
