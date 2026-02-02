import { ArrowUpRightIcon } from "@/icons/arrow-up-right";
import { BuildingIcon } from "@/icons/building-icon";
import { ExperienceRole } from "@/types/common.type";
import { CompanyPersonEmploymentType } from "@/types/person-relation.type";
import Image from "next/image";
import Link from "next/link";
import ExperienceRoleInfo from "./experience-role-info";

type Props = {
  company: {
    image?: string;
    name: string;
    link?: string;
    duration: string;
    employmentType: CompanyPersonEmploymentType;
    location: string;
  };
  experienceRoles: ExperienceRole[];
};

export default function ExperienceInfo({ company, experienceRoles }: Props) {
  return (
    <div className="py-6">
      <div className="flex items-start gap-4">
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
          <h3 className="text-lg font-medium flex items-center gap-1">
            {!company.link && company.name}
            {company.link && (
              <Link
                href={company.link}
                className="group hover:text-primary flex items-center gap-1"
              >
                {company.name}
                <ArrowUpRightIcon className="size-4 text-muted-foreground group-hover:text-primary" />
              </Link>
            )}
          </h3>
          <div className="text-foreground/80">
            {company.employmentType}, {company.duration}
          </div>
          <div className="text-muted-foreground">{company.location}</div>
        </div>
      </div>

      <div className="mt-5">
        {experienceRoles.map((role, index) => (
          <ExperienceRoleInfo
            key={role.title + index}
            title={role.title}
            description={role.description}
            startDate={role.startDate}
            endDate={role.endDate}
            disableLine={index + 1 === experienceRoles.length}
          />
        ))}
      </div>
    </div>
  );
}
