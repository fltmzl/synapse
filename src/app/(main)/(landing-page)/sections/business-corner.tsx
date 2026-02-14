"use client";

import BusinessForm from "@/components/business-form";
import { H4 } from "@/components/typography/h4";
import { P } from "@/components/typography/paragraph";
import SectionTitle from "@/components/typography/section-title";
import BusinessSectionGroup from "../components/card/business-section-group";
import useArticles from "@/queries/use-articles";
import NewsCardSkeleton from "../components/skeletons/news-card-skeleton";
import NoResult from "@/components/no-result";

export default function BusinessCorner() {
  const { data: articles, isLoading } = useArticles({
    sectionCategory: "business_corner",
    isPublished: true
  });

  const leftArticles = articles?.slice(0, 3) || [];
  const rightArticles = articles?.slice(3, 6) || [];

  return (
    <section className="bg-section">
      <div
        id="business-corner-news"
        className="max-w-7xl mx-auto w-full px-6 xl:px-0 py-12 lg:py-25 flex flex-col gap-10 lg:gap-16 scroll-mt-20"
      >
        <div className="text-center lg:text-left">
          <SectionTitle>Le coin des affaires</SectionTitle>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 flex flex-col">
            {isLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <NewsCardSkeleton />
                <NewsCardSkeleton />
              </div>
            ) : articles && articles.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <BusinessSectionGroup articles={leftArticles} />
                <BusinessSectionGroup articles={rightArticles} />
              </div>
            ) : (
              <div className="flex h-full items-center justify-center border rounded-[12px] bg-background p-10">
                <NoResult
                  title="Aucune actualité"
                  description="Aucune actualité n'a été trouvée pour le moment."
                />
              </div>
            )}
          </div>

          <aside
            id="service-complementaires"
            className="flex-1 lg:max-w-96 xl:max-w-[470px] scroll-mt-20"
          >
            <div className="p-6 border rounded-[12px] bg-background flex flex-col gap-6 h-fit">
              <div className="flex flex-col gap-3">
                <H4>Services complémentaires</H4>
                <P>
                  Je souhaite un chiffrage pour la réalisation d&apos;une
                  prestation par Synapse
                </P>
              </div>
              <BusinessForm />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
