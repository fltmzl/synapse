import SectionContainer from "@/components/container/section-container";
import React from "react";
import AssociationInfo from "../components/association-info";

export default function AssociationSection() {
  const associations: {
    id: number;
    title?: string;
    association: {
      name: string;
      image?: string | null;
      link?: string;
      type: string;
    };
    startDate: string;
    endDate: string | null;
  }[] = [
    {
      id: 1,
      association: {
        image: null,
        name: "Voile 972",
        link: "#",
        type: "Member"
      },
      startDate: "01-2015",
      endDate: null
    },
    {
      id: 2,
      association: {
        image: null,
        name: "Secours 972",
        link: "#",
        type: "Volunteer"
      },
      startDate: "01-2018",
      endDate: "01-2023"
    }
  ];

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
          />
        ))}
      </div>
    </SectionContainer>
  );
}
