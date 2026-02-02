export type Person = {
  name: string;
  title: string;
};

export type Structure = {
  name: string;
  type: string;
  code: string;
};

export type Contact = {
  phone: string;
  email: string;
  website: string;
  address: string;
};

export type CompanyDetails = {
  creation: string;
  salaries: string;
  chiffre_d_affaires: string;
  implantations: string;
  employees: string;
  revenue: string;
  location: string;
  id: string;
  industry: string;
  nafCode: string;
};

export type Company = {
  slug: string;
  name: string;
  sectors: string[];
  socials: { icon: string }[];
  details: CompanyDetails;
  contact: Contact;
  people: Person[];
  structures: Structure[];
};
