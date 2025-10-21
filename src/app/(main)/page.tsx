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

// const productions = [
//   {
//     image: null,
//     category: "Economy",
//     date: "Sep 2, 2025",
//     title: "Economic Outlook: Antilles & Guyana 2030"
//   },
//   {
//     image: null,
//     category: "Society",
//     date: "Aug 25, 2025",
//     title: "Guadeloupe: Reforms & Institutional Evolution"
//   },
//   {
//     image: null,
//     category: "Law",
//     date: "Aug 10, 2025",
//     title: "Mayotte Labor Dynamics & Workforce Trends"
//   }
// ];

export default function Home() {
  return (
    <div className="flex flex-col ">
      <NewsSection />
      <LatestProductions />
      <LatestInfo />
      <Database />
      <FindDataPage />
    </div>
  );
}
