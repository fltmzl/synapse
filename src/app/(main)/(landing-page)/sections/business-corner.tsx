"use client";

import SectionTitle from "@/components/typography/section-title";
import { H4 } from "@/components/typography/h4";
import BusinessCard from "../components/card/business-card";
import BusinessForecast from "../components/card/forecast-card";
import BusinessForm from "../components/form/business-form";

export default function BusinessCorner() {
  return (
    <section className="bg-section">
      <div className="max-w-7xl mx-auto w-full px-6 xl:px-0 py-12 lg:py-25 flex flex-col gap-10 lg:gap-16">
        {/* Header */}
        <div className="text-center lg:text-left">
          <SectionTitle>Le coin des affaires</SectionTitle>
        </div>

        {/* Grid */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT 2 columns */}
          <div className="flex-1 flex flex-col">
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
          <aside className="flex-1 lg:max-w-96 xl:max-w-[470px]">
            <BusinessForm />
          </aside>
        </div>
      </div>
    </section>
  );
}
