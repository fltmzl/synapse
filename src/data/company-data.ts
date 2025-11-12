import { Company } from "@/types/company.type";

export const companyData: Company = {
  slug: "groupe-bernard-hayot",
  name: "Groupe Bernard Hayot",
  sectors: ["Retail", "Distribution", "Automotive"],
  socials: [
    { icon: "whatsapp" },
    { icon: "facebook" },
    { icon: "twitter" },
    { icon: "linkedin" },
  ],
  details: {
    creation: "1960",
    salaries: "18,000+",
    chiffre_d_affaires: "4.0 Bn € (2024)",
    implantations: "Martinique, Guadeloupe, French Guiana",
    employees: ">18,000",
    revenue: "4,0 Mds € (2024)",
    location: "Le Lamentin, Martinique, French Overseas",
    id: "#A00001",
    industry: "Agroalimentaire",
    nafCode: "4639B",
  },
  contact: {
    phone: "+596 596 50 00 00",
    email: "contact@gbh.fr",
    website: "https://www.gbh.fr/",
    address: "Zone de la Lézarde, 97232 Le Lamentin, Martinique, France",
  },
  people: [
    { name: "Bernard Hayot", title: "Founder & CEO" },
    { name: "Stéphane Hayot", title: "Executive Director" },
    { name: "Claire Moreau", title: "Chief Financial Officer" },
    { name: "Marc Lemoine", title: "Head of Operations" },
    { name: "Isabelle Ford", title: "Strategic Advisor" },
    { name: "Rodolphe Hayot", title: "Board Member" },
    { name: "Anne Dupont", title: "Chief Marketing Officer" },
    { name: "Jean-Luc Martin", title: "Director of Legal Affairs" },
    { name: "Sophie Durand", title: "Head of Human Resources" },
  ],
  structures: [
    { name: "SAFO", type: "Affiliated group", code: "#CO002" },
    { name: "Carrefour Martinique", type: "Subsidiary", code: "#CO003" },
    { name: "Renault Martinique", type: "Subsidiary", code: "#CO005" },
    { name: "Decathlon Outre-Mer", type: "Partner (Retail)", code: "#CO004" },
  ],
};
