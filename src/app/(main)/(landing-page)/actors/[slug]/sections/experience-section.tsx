"use client";

import SectionContainer from "@/components/container/section-container";
import { EmploymentType, ExperienceRole } from "@/types/common.type";
import React, { useState } from "react";
import ExperienceInfo from "../components/experience-info";
import SingleExperienceInfo from "../components/single-experience-info";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon } from "@/icons/arrow-down-icon";
import { ArrowUpIcon } from "@/icons/arrow-up-icon";

type SingleExperience = {
  id: number;
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
  id: number;
  type: "multiple";
  company: {
    image?: string;
    name: string;
    link: string;
    duration: string;
    employmentType: EmploymentType;
    location: string;
  };
  experienceRoles: ExperienceRole[];
};

export default function ExperienceSection() {
  const [isShowMore, setIsShowMore] = useState(false);

  const experiences: (MultipleExperience | SingleExperience)[] = [
    {
      id: 1,
      type: "multiple",
      company: {
        name: "Synapse Intelligence Group",
        link: "#",
        employmentType: "Full time",
        location: "Martinique, France",
        duration: "10 years 6 month"
      },
      experienceRoles: [
        {
          title: "Directeur Général",
          startDate: "12-2009",
          endDate: "11-2022",
          description: `
            <ul>
              <li>
                Overseeing strategic development for AI-based data analysis in French
                Overseas Territories.
              </li>
              <li>Leading a team of 45 researchers and analysts.</li>
            </ul>
          `
        },
        {
          title: "Economic Advisor",
          startDate: "2009",
          endDate: null,
          description: `
            <ul>
              <li>
                Overseeing strategic development for AI-based data analysis in French
                Overseas Territories.
              </li>
              <li>Leading a team of 45 researchers and analysts.</li>
            </ul>
          `
        }
      ]
    },
    {
      id: 2,
      type: "single",
      company: {
        image: null,
        name: "Caribbean Business Council",
        link: "#"
      },
      title: "Consultant",
      startDate: "09-2013",
      endDate: "09-2017"
    },
    {
      id: 3,
      type: "single",
      company: {
        image: null,
        name: "Caribbean Business Council",
        link: "#"
      },
      title: "Consultant",
      startDate: "09-2013",
      endDate: "09-2017"
    },
    {
      id: 4,
      type: "single",
      company: {
        image: null,
        name: "Caribbean Business Council",
        link: "#"
      },
      title: "Consultant",
      startDate: "09-2013",
      endDate: "09-2017"
    }
  ];

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
            <Button variant="text-secondary" onClick={toggleShowMore}>
              Show less <ArrowUpIcon />
            </Button>
          )}
        </div>
      </div>
    </SectionContainer>
  );
}
