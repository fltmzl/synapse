"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { H1 } from "@/components/typography/h1";
import { H2 } from "@/components/typography/h2";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import clsx from "clsx";
import { ArrowRightBoldIcon } from "@/icons/arrow-right-bold-icon";

type Props = {
  category: string;
  date: string;
  title: string;
  image: string;
  variant: "mobile" | "desktop";
  className: string;
};

export default function ProductionCard({
  category,
  date,
  title,
  image,
  variant = "desktop",
  className
}: Props) {
  if (variant === "desktop") {
    return (
      <Card
        className={clsx(
          "gap-5 py-0 bg-transparent max-w-sm border-none  overflow-hidden snap-center",
          className
        )}
      >
        <CardHeader className=" p-0">
          <div className="relative w-full h-[220px]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover rounded-md"
            />
          </div>
        </CardHeader>

        <CardContent className="px-0 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row">
              <span className="text-sm tracking-[-0.01em] leading-[140%] text-muted-foreground font-regular">
                {category}
              </span>
              <div className="mx-3 relative flex items-center">
                <span className="block w-px h-[12px] bg-border relative top-[1px]" />
              </div>
              <span className="text-sm tracking-[-0.01em] leading-[140%] text-muted-foreground font-regular">
                {date}
              </span>
            </div>
            <H1>{title}</H1>
          </div>

          <Link
            href="#"
            className="flex items-center gap-1 text-md text-primary font-medium"
          >
            View more <ArrowRightBoldIcon className="w-5 h-5" />
          </Link>
        </CardContent>
      </Card>
    );
  }

  // mobile variant
  return (
    <Card
      className={clsx(
        "gap-5 bg-transparent py-0 flex-none min-w-full max-w-full overflow-hidden border-none",
        className
      )}
    >
      <CardHeader className="p-0">
        <div className="relative w-full h-[300px]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-md"
          />
        </div>
      </CardHeader>

      <CardContent className="px-0 flex flex-col gap-5">
        <div className="flex flex-col gap-2 text-left">
          <div className="flex flex-row">
            <H2 className="border-r pr-3">{category}</H2>
            <H2 className="pl-3">{date}</H2>
          </div>

          <H1>{title}</H1>
        </div>
        <Link
          href="#"
          className="flex items-center gap-1 text-md text-primary font-medium"
        >
          View more <ArrowRight className="w-5 h-5" />
        </Link>
      </CardContent>
    </Card>
  );
}
