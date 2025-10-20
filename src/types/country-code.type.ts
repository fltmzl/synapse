export type CountryCode = {
  flags: Flags;
  name: Name;
  idd: Idd;
  cca2: string;
};

type Idd = {
  root: string;
  suffixes: string[];
};

type Name = {
  common: string;
  official: string;
  nativeName: NativeName;
};

type NativeName = {
  spa: Spa;
};

type Spa = {
  official: string;
  common: string;
};

type Flags = {
  png: string;
  svg: string;
  alt: string;
};
