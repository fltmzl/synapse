import SectionContainer from "@/components/container/section-container";
import React from "react";
import PoliticalInfo from "../components/policital-info";

export default function PoliticalSection() {
  const politicalSupports = [
    {
      id: 1,
      name: "République Française",
      image: "/images/political/republic-france.png"
    },
    {
      id: 2,
      name: "Ministère de l’Intérieur",
      image: "/images/political/ministere.png"
    },
    {
      id: 3,
      name: "Les Républicains",
      image: "/images/political/les-republicains.png"
    },
    {
      id: 4,
      name: "Forces de l’ordre",
      image: "/images/political/forces.png"
    }
  ];

  const politicalOpposes = [
    {
      id: 1,
      name: "Assemblée de Martinique",
      image: "/images/political/republic-france.png"
    },
    {
      id: 2,
      name: "Parti Progressiste Martiniquais",
      image: "/images/political/parti-progressiste.png"
    },
    {
      id: 3,
      name: "Parti Indépendantiste Martiniquais",
      image: "/images/political/parti-independentiste.png"
    }
  ];

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
            {politicalSupports.map((item) => (
              <PoliticalInfo
                key={item.name + item.id}
                image={item.image}
                name={item.name}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="bg-section border rounded-2xs py-2 px-4 text-center mb-2">
            <h3 className="font-medium">Opposes</h3>
          </div>
          <div className="space-y-2">
            {politicalOpposes.map((item) => (
              <PoliticalInfo
                key={item.name + item.id}
                image={item.image}
                name={item.name}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
