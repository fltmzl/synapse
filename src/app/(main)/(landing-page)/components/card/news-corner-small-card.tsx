import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  image: string;
  href: string;
  dateString: string;
};

export default function NewsCornerSmallCard({
  title,
  dateString,
  href,
  image
}: Props) {
  return (
    <article className="group">
      <Link
        href={href}
        className="border-t border-gray-200 py-5 flex items-center gap-4"
      >
        <Image
          src={image}
          alt={title}
          width={120}
          height={88}
          className="rounded-[4px] object-cover flex-shrink-0"
        />
        <div className="flex flex-col justify-center gap-2">
          <span className="text-sm text-muted-foreground">{dateString}</span>
          <h4 className="text-lg font-medium leading-snug tracking-tight group-hover:text-primary">
            {title}
          </h4>
        </div>
      </Link>
    </article>
  );
}
