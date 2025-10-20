import { CountryCode } from "@/types/country-code.type";
import axios from "axios";

export class CountryCodeService {
  static async getAll() {
    const res = await axios.get<CountryCode[]>(
      "https://restcountries.com/v3.1/all?fields=name,flags,codes,idd,cca2,independent"
    );

    return res.data;
  }

  public static mapCountryToSelectOptions(countries: CountryCode[]) {
    return countries
      .filter(
        (country) =>
          country.idd &&
          country.idd.root &&
          Array.isArray(country.idd.suffixes) &&
          country.idd.suffixes.length > 0
      )
      .map((country) => {
        const { name, cca2, idd, flags } = country;

        let dialCode = idd.root;
        if (idd.suffixes.length === 1) {
          dialCode += idd.suffixes[0]; // e.g., "+6" + "2" => "+62"
        }

        return {
          label: `${name.common} (${dialCode})`,
          value: dialCode,
          code: cca2,
          flag: flags.svg || flags.png
        };
      });
  }
}
