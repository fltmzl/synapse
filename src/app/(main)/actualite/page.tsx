"use client";

import { useState } from "react";
import { SearchBar } from "./components/search-bar";
import { NewsFilter } from "./components/news-filter";
import { SortDropdown } from "./components/sort-dropdown";
import AllActualite from "./sections/all-actualite";
export default function ActualitePage() {
  //   const filtered = dummyNews
  //     .filter((n) =>
  //       category === "Tout"
  //         ? true
  //         : n.category.toLowerCase() === category.toLowerCase()
  //     )
  //     .filter((n) => n.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <section className="bg-muted min-h-screen p-4 ">
      <AllActualite />
    </section>
  );
}
