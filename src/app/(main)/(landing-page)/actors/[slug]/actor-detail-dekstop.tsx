import React from "react";
import ActorGeneralInfoSection from "./sections/actor-general-info-section";
import ExperienceSection from "./sections/experience-section";
import PoliticalSection from "./sections/political-section";
import EducationSection from "./sections/education-section";
import AssociationSection from "./sections/association-section";
import NetworkConnectionSection from "./sections/network-connection-section";

export default function ActorDetailDekstop() {
  return (
    <div className="space-y-4">
      <ActorGeneralInfoSection />

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <ExperienceSection />
          <EducationSection />
        </div>
        <div className="flex flex-col gap-4">
          <PoliticalSection />
          <AssociationSection />
          {/* <NetworkConnectionSection /> */}
        </div>
      </div>
    </div>
  );
}
