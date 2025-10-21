"use client";

import Image, { StaticImageData } from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LatestCard({ category, date, title, image }: NewsItem) {
  return (
    <Card className="w-full max-w-sm shrink-0 overflow-hidden">
      <CardHeader>
        <div className="relative w-full ">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-lg "
          />
        </div>
      </CardHeader>

      <CardContent className="pt-5 pb-6 px-0 flex flex-col gap-3">
        <div className="flex items-center text-xs text-gray-500">
          <span className="border-r border-gray-300 pr-3">{category}</span>
          <span className="pl-3">{date}</span>
        </div>

        <p className="text-[15px] font-medium leading-snug tracking-[-0.02em] text-gray-900 px-1">
          {title}
        </p>

        <Link
          href="#"
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium px-1"
        >
          View more <ArrowRight size={14} />
        </Link>
      </CardContent>
    </Card>
  );
}
