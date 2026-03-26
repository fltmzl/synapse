import FindData from "@/components/find-data";
import { Button } from "@/components/ui/button";
import { Message } from "@/types/database.type";
import { useState } from "react";
import ChatContainer from "./chat-container";
import axios from "axios";
import {
  VertexAnswerResponse,
  VertexSearchResult
} from "@/types/vertex-ai.type";
import { processVertexResponse } from "@/lib/vertex-utils";

type Props = {
  initialShowPopular: boolean;
  questions?: string[];
};

export default function ChatWrapper({ initialShowPopular, questions }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showPopular, setShowPopular] = useState(initialShowPopular);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (userMessage: string): Promise<void> => {
    if (!userMessage.trim() || isLoading) return;

    if (showPopular) setShowPopular(false);

    // 1. Add user message
    const userMsg: Message = { sender: "user", text: userMessage };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await axios.post<{
        answer: VertexAnswerResponse["answer"];
        results: VertexSearchResult[];
      }>("/api/search", { query: userMessage });

      const { answer } = response.data;

      // 2. Map AI response with processed text (markdown to html + citations)
      const processedHtml = await processVertexResponse(answer);

      const aiMsg: Message = {
        sender: "ai",
        text:
          processedHtml ||
          "I'm sorry, I couldn't generate an answer from the search results.",
        references: answer.references
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("Vertex Search Error:", error);
      const errorMsg: Message = {
        sender: "ai",
        text: "I'm having trouble connecting to the database right now. Please try again later."
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-h-[870px] overflow-y-auto hide-scrollbar flex flex-col gap-8">
      <div className="max-w-[860px] mx-auto w-full">
        <ChatContainer messages={messages} isLoading={isLoading} />
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
