export type EmploymentType =
  | "Full time"
  | "Part time"
  | "Contract"
  | "Internship"
  | "Freelance"
  | "Seasonal";

export type ExperienceRole = {
  title: string;
  startDate: string;
  endDate: string | null;
  description: string | null;
};
