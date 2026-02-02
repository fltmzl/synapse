"use client";

import Link from "next/link";
import { CompanyWithDetails } from "@/types/person-relation.type";
import { ArrowLeftBoldIcon } from "@/icons/arrow-left-bold-icon";
import DetailInformation from "../card.tsx/detail-info";
import DescriptionCard from "../card.tsx/descriptif";
import ContactCard from "../card.tsx/contact";
import RepresentantCard from "../card.tsx/representant";

export default function DetailDirectorySection({ slug }: { slug: string }) {
  return (
    <section className="max-w-7xl mx-auto py-10 px-6 lg:px-10">
      <div className="mb-4">
        <Link
          href="/explore-directory"
          className="flex items-center text-base font-medium leading-[140%] tracking-[-0.01em] text-primary hover:underline transition"
        >
          <ArrowLeftBoldIcon className="size-6 mr-[6px]" />
          Back to result
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <DetailInformation />

        <div className="lg:col-span-2 space-y-4">
          <DescriptionCard />

          <ContactCard />

          <RepresentantCard />
        </div>
      </div>
    </section>
  );
}
