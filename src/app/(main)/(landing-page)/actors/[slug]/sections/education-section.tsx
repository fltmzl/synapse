import SectionContainer from "@/components/container/section-container";
import React from "react";
import EducationInfo from "../components/education-info";

export default function EducationSection() {
  const educations: {
    id: number;
    title: string;
    education: {
      name: string;
      image?: string | null;
      link?: string;
    };
    startDate: string;
    endDate: string | null;
  }[] = [
    {
      id: 1,
      title: "Master in International Business",
      education: {
        image: "/images/education/skema-business-school.png",
        name: "Skema Business School",
        link: "#"
      },
      startDate: "01-2008",
      endDate: "01-2010"
    },
    {
      id: 2,
      title: "Bachelor in Economics",
      education: {
        image: "/images/education/universite-des-antilles.png",
        name: "Université des Antilles",
        link: "#"
      },
      startDate: "01-2005",
      endDate: "01-2008"
    }
  ];

  return (
    <SectionContainer className="rounded-2lg">
      <div className="p-5 lg:px-6 border-b">
        <h2 className="text-xl font-medium">Education</h2>
      </div>
      <div className="px-5 lg:px-6 divide-y">
        {educations.map((education) => (
          <EducationInfo
            key={education.title + education.id}
            title={education.title}
            education={education.education}
            startDate={education.startDate}
            endDate={education.endDate}
          />
        ))}
      </div>
    </SectionContainer>
  );
}
