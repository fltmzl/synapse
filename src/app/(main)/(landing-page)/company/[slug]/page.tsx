"use client";

import Link from "next/link";
import { ArrowLeftBoldIcon } from "@/icons/arrow-left-bold-icon";
import { Company } from "@/types/company.type";
import DetailInformation from "./card/detail-info";
import ContactCard from "./card/contact";
import PersonCard from "./card/person";
import StructureCard from "./card/structure";

export default function DetailCompany() {
  return (
    <section className="max-w-7xl mx-auto py-10 px-6 lg:px-10">
      <div className="mb-4">
        <Link
          href="#"
          className="flex items-center text-base font-medium leading-[140%] tracking-[-0.01em] text-primary hover:underline transition"
        >
          <ArrowLeftBoldIcon className="size-6 mr-[6px]" />
          Back to result
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <DetailInformation />
        <div className="lg:col-span-2 space-y-4">
          <ContactCard />
          <PersonCard />
          <StructureCard />
        </div>
      </div>
    </section>
  );
}
