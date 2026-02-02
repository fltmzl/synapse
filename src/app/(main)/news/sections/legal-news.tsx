import SectionContainer from "@/components/container/section-container";
import FilterMultipleWithSearch from "@/components/filter-multiple-with-search";
import SelectSingleItem from "@/components/select-single-item";
import SectionTitle from "@/components/typography/section-title";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Maximize2, Minimize2 } from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useState } from "react";
import LegalCard from "../card/legal-news-card";
import SearchSocialNetwork from "../components/search-social-news";
import VideoReelItem from "../components/video-reel-item";
import { Spinner } from "@/components/spinner";
import { format } from "date-fns";
import { useVideoModal } from "../hooks/use-video-modal";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { label: "Nouveauté", value: "newest" },
  { label: "Durée", value: "duration" },
  { label: "Popularité", value: "popularity" },
  { label: "Pertinence", value: "relevance" }
];

import useCategories from "@/queries/use-categories";
import useInfiniteVideos from "@/queries/use-infinite-videos";
import usePersons from "@/queries/use-persons";
import useTerritories from "@/queries/use-territories";
import NoResult from "@/components/no-result";

export default function LegalNews() {
  const [query, setQuery] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [categories, setCategories] = useQueryState(
    "categories",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [territories, setTerritories] = useQueryState(
    "territories",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [persons, setPersons] = useQueryState(
    "persons",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsString.withDefault("newest")
  );

  const {
    data: videosData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteVideos({
    categories: categories.length > 0 ? categories : undefined,
    territories: territories.length > 0 ? territories : undefined,
    persons: persons.length > 0 ? persons : undefined,
    search: query || undefined,
    sortBy: sort || undefined,
    limit: 12
  });

  const videos = videosData?.pages.flatMap((page) => page.data) || [];

  const { data: categoriesData } = useCategories();
  const { data: territoriesData } = useTerritories();
  const { data: personsData } = usePersons();

  const {
    isOpen,
    setIsOpen,
    activeIndex,
    setActiveIndex,
    containerRef,
    handlePrev,
    handleNext
  } = useVideoModal(videos);

  const handleClearSearchAndFilter = () => {
    setQuery("");
    setCategories([]);
    setTerritories([]);
    setPersons([]);
    setSort("newest");
  };

  if (isOpen && videos) {
    return (
      <div className="fixed inset-0 z-50 bg-black/70 animate-in fade-in duration-300">
        <div
          ref={containerRef}
          className={cn(
            "h-full w-full overflow-y-scroll snap-y snap-mandatory hide-scrollbar mx-auto relative transition-all duration-300",
            isFullscreen ? "max-w-full" : "max-w-xl"
          )}
        >
          {videos.map((video, index) => (
            <div key={video.id} className="h-full w-full snap-start">
              <VideoReelItem video={video} isActive={index === activeIndex} />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-[60]">
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className="text-white bg-black/20 hover:bg-black/40 p-3 rounded-full transition backdrop-blur-sm disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            disabled={activeIndex === (videos?.length || 0) - 1}
            className="text-white bg-black/20 hover:bg-black/40 p-3 rounded-full transition backdrop-blur-sm disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>

        {/* Top Controls */}
        <div className="absolute top-6 left-6 right-6 z-[60] flex justify-between items-center pointer-events-none">
          {/* Back Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="pointer-events-auto text-white bg-black/20 hover:bg-black/40 p-2 rounded-full transition backdrop-blur-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-left"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="pointer-events-auto text-white bg-black/20 hover:bg-black/40 p-2 rounded-full transition backdrop-blur-sm"
          >
            {isFullscreen ? (
              <Minimize2 className="w-6 h-6" />
            ) : (
              <Maximize2 className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <SectionContainer className="px-4 py-6 lg:px-20 lg:py-20">
      <section id="content-media" className="flex flex-col max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-8 w-full">
          <div className="flex flex-col gap-8">
            <SectionTitle className="text-center">
              Actualité citoyenne
            </SectionTitle>
          </div>
          <div className="flex justify-center w-full">
            <SearchSocialNetwork onSearch={setQuery} />
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:gap-10 mt-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
            <div className="flex flex-col gap-3 w-full md:flex-row md:justify-between md:items-start">
              <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                <span className="text-md text-muted-foreground font-medium leading-[140%] tracking-[-0.01em] whitespace-nowrap">
                  Recherche par
                </span>

                <FilterMultipleWithSearch
                  buttonLabel="Catégorie"
                  setValue={setCategories}
                  value={categories}
                  placeholder="Entrez recherche…"
                  listItems={
                    categoriesData?.map((c) => ({
                      label: c.name,
                      value: c.name
                    })) || []
                  }
                />
                <FilterMultipleWithSearch
                  buttonLabel="Territoire"
                  setValue={setTerritories}
                  value={territories}
                  placeholder="Entrez recherche…"
                  listItems={
                    territoriesData?.map((t) => ({
                      label: t.name,
                      value: t.name
                    })) || []
                  }
                />
                <FilterMultipleWithSearch
                  buttonLabel="Personnalité"
                  setValue={setPersons}
                  value={persons}
                  placeholder="Entrez recherche…"
                  listItems={
                    personsData?.map((p) => ({
                      label: p.name,
                      value: p.name
                    })) || []
                  }
                />
              </div>

              <div className="flex items-center gap-4 justify-between">
                <span className="text-md font-medium leading-[140%] tracking-tighter whitespace-nowrap">
                  Filtrer par
                </span>
                <SelectSingleItem
                  listItems={SORT_OPTIONS}
                  selected={sort}
                  onChange={setSort}
                />
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Spinner className="text-primary" fontSize={40} />
            </div>
          ) : !videos?.length ? (
            <div>
              <NoResult
                title="Aucun résultat"
                description="Aucun résultat trouvé pour votre recherche"
              />
              <div className="flex justify-center -translate-y-24">
                <Button
                  className="mx-auto"
                  onClick={handleClearSearchAndFilter}
                >
                  Clear Search & Filter
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="lg:hidden">
                <div className="flex flex-col gap-4 sm:gap-4">
                  {videos?.map((video, idx) => (
                    <div
                      key={video.id}
                      className="w-full cursor-pointer"
                      onClick={() => {
                        setActiveIndex(idx);
                        setIsOpen(true);
                      }}
                    >
                      <LegalCard
                        title={video.title}
                        image={video.thumbnailUrl || ""}
                        tags={video.tags || []}
                        territory={video.territory}
                        excerpt={video.description}
                        place={video.place}
                        publisher={video.publisher}
                        date={format(video.createdAt.toDate(), "MMM dd, yyyy")}
                        category={video.category}
                        video={video.videoUrl}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-6" />
              </div>

              <div className="hidden lg:flex gap-4">
                {Array.from({ length: 4 }).map((_, colIndex) => (
                  <div key={colIndex} className="flex flex-col gap-4 flex-1">
                    {videos
                      .filter((_, index) => index % 4 === colIndex)
                      .map((video) => {
                        const originalIndex = videos.findIndex(
                          (v) => v.id === video.id
                        );
                        return (
                          <div
                            key={video.id}
                            className="w-full cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => {
                              setActiveIndex(originalIndex);
                              setIsOpen(true);
                            }}
                          >
                            <LegalCard
                              title={video.title}
                              image={video.thumbnailUrl || ""}
                              tags={video.tags || []}
                              territory={video.territory}
                              excerpt={video.description}
                              place={video.place}
                              publisher={video.publisher}
                              date={format(
                                video.createdAt.toDate(),
                                "MMM dd, yyyy"
                              )}
                              category={video.category}
                              video={video.videoUrl}
                            />
                          </div>
                        );
                      })}
                  </div>
                ))}
              </div>
              <div className="mt-12" />
            </>
          )}
        </div>

        {hasNextPage && (
          <div className="flex justify-center gap-3">
            <Button
              variant="outline"
              className="w-full lg:w-max px-6"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? (
                <Spinner fontSize={20} />
              ) : (
                <>
                  Plus de contenus
                  <ChevronDown className="size-5 text-foreground" />
                </>
              )}
            </Button>
          </div>
        )}
      </section>
    </SectionContainer>
  );
}
