import React from "react";
import ActorGeneralInfoSection from "./sections/actor-general-info-section";
import ExperienceSection from "./sections/experience-section";
import PoliticalSection from "./sections/political-section";
import EducationSection from "./sections/education-section";
import AssociationSection from "./sections/association-section";
import RelatedPersonalitySection from "./sections/related-personality-section";

export default function ActorDetailDekstop() {
  return (
    <div className="space-y-4">
      <div className="max-w-7xl mx-6 xl:mx-auto">
        <ActorGeneralInfoSection />
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-7xl mx-6 xl:mx-auto pb-20">
        <div className="flex flex-col gap-4">
          <ExperienceSection />
          <EducationSection />
        </div>
        <div className="flex flex-col gap-4">
          <PoliticalSection />
          <AssociationSection />
          {/*<NetworkConnectionSection /> */}
        </div>
      </div>

      <RelatedPersonalitySection />
    </div>
  );
}
