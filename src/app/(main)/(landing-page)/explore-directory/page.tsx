"use client";

import { Suspense } from "react";
import AnswerDirectory from "./sections/answer-directory";
import FindDirectory from "./sections/find-directory";
import { parseAsString, useQueryState } from "nuqs";

export default function PersonalityPage() {
const [searchRaw] = useQueryState("search", parseAsString);
  const search = searchRaw ?? "";  return (
    <Suspense fallback={null}>
      <FindDirectory />
      {search.trim() !== "" && <AnswerDirectory />}
    </Suspense>
  );
}
