"use client";

import NewsSection from "./sections/news";
import LatestProductions from "./sections/latest-prod";
import LatestInfo from "./sections/latest-info";
import Database from "./sections/database";
import FindDataPage from "./sections/find-data";
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
