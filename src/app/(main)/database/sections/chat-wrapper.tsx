import React, { useState } from "react";
import ChatContainer from "./chat-container";
import FindData from "@/components/find-data";
import { Button } from "@/components/ui/button";
import { Message } from "@/types/database.type";

type Props = {
  initialShowPopular: boolean;
  questions?: string[];
};

export default function ChatWrapper({ initialShowPopular, questions }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showPopular, setShowPopular] = useState(initialShowPopular);

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
        sourceUrl: "https://www.banque-france.fr"
      }
    ];

    setMessages((prev) => [...prev, ...newMessages]);
  };

  return (
    <div className="max-h-[870px] overflow-y-auto hide-scrollbar flex flex-col gap-8">
      <div className="max-w-[860px] mx-auto w-full">
        <ChatContainer messages={messages} />
      </div>

      <div className="sticky left-0 right-0 bottom-0 w-full z-40">
        <div className="w-full max-w-[909px] mx-auto">
          <FindData handleSend={handleSend} />
        </div>
      </div>

      {showPopular && (
        <div className="text-center flex flex-col gap-4 items-center">
          <h2 className="text-lg font-medium leading-[140%] tracking-[-0.02em]">
            Les questions les plus populaires
          </h2>

          <div className="flex flex-wrap justify-center gap-2 lg:gap-3 max-w-4xl">
            {questions?.map((question, i) => (
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
    </div>
  );
}
