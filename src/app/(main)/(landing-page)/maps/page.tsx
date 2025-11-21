import { ArrowLeftIcon } from "@/icons/arrow-left-icon";
import Link from "next/link";
import CompanyList from "./sections/company-list";
import InteractiveMap from "./sections/interactive-map";
import { Suspense } from "react";

export default function MapPage() {
  return (
    <Suspense fallback={null}>
      <div className="max-w-[1312px] mx-auto pt-12 pb-12 px-6 lg:px-0">
        <div className="mb-4">
          <Link
            href="/company"
            className="flex items-center text-primary gap-1.5"
          >
            <ArrowLeftIcon strokeWidth={2} className="mt-0.5" />
            <span>Back to Directory</span>
          </Link>
        </div>
        <div className="flex flex-col-reverse lg:flex-row gap-4 lg:h-[780px]">
          <div className="basis-[388px] h-full">
            <CompanyList />
          </div>
          <div className="flex-1">
            <InteractiveMap />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
