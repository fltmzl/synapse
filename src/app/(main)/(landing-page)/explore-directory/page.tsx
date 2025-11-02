import { Suspense } from "react";
import AnswerDirectory from "./sections/answer-directory";
import FindDirectory from "./sections/find-directory";

export default function PersonalityPage() {
  return (
    <Suspense fallback={null}>
      <FindDirectory />
      <AnswerDirectory />
    </Suspense>
  );
}
