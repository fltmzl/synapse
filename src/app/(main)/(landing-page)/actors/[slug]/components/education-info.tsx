import { ArrowUpRightIcon } from "@/icons/arrow-up-right";
import { BuildingIcon } from "@/icons/building-icon";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  education: {
    name: string;
    image?: string | null;
    link?: string;
  };
  startDate: string;
  endDate: string | null;
};

export default function EducationInfo({
  education,
  endDate,
  startDate,
  title
}: Props) {
  const startYear = startDate.split("-").pop();
  const endYear = endDate ? endDate.split("-").pop() : "Present";

  return (
    <div className="flex items-start gap-4 py-6">
      <div className="border rounded-sm w-10 aspect-square grid place-content-center text-primary">
        {education.image ? (
          <Image
            src={education.image}
            alt={education.name}
            width={20}
            height={20}
            className="object-contain"
          />
        ) : (
          <BuildingIcon />
        )}
      </div>
      <div>
        {education.link ? (
          <Link
            href={education.link}
            className="group hover:text-primary flex items-center gap-1"
          >
            <h3 className="text-lg font-medium">{education.name}</h3>
            <ArrowUpRightIcon className="size-4 text-muted-foreground group-hover:text-primary" />
          </Link>
        ) : (
          <h3 className="text-lg font-medium">{education.name}</h3>
        )}

        <div className="text-muted-foreground">
          <span>{title}</span>
        </div>
        <div className="text-muted-foreground">
          <span>{startYear}</span>
          <span> - </span>
          <span>{endYear}</span>
        </div>
      </div>
    </div>
  );
}
