import { Card } from "@/components/ui/card";
import { companies } from "@/data/company-map-data";
import CompanyItem from "../components/company-item";
import SearchFilterCompany from "../components/search-filter-company";

export default function CompanyList() {
  return (
    <Card className="p-0 h-full">
      <div className="pt-4 px-4 hidden lg:block">
        <SearchFilterCompany />
      </div>
      <div className="h-full max-h-[728px] overflow-auto scrollbar-custom scrollbar-custom-secondary">
        {companies.map((company, index) => (
          <CompanyItem
            key={index}
            image=""
            name={company.name}
            description={company.description}
            location={company.location}
            link={company.link}
            latitude={company.latitude}
            longitude={company.longitude}
          />
        ))}
      </div>
    </Card>
  );
}
