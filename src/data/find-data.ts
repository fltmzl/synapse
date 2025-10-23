import { SourceItem, InfoOption } from "@/types/find-data.type";
import { ReportSearchIcon } from "@/icons/report-search-icon";
import { LayoutGridIcon } from "@/icons/layout-grid-icon";
import { DatabaseIcon } from "@/icons/database-icon";
import { UsersIcon } from "@/icons/users-icon";
import { NewsIcon } from "@/icons/news-icon";
import { GavelIcon } from "@/icons/gavel-icon";

// Source filter buttons
export const sources: SourceItem[] = [
  { name: "All", icon: LayoutGridIcon },
  { name: "Data", icon: DatabaseIcon },
  { name: "Rapport", icon: ReportSearchIcon },
  { name: "Réseaux sociaux", icon: UsersIcon },
  { name: "Media", icon: NewsIcon },
  { name: "Légal", icon: GavelIcon }
];

// Cards “Looking for specific info?”
export const infoOptions: InfoOption[] = [
  {
    id: "person",
    title: "Je recherche un acteur",
    desc: "Annuaire des acteurs économiques, politiques et citoyens"
  },
  {
    id: "company",
    title: "Je recherche une structure",
    desc: "Informations relatives aux entreprises et organisations"
  },
  {
    id: "directory",
    title: "Je recherche une administration",
    desc: "Annuaire des services de l'Etat dans les Outre-Mer"
  }
];
