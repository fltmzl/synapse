import { Suspense } from "react";
import FindCompany from "./section/find-company";
import TopEnterpriseSection from "./section/top-enterprise-section";

export default function CompanyPage() {
  return (
    <Suspense fallback={null}>
      <FindCompany />
      <TopEnterpriseSection />
    </Suspense>
  );
}
