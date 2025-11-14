export type Enterprise = {
  structure: {
    name: string;
    image: string | null;
  };
  logo: string | null;
  name: string;
  representant: string;
  region: string;
  regionCode: string;
  affiliation: string;
  numberOfEmployees: number;
  creationYear: number;
};
