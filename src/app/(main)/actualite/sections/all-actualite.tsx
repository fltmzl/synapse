import { useState } from "react";
import { NewsFilter } from "../components/news-filter";
import { SearchBar } from "../components/search-bar";
import { SortDropdown } from "../components/sort-dropdown";

export default function AllActualite() {
  const [category, setCategory] = useState("Tout");
  const [sort, setSort] = useState("Newest");
  const [query, setQuery] = useState("");
  return (
    <section className="bg-background px-4 py-5 lg:p-20 max-7xl border rounded-md">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl font-semibold text-center">Actualité</h1>

          <div className="flex justify-center">
            <SearchBar onSearch={setQuery} />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <NewsFilter selected={category} onSelect={setCategory} />
          <div className="flex items-center gap-4 ">
            <span className="text-md font-medium leading-[140%] tracking-tighter">
              Filtrer par
            </span>
            <SortDropdown selected={sort} onChange={setSort} />
          </div>
        </div>
        {/* 

        <div className="space-y-6">
          {filtered.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="outline">More articles</Button>
        </div> */}
      </div>
    </section>
  );
}
