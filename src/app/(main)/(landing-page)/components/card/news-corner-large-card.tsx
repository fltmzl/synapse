import { H1 } from "@/components/typography/h1";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  image: string;
  description: string;
  href: string;
  dateString: string;
};

export default function NewsCornerLargeCard({
  title,
  image,
  href,
  description,
  dateString
}: Props) {
  return (
    <article className="group">
      <Link href={href}>
        <Image
          src={image}
          alt={title}
          width={1200}
          height={600}
          className="w-full mb-4 h-56 object-cover rounded-md"
        />
        <div className="flex flex-col gap-2">
          <span className="text-base tracking-[-0.01em] leading-[150%] text-muted-foreground font-regular">
            {dateString}
          </span>
          <H1 className="group-hover:text-primary">{title}</H1>
          <span className="line-clamp-2 mb-5 text-base tracking-[-0.01em] leading-[150%] text-muted-foreground font-regular">
            {description}
          </span>
        </div>
      </Link>
    </article>
  );
}
