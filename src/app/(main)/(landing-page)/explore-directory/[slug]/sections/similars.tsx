"use client";

import { ArrowLeftIcon } from "@/icons/arrow-left-icon";
import { ArrowRightIcon } from "@/icons/arrow-right-icon";
import useCompanies from "@/queries/use-companies";
import { useRef } from "react";
import CompanyCard, {
  CompanyCardSkeleton
} from "../../components/company-card";

export default function AdministrationSimilars() {
  // separate refs for desktop and mobile
  const { data: companiesResponse, isLoading } = useCompanies({
    pageSize: 6,
    page: 0
  });
  const companies = companiesResponse?.data ?? [];
  const scrollRefDesktop = useRef<HTMLDivElement>(null);
  const scrollRefMobile = useRef<HTMLDivElement>(null);

  if (isLoading) {
    return (
      <section className="bg-white px-5 py-24 flex flex-col items-center">
        <div className="flex justify-between items-center w-full max-w-[1240px] 3xl:max-w-[1400px] mb-8">
          <h2 className="text-3xl font-medium tracking-tight">Similars</h2>
        </div>
        <div className="w-full max-w-[1240px] 3xl:max-w-[1400px] hidden lg:flex gap-4 overflow-x-auto hide-scrollbar">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="min-w-full lg:min-w-[405px]">
              <CompanyCardSkeleton />
            </div>
          ))}
        </div>
        <div className="w-full lg:hidden flex gap-4 overflow-x-auto hide-scrollbar">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="min-w-[90%] md:min-w-[45%]">
              <CompanyCardSkeleton />
            </div>
          ))}
        </div>
      </section>
    );
  }

  const scrollDesktop = (direction: "left" | "right") => {
    if (!scrollRefDesktop.current) return;
    const scrollAmount = 350;
    scrollRefDesktop.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  const scrollMobile = (direction: "left" | "right") => {
    if (!scrollRefMobile.current) return;

    const el = scrollRefMobile.current;
    const pageWidth = el.clientWidth;
    el.scrollBy({
      left: direction === "left" ? -pageWidth : pageWidth,
      behavior: "smooth"
    });
  };

  return (
    <section className="bg-background">
      <div
        className="py-12 lg:py-20 px-6 lg:pl-20 h-full
        3xl:items-center 3xl:pl-0 "
      >
        <div className="3xl:max-w-[1400px] 3xl:mx-auto hidden lg:flex items-center justify-between mb-10">
          <h1 className="text-[28px] leading-[130%] tracking-[-0.02em] lg:text-[40px] font-medium lg:leading-[110%] lg:tracking-[-0.03em]">
            Administration similaire
          </h1>

          <div className="flex gap-3">
            <button
              onClick={() => scrollDesktop("left")}
              className="p-2 border rounded-full hover:bg-muted transition"
              aria-label="Scroll left"
            >
              <ArrowLeftIcon className="size-5 text-muted-foreground" />
            </button>
            <button
              onClick={() => scrollDesktop("right")}
              className="p-2 border rounded-full hover:bg-muted transition"
              aria-label="Scroll right"
            >
              <ArrowRightIcon className="size-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:hidden mb-6">
          <h1 className="text-[24px] font-medium mb-4">
            Administration similaire
          </h1>
        </div>

        <div
          ref={scrollRefDesktop}
          className="3xl:max-w-[1400px] 3xl:mx-auto hidden lg:flex gap-4 overflow-x-auto hide-scrollbar scroll-smooth pr-0 mr-0"
        >
          {companies.map((company, index) => (
            <div key={index} className="min-w-full lg:min-w-[405px]">
              <CompanyCard
                key={index}
                slug={company.slug}
                name={company.name}
                category={company.category?.name || "-"}
                territory={company.territory?.name || "-"}
                authorizedRepresentative={
                  company.authorizedRepresentative?.name || "-"
                }
                socials={{
                  facebook: company.socials?.facebook,
                  instagram: company.socials?.instagram,
                  linkedin: company.socials?.linkedin
                }}
              />
            </div>
          ))}
        </div>

        <div className="flex lg:hidden flex-col">
          <div
            ref={scrollRefMobile}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar scroll-smooth w-full"
          >
            {Array.from({
              length: Math.ceil((companies?.length || 0) / 2)
            }).map((_, index) => {
              const start = index * 2;
              const pair = companies?.slice(start, start + 2);
              return (
                <div
                  key={index}
                  className="snap-center flex-shrink-0 w-full flex flex-col gap-4"
                >
                  {pair?.map((company, index) => (
                    <div key={index} className="min-w-full lg:min-w-[405px]">
                      <CompanyCard
                        key={index}
                        slug={company.slug}
                        name={company.name}
                        category={company.category?.name || "-"}
                        territory={company.territory?.name || "-"}
                        authorizedRepresentative={
                          company.authorizedRepresentative?.name || "-"
                        }
                        socials={{
                          facebook: company.socials?.facebook,
                          instagram: company.socials?.instagram,
                          linkedin: company.socials?.linkedin
                        }}
                      />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => scrollMobile("left")}
              className="p-3 border rounded-full hover:bg-muted transition"
              aria-label="Scroll left"
            >
              <ArrowLeftIcon className="size-5 text-muted-foreground" />
            </button>
            <button
              onClick={() => scrollMobile("right")}
              className="p-3 border rounded-full hover:bg-muted transition"
              aria-label="Scroll right"
            >
              <ArrowRightIcon className="size-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
