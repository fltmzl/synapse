"use client";

import ChatWrapper from "./chat-wrapper";

export default function DataInsight() {
  const questions = [
    "Education level in Guadeloupe",
    "Healthcare access in Mayotte",
    "Key industries in French Guiana",
    "Population in workforce (all territories)",
    "Tourism contribution to GDP"
  ];

  return (
    <div>
      <section className="max-w-7xl mx-auto py-12 lg:py-20 w-full px-6 flex flex-col gap-10 lg:gap-16">
        <ChatWrapper initialShowPopular={true} questions={questions} />
      </section>
    </div>
  );
}
