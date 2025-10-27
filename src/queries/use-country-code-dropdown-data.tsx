import { QUERIES } from "@/constants/queries.constant";
import { CountryCodeService } from "@/services/country-code.api";
import { useQuery } from "@tanstack/react-query";

export default function useCountryCodeDropdownData() {
  return useQuery({
    queryFn: CountryCodeService.getAll,
    queryKey: [QUERIES.COUNTRY_CODES],
    select: (data) => CountryCodeService.mapCountryToSelectOptions(data)
  });
}
