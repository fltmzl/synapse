"use client";

import { ELK as ELKInstance } from "elkjs";
import { useEffect, useState } from "react";
import useIsClient from "./use-is-client";

export default function useELK() {
  const isClient = useIsClient();
  const [elk, setElk] = useState<ELKInstance | null>(null);

  useEffect(() => {
    import("elkjs/lib/elk.bundled.js").then((mod) => {
      const Elk = mod.default;
      setElk(new Elk());
    });
  }, [isClient]);

  return elk;
}
