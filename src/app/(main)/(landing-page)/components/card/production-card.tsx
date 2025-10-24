"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { H1 } from "@/components/typography/h1";
import { H2 } from "@/components/typography/h2";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";
import { ProductionCardProps } from "@/types/news.type";
import { H3 } from "@/components/typography/h3";
import { ArrowRightIcon } from "@/icons/arrow-right-icon";
import { ArrowRightBoldIcon } from "@/icons/arrow-right-bold-icon";

export default function ProductionCard({
  data,
  variant = "desktop",
  className
}: ProductionCardProps) {
  if (variant === "desktop") {
    return (
      <Card
        className={clsx(
          "gap-5 py-0 bg-transparent max-w-sm border-none shrink-0 overflow-hidden snap-center",
          className
        )}
      >
        <CardHeader className=" p-0">
          <div className="relative w-full h-[220px]">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover rounded-md"
            />
          </div>
        </CardHeader>

        <CardContent className="px-0 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row">
              <H3 className="border-r pr-3">{data.category}</H3>
              <H3 className="pl-3">{data.date}</H3>
            </div>
            <H1>{data.title}</H1>
          </div>

          <div className="flex items-center gap-1 text-md text-primary font-medium">
            View more <ArrowRightBoldIcon className="w-5 h-5" />
          </div>
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
            src={data.image}
            alt={data.title}
            fill
            className="object-cover rounded-md"
          />
        </div>
      </CardHeader>

      <CardContent className="px-0 flex flex-col gap-5">
        <div className="flex flex-col gap-2 text-left">
          <div className="flex flex-row">
            <H2 className="border-r pr-3">{data.category}</H2>
            <H2 className="pl-3">{data.date}</H2>
          </div>

          <H1>{data.title}</H1>
        </div>
        <div className="flex items-center gap-1 text-md text-primary font-medium">
          View more <ArrowRight className="w-5 h-5" />
        </div>
      </CardContent>
    </Card>
  );
}
