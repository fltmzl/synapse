import DatabaseMaps from "@/components/database-maps";
import SectionTitle from "@/components/typography/section-title";
import { databaseData } from "@/data/database-data";
import { useState } from "react";

export default function DatabasePage() {
  const tabs = databaseData.map((data) => data.title);
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  const [year, setYear] = useState("2024");

  const currentData = databaseData.find((data) => data.title === activeTab);

  return (
    <section className="bg-section">
      <div className="max-w-7xl mx-auto py-12 lg:py-25 w-full px-6 xl:px-5 flex flex-col gap-10 lg:gap-16">
           <SectionTitle className="text-center">Les chiffres clés</SectionTitle>
     
     <DatabaseMaps showMoreBtn={true} />
     </div>
    </section>
  );
}
