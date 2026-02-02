"use client";
import SectionContainer from "@/components/container/section-container";
import React from "react";
import PoliticalInfo from "../components/policital-info";
import { useParams } from "next/navigation";
import usePerson from "@/queries/use-person";
import { Skeleton } from "@/components/ui/skeleton";
import { Flag } from "lucide-react";

export default function PoliticalSection() {
  const { slug } = useParams();
  const { data: person, isLoading } = usePerson(slug as string);

  if (isLoading) {
    return (
      <SectionContainer className="rounded-2lg">
        <div className="p-5 lg:px-6 border-b">
          <h2 className="text-xl font-medium">Political Orientation</h2>
        </div>
        <div className="py-6 px-5 lg:py-6 lg:px-6 grid lg:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i}>
              <div className="bg-section border rounded-2xs py-2 px-4 text-center mb-2">
                <Skeleton className="h-5 w-20 mx-auto" />
              </div>
              <div className="space-y-2">
                {[1, 2, 3].map((j) => (
                  <div
                    key={j}
                    className="flex items-center gap-3 p-3 border rounded-2xs"
                  >
                    <Skeleton className="size-8 rounded-full" />
                    <Skeleton className="h-5 flex-1" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    );
  }

  if (!person) return null;

  const politicalSupports = person.politicalParties
    .filter((p) => p.type === "supports")
    .map((p) => ({
      id: p.id,
      name: p.name || "Untitled",
      image: p.profilePicture || ""
    }));

  const politicalOpposes = person.politicalParties
    .filter((p) => p.type === "opposes")
    .map((p) => ({
      id: p.id,
      name: p.name || "Untitled",
      image: p.profilePicture || ""
    }));

  if (politicalSupports.length === 0 && politicalOpposes.length === 0) {
    return (
      <SectionContainer className="rounded-2lg">
        <div className="p-5 lg:px-6 border-b">
          <h2 className="text-xl font-medium">Political Orientation</h2>
        </div>
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="bg-muted/30 p-3 rounded-full mb-3">
            <Flag className="size-6 text-muted-foreground/60" />
          </div>
          <p className="text-sm text-muted-foreground max-w-[250px]">
            This person has no political affiliation records yet.
          </p>
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer className="rounded-2lg">
      <div className="p-5 lg:px-6 border-b">
        <h2 className="text-xl font-medium">Political Orientation</h2>
      </div>
      <div className="py-6 px-5 lg:py-6 lg:px-6 grid lg:grid-cols-2 gap-6">
        <div>
          <div className="bg-section border rounded-2xs py-2 px-4 text-center mb-2">
            <h3 className="font-medium">Supports</h3>
          </div>
          <div className="space-y-2">
            {politicalSupports.length > 0 ? (
              politicalSupports.map((item) => (
                <PoliticalInfo
                  key={item.name + item.id}
                  image={item.image}
                  name={item.name}
                />
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No supports found
              </p>
            )}
          </div>
        </div>
        <div>
          <div className="bg-section border rounded-2xs py-2 px-4 text-center mb-2">
            <h3 className="font-medium">Opposes</h3>
          </div>
          <div className="space-y-2">
            {politicalOpposes.length > 0 ? (
              politicalOpposes.map((item) => (
                <PoliticalInfo
                  key={item.name + item.id}
                  image={item.image}
                  name={item.name}
                />
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No opposes found
              </p>
            )}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
