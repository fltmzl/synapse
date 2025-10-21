"use client";

import { H2 } from "@/components/typography/h2";
import { Title } from "@/components/typography/title";
import { Button } from "@/components/ui/button";
import NewsCard from "./components/card/news-card";
import NewsSection from "./sections/news";
import LatestProductions from "./sections/latest-prod";
import LatestInfo from "./sections/latest-info";
import Database from "./sections/database";
import FindDataPage from "./sections/find-data";
import { Bus } from "lucide-react";
import BusinessCorner from "./sections/business-corner";


export default function Home() {
  return (
    <div className="flex flex-col ">
      <NewsSection />
      <LatestProductions />
      <LatestInfo />
      <Database />
      <FindDataPage />
      <BusinessCorner />
    </div>
  );
}
