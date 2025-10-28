"use client";

import BusinessCorner from "./sections/business-corner";
import Database from "./sections/database";
import FindDataPage from "./sections/find-data";
import LatestInfo from "./sections/latest-info";
import LatestProductions from "./sections/latest-prod";
import NewsSection from "./sections/news";

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
