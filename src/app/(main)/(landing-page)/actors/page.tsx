import { Suspense } from "react";
import AnswerActors from "./sections/answer-actors";
import FindActors from "./sections/find-actors";

export default function ActorsPage() {
  return (
    <Suspense fallback={null}>
      <FindActors />
      <AnswerActors />
    </Suspense>
  );
}
