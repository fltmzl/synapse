"use client";

import SectionContainer from "@/components/container/section-container";
import React from "react";
import EducationInfo from "../components/education-info";
import { useParams } from "next/navigation";
import usePerson from "@/queries/use-person";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import NoResult from "@/components/no-result";

export default function EducationSection() {
  const { slug } = useParams();
  const { data: person, isLoading } = usePerson(slug as string);

  if (isLoading) {
    return (
      <SectionContainer className="rounded-2lg">
        <div className="p-5 lg:px-6 border-b">
          <h2 className="text-xl font-medium">Education</h2>
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

  const educations: {
    id: string;
    title: string;
    education: {
      name: string;
      image?: string;
      link?: string | undefined;
    };
    startDate: string;
    endDate: string | null;
  }[] =
    person?.educations.map((education) => ({
      id: education.id,
      title: education?.major || "Untitled",
      education: {
        name: education?.name || "Untitled",
        image: education?.profilePicture,
        link: education?.link || undefined
      },
      startDate: education?.startDate
        ? format(education?.startDate?.toDate(), "yyyy")
        : "",
      endDate: education?.endDate
        ? format(education?.endDate?.toDate(), "yyyy")
        : ""
    })) || [];

  if (educations.length === 0) {
    return (
      <SectionContainer className="rounded-2lg">
        <div className="p-5 lg:px-6 border-b">
          <h2 className="text-xl font-medium">Education</h2>
        </div>
        <NoResult
          title="No education found"
          description="This person has no education records yet."
        />
      </SectionContainer>
    );
  }

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
