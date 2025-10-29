"use client";

import { useEffect, useState } from "react";

type Props = {
  sections: { id: string; title: string }[];
};

export default function useTableOfContentObserver({ sections }: Props) {
  const [activeId, setActiveId] = useState<string>(sections[0].id);

  useEffect(() => {
    const sectionEls = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    let raf: number;

    const observer = new IntersectionObserver(
      (entries) => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort(
              (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
            );

          if (visible.length > 0) {
            setActiveId(visible[0].target.id);
          }
        });
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0.1
      }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [sections]);

  return { activeId };
}
