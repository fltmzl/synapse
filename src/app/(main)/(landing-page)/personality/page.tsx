import { Suspense } from "react";
import AnswerPersonality from "./sections/answer-personality";
import FindPersonality from "./sections/find-personality";

export default function PersonalityPage() {
  return (
    <Suspense fallback={null}>
      <FindPersonality />
      <AnswerPersonality />
    </Suspense>
  );
}
