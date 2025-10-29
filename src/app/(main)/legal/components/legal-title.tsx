import React from "react";

type Props = {
  title: string;
  description: string;
};

export default function LegalTitle({ description, title }: Props) {
  return (
    <div className="lg:border-b lg:pb-8">
      <h1 className="text-xl lg:text-[2.5rem] font-medium tracking-tighter">
        {title}
      </h1>
      <p className="mt-4">{description}</p>
    </div>
  );
}
