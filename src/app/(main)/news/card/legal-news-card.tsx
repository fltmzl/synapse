"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { LegalNewsItem } from "@/types/news.type";
import { MapPin, User } from "lucide-react";

export const LegalCard = ({
  title,
  image,
  tags,
  territory,
  excerpt,
  place,
  publisher,
  date,
  person,
  category
}: LegalNewsItem) => {
  return (
    <Card className="gap-0 py-0 overflow-hidden transition-all border rounded-md  w-full ">
      {/* Gambar */}
      <div className="relative w-full h-[264px] md:min-h-[120px] lg:min-h-[100px]">
        <Image
          src={image || "https://placehold.co/400x300"}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <CardContent className="flex flex-col p-4 gap-4">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="font-medium text-lg leading-[140%] tracking-tight line-clamp-2">
                {title}
              </h3>

              {excerpt && (
                <p className="text-base text-muted-foreground font-regular leading-[150%] tracking-tighter line-clamp-2">
                  {excerpt}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="rounded-sm flex flex-wrap gap-2 items-center ">
                {person && (
                  <Badge
                    variant="default"
                    className="px-2 py-1 flex items-center gap-1 text-sm font-regular leading-[140%] tracking-tighter"
                  >
                    <User className="w-5 h-5 shrink-0" />
                    {person}
                  </Badge>
                )}
                {place && (
                  <Badge className="px-2 py-1 bg-[var(--tags)] text-primary text-sm font-regular leading-[140%] tracking-tighter">
                    <MapPin className="w-3 h-3" />
                    {place}
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-2 ">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="text-foreground px-2 py-1 text-sm font-regular leading-[140%] tracking-tighter bg-muted"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* publisher left, date right */}
            </div>
          </div>
          <div className="text-sm text-muted-foreground flex justify-between items-center">
            <span>{publisher}</span>
            <span>{date}</span>
          </div>
        </div>

        {/* badges: person & place */}
      </CardContent>
    </Card>
  );
};
