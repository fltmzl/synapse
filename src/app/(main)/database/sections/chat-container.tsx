"use client";

import { P } from "@/components/typography/paragraph";
import SectionTitle from "@/components/typography/section-title";
import { Message } from "@/types/database.type";
import { ChatBubble } from "./chat-bubble";

type Props = {
  title?: string;
  subtitle?: string;
  showPopularQuestions?: boolean;
  messages: Message[];
  isLoading?: boolean;
};

export default function ChatContainer({
  title = "Base de données",
  subtitle = "Rechercher une information ou un contenu relatif aux Outre-Mer",
  messages,
  isLoading
}: Props) {
  const hasChat = messages.length > 0;

  return (
    <>
      <div className="max-w-[860px] mx-auto w-full p-0">
        {hasChat ? (
          <div className="flex flex-col gap-6 lg:gap-8">
            {messages.map((msg, idx) => (
              <ChatBubble key={idx} {...msg} />
            ))}
            {isLoading && (
              <ChatBubble
                sender="ai"
                text={`
                  <div class="flex items-center gap-1 py-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce"></span>
                    <span class="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce [animation-delay:0.2s]"></span>
                    <span class="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                `}
              />
            )}
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
