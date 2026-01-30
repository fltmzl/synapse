"use client";

import SectionContainer from "@/components/container/section-container";
import NoResult from "@/components/no-result";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowDownIcon } from "@/icons/arrow-down-icon";
import { ArrowUpIcon } from "@/icons/arrow-up-icon";
import usePerson from "@/queries/use-person";
import { ExperienceRole } from "@/types/common.type";
import { CompanyPersonEmploymentType } from "@/types/person-relation.type";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import { useState } from "react";
import ExperienceInfo from "../components/experience-info";
import SingleExperienceInfo from "../components/single-experience-info";

type SingleExperience = {
  id: string;
  type: "single";
  title: string;
  company: {
    name: string;
    image?: string | null;
    link?: string;
  };
  startDate: string;
  endDate: string | null;
};

type MultipleExperience = {
  id: string;
  type: "multiple";
  company: {
    image?: string;
    name: string;
    link: string;
    duration: string;
    employmentType: CompanyPersonEmploymentType;
    location: string;
  };
  experienceRoles: ExperienceRole[];
};

export default function ExperienceSection() {
  const { slug } = useParams();
  const { data: person, isLoading } = usePerson(slug as string);
  const [isShowMore, setIsShowMore] = useState(false);

  if (isLoading) {
    return (
      <SectionContainer className="rounded-2lg">
        <div className="p-5 lg:px-6 border-b">
          <h2 className="text-xl font-medium">Poste</h2>
        </div>
        <div className="px-5 lg:px-6 divide-y divide-border">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-start gap-4 py-6">
              <Skeleton className="size-10 rounded-sm" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/5" />
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    );
  }

  if (!person) return null;

  const experiences: (SingleExperience | MultipleExperience)[] =
    person.companies.map((company) => ({
      id: company.id,
      type: "single",
      company: {
        image: company.profilePicture,
        name: company.name,
        link: company.website
      },
      title: company?.title || "",
      startDate: company.startDate
        ? format(company.startDate?.toDate(), "MMM yyyy")
        : "-",
      endDate: company.endDate
        ? format(company.endDate?.toDate(), "MMM yyyy")
        : "-"
    }));

  if (experiences.length === 0) {
    return (
      <SectionContainer className="rounded-2lg">
        <div className="p-5 lg:px-6 border-b">
          <h2 className="text-xl font-medium">Poste</h2>
        </div>
        <div>
          <NoResult
            title="No experience found"
            description="This person has no experience records yet."
          />
        </div>
      </SectionContainer>
    );
  }

  const filteredExperiences = isShowMore
    ? experiences
    : experiences.slice(0, 2);

  const toggleShowMore = () => {
    setIsShowMore((prev) => !prev);
  };

  return (
    <SectionContainer className="rounded-2lg">
      <div className="p-5 lg:px-6 border-b">
        <h2 className="text-xl font-medium">Poste</h2>
      </div>
      <div className="px-5 lg:px-6 divide-y divide-border">
        {filteredExperiences.map((experience) => {
          if (experience.type === "multiple") {
            return (
              <ExperienceInfo
                key={experience.id}
                company={experience.company}
                experienceRoles={experience.experienceRoles}
              />
            );
          }

          if (experience.type === "single") {
            return (
              <SingleExperienceInfo
                key={experience.id}
                company={experience.company}
                title={experience.title}
                startDate={experience.startDate}
                endDate={experience.endDate}
              />
            );
          }
        })}

        <div className="py-3 text-center">
          {!isShowMore ? (
            <Button
              variant="text-secondary"
              size="2md"
              onClick={toggleShowMore}
            >
              Show more <ArrowDownIcon />
            </Button>
          ) : (
            <Button
              variant="text-secondary"
              size="2md"
              onClick={toggleShowMore}
            >
              Show less <ArrowUpIcon />
            </Button>
          )}
        </div>
      </div>
    </SectionContainer>
  );
}
