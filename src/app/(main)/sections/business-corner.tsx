"use client";

import SectionTitle from "@/components/typography/section-title";
import { H4 } from "@/components/typography/h4";
import BusinessCard from "../components/card/business-card";
import BusinessForecast from "../components/card/forecast-card";
import BusinessForm from "../components/form/business-form";

export default function BusinessCorner() {
  return (
    <section className="bg-[var(--section)]">
      <div className="max-w-7xl mx-auto w-full px-6 py-12 lg:py-25 flex flex-col gap-10 lg:gap-16">
        {/* Header */}
        <div className="text-center lg:text-left">
          <SectionTitle>Le coin des affaires</SectionTitle>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-10">
          {/* LEFT 2 columns */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <H4 className="hover:text-primary hover:underline mb-6 inline-block">
                  Les opportunités de reprises
                </H4>
                <BusinessCard />
              </div>

              <div>
                <H4 className="hover:text-primary hover:underline mb-6 inline-block">
                  Les prévisions économiques
                </H4>
                <BusinessForecast />
              </div>
            </div>
          </div>

          {/* RIGHT: FORM */}
          <aside className="lg:col-span-1">
            <BusinessForm />
          </aside>
        </div>
      </div>
    </section>
  );
}
