import DatabaseMaps from "@/components/database-maps";
import TabsHeader from "@/components/tabs-header";
import { H2 } from "@/components/typography/h2";
import SectionTitle from "@/components/typography/section-title";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { databaseData } from "@/data/database-data";
import { ArrowRightBoldIcon } from "@/icons/arrow-right-bold-icon";
import { DownloadIcon } from "@/icons/download-icon";
import Image from "next/image";
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
     
     <DatabaseMaps />
     </div>
    </section>
  );
}
