import React from "react";
import ActorGeneralInfoSection from "./sections/actor-general-info-section";
import ExperienceSection from "./sections/experience-section";
import PoliticalSection from "./sections/political-section";
import EducationSection from "./sections/education-section";
import AssociationSection from "./sections/association-section";
import NetworkConnectionSection from "./sections/network-connection-section";

export default function ActorDetailMobile() {
  return (
    <div className="grid gap-4">
      <ActorGeneralInfoSection />
      <ExperienceSection />
      <PoliticalSection />
      <EducationSection />
      <AssociationSection />
      <NetworkConnectionSection />
    </div>
  );
}
