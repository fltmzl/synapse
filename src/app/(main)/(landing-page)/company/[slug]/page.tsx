"use client";

import Link from "next/link";
import { ArrowLeftBoldIcon } from "@/icons/arrow-left-bold-icon";
import DetailInformation from "./card/detail-info";
import ContactCard from "./card/contact";
import PersonCard from "./card/person";
import StructureCard from "./card/structure";
import useCompanyBySlug from "@/queries/use-company-by-slug";
import useCompanyPeople from "@/queries/use-company-people";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function DetailCompany() {
  const params = useParams();
  const slug = params.slug as string;

  const {
    data: company,
    isLoading: isLoadingCompany,
    isError: isErrorCompany
  } = useCompanyBySlug(slug);
  const { data: people, isLoading: isLoadingPeople } = useCompanyPeople(
    company?.id
  );

  if (isLoadingCompany) {
    return (
      <section className="max-w-7xl mx-auto py-10 px-6 lg:px-10 space-y-4">
        <Skeleton className="h-6 w-32" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Skeleton className="h-[600px] w-full" />
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-[300px] w-full" />
            <Skeleton className="h-[300px] w-full" />
          </div>
        </div>
      </section>
    );
  }

  if (isErrorCompany || !company) {
    return (
      <section className="max-w-7xl mx-auto py-10 px-6 lg:px-10">
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Company not found</h2>
          <p className="text-muted-foreground mt-2">
            The company you are looking for does not exist or has been removed.
          </p>
          <Link
            href="/company"
            className="text-primary hover:underline mt-4 inline-block"
          >
            Back to company directory
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto py-10 px-6 lg:px-10">
      <div className="mb-4">
        <Link
          href="/company"
          className="flex items-center text-base font-medium leading-[140%] tracking-[-0.01em] text-primary hover:underline transition"
        >
          <ArrowLeftBoldIcon className="size-6 mr-[6px]" />
          Back to result
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <DetailInformation company={company} />
        <div className="lg:col-span-2 space-y-4">
          <ContactCard company={company} />
          <PersonCard people={people || []} />
          <StructureCard structures={[]} />
        </div>
      </div>
    </section>
  );
}
