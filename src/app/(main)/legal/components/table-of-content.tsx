import clsx from "clsx";
import Link from "next/link";
import React from "react";

type Props = {
  sections: { id: string; title: string }[];
  activeId: string;
};

export default function TableOfContent({ sections, activeId }: Props) {
  return (
    <>
      <h3 className="text-xl font-medium mb-4 mt-8">Table of contents</h3>
      <ul className="space-y-2 text-sm">
        {sections.map((section, index) => (
          <li key={section.id}>
            <Link
              href={`#${section.id}`}
              className={clsx(
                "hover:text-primary transition-colors flex gap-2",
                activeId === section.id
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <span>{index + 1}. </span>
              <span>{section.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
