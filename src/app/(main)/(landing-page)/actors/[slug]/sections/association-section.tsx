"use client";
import SectionContainer from "@/components/container/section-container";
import React from "react";
import AssociationInfo from "../components/association-info";
import { useParams } from "next/navigation";
import usePerson from "@/queries/use-person";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { Users } from "lucide-react";

export default function AssociationSection() {
  const { slug } = useParams();
  const { data: person, isLoading } = usePerson(slug as string);

  if (isLoading) {
    return (
      <SectionContainer className="rounded-2lg">
        <div className="p-5 lg:px-6 border-b">
          <h2 className="text-xl font-medium">Associations</h2>
        </div>
        <div className="px-5 lg:px-6 py-6 gap-6 grid lg:grid-cols-2">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-start gap-4">
              <Skeleton className="size-10 rounded-sm" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    );
  }

  if (!person) return null;

  const associations =
    person.associations?.map((assoc) => ({
      id: assoc.id,
      title: assoc?.title || "",
      association: {
        name: assoc.name || "Untitled",
        image: assoc.profilePicture,
        link: assoc.link,
        type: assoc?.type || "Member"
      },
      startDate: assoc.startDate
        ? format(assoc.startDate.toDate(), "MM-yyyy")
        : "",
      endDate: assoc.endDate ? format(assoc.endDate.toDate(), "MM-yyyy") : null
    })) || [];

  if (associations.length === 0) {
    return (
      <SectionContainer className="rounded-2lg">
        <div className="p-5 lg:px-6 border-b">
          <h2 className="text-xl font-medium">Associations</h2>
        </div>
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="bg-muted/30 p-3 rounded-full mb-3">
            <Users className="size-6 text-muted-foreground/60" />
          </div>
          <p className="text-sm text-muted-foreground max-w-[250px]">
            This person has no association records yet.
          </p>
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer className="rounded-2lg">
      <div className="p-5 lg:px-6 border-b">
        <h2 className="text-xl font-medium">Associations</h2>
      </div>
      <div className="px-5 lg:px-6 py-6 gap-6 grid lg:grid-cols-2">
        {associations.map((association) => (
          <AssociationInfo
            key={association.association.name + association.id}
            association={association.association}
            startDate={association.startDate}
            endDate={association.endDate}
            title={association.title}
          />
        ))}
      </div>
    </SectionContainer>
  );
}
