import { ArrowUpRightIcon } from "@/icons/arrow-up-right";
import { BuildingIcon } from "@/icons/building-icon";
import { BuildingSkyScraperIcon } from "@/icons/building-skyscraper-icon";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  title?: string;
  association: {
    name: string;
    image?: string | null;
    link?: string;
    type: string;
  };
  startDate: string;
  endDate: string | null;
};

export default function AssociationInfo({
  association,
  endDate,
  startDate,
  title
}: Props) {
  const startYear = startDate.split("-").pop();
  const endYear = endDate ? endDate.split("-").pop() : "Present";

  const getDateInformation = () => {
    if (!endDate) {
      return (
        <>
          <span>{association.type} since</span>
          <span>{startYear}</span>
        </>
      );
    }

    return (
      <>
        <span>{association.type} from</span>
        <span>{startYear}</span>
        <span> - </span>
        <span>{endYear}</span>
      </>
    );
  };

  return (
    <div className="flex items-start gap-4">
      <div className="border rounded-sm w-10 aspect-square grid place-content-center text-primary">
        {association.image ? (
          <Image
            src={association.image}
            alt={association.name}
            width={20}
            height={20}
            className="object-contain"
          />
        ) : (
          <BuildingSkyScraperIcon className="size-6" />
        )}
      </div>
      <div>
        {association.link ? (
          <Link
            href={association.link}
            className="group hover:text-primary flex items-center gap-1"
          >
            <h3 className="text-lg font-medium">{association.name}</h3>
            <ArrowUpRightIcon className="size-4 text-muted-foreground group-hover:text-primary" />
          </Link>
        ) : (
          <h3 className="text-lg font-medium">{association.name}</h3>
        )}

        {title && (
          <div className="text-muted-foreground">
            <span>{title}</span>
          </div>
        )}

        <div className="text-muted-foreground flex items-center gap-1">
          {getDateInformation()}
        </div>
      </div>
    </div>
  );
}
