"use client";

import DataInsight from "./sections/data-insight";
import DataMaps from "./sections/maps";

export default function DatabasePage() {
  return (
    <section className="min-h-screen flex flex-col">
      {/* <DataMaps /> */}
      <DataInsight />
    </section>
  );
}
