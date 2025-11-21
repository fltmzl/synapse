import { ArrowUpRightIcon } from "@/icons/arrow-up-right";
import { BuildingIcon } from "@/icons/building-icon";
import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  company: {
    name: string;
    image?: string | null;
    link?: string;
  };
  startDate: string;
  endDate: string | null;
};

export default function SingleExperienceInfo({
  company,
  endDate,
  startDate,
  title
}: Props) {
  const startYear = startDate.split("-").pop();
  const endYear = endDate ? endDate.split("-").pop() : "Present";

  return (
    <div className="flex items-start gap-4 py-6">
      <div className="border rounded-sm w-10 aspect-square grid place-content-center text-primary">
        {company.image ? (
          <Image
            src={company.image}
            alt={company.name}
            width={20}
            height={20}
            className="object-contain"
          />
        ) : (
          <BuildingIcon />
        )}
      </div>
      <div>
        <h3 className="text-lg font-medium ">{title}</h3>
        <div className="text-muted-foreground flex items-center gap-1">
          {!company.link && company.name}
          {company.link && (
            <Link
              href={company.link}
              className="hover:text-primary flex items-center gap-1"
            >
              {company.name}
              <ArrowUpRightIcon className="size-4" />
            </Link>
          )}
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
