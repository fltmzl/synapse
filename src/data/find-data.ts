import {
  LayoutGrid,
  Database,
  FileSearch,
  Users,
  Newspaper,
  Gavel,
  User,
  Landmark,
  Building,
} from "lucide-react";
import { SourceItem, InfoOption } from "@/types/find-data.type";

// Source filter buttons
export const sources: SourceItem[] = [
  { name: "All", icon: LayoutGrid },
  { name: "Data", icon: Database },
  { name: "Rapport", icon: FileSearch },
  { name: "Réseaux sociaux", icon: Users },
  { name: "Media", icon: Newspaper },
  { name: "Légal", icon: Gavel },
];

// Cards “Looking for specific info?”
export const infoOptions: InfoOption[] = [
  {
    id: "person",
    title: "Je recherche un acteur",
    desc: "Annuaire des acteurs économiques, politiques et citoyens",
  },
  {
    id: "company",
    title: "Je recherche une structure",
    desc: "Informations relatives aux entreprises et organisations",
  },
  {
    id: "directory",
    title: "Je recherche une administration",
    desc: "Annuaire des services de l'Etat dans les Outre-Mer",
  },
];
