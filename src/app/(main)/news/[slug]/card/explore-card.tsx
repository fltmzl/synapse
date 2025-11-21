"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { H1 } from "@/components/typography/h1";
import { P } from "@/components/typography/paragraph";

type ExploreCardProps = {
  title: string;
  category: string;
  date: string;
  images: string[];
  description?: string;
  className?: string;
};

export default function ExploreCard({
  title,
  category,
  date,
  images,
  description,
  className
}: ExploreCardProps) {
  return (
    <Card
      className={clsx(
        "h-full lg:h-[364px] lg:gap-10 flex flex-col gap-5 bg-transparent py-0 flex-none min-w-[216px] max-w-[216px] lg:min-w-[380px] lg:max-w-[380px] overflow-hidden border-none",
        className
      )}
    >
      <CardHeader className="p-0">
        <div className="relative w-full h-[147px] lg:h-[260px] rounded-md ">
          <Image
            src={images[0]}
            alt={title}
            fill
            className="object-cover rounded-md "
          />
        </div>
      </CardHeader>

      <CardContent className="px-0 flex flex-col gap-3 text-left">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row text-sm text-muted-foreground">
            <div className="flex items-center text-base leading-[150%] tracking-[-0.01em]">
              <span className="text-base leading-[150%] tracking-[-0.01em]">
                {category}
              </span>

              {/* Garis pemisah */}
              <span className="inline-block w-[1.5px] h-[18px] bg-border mx-3" />

              <span className="text-base leading-[150%] tracking-[-0.01em]">
                {date}
              </span>
            </div>
          </div>

          <h2 className="text-xl font-medium leading-[130%] tracking-tighter">
            {title}
          </h2>
        </div>
      </CardContent>
    </Card>
  );
}
