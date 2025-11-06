export type StatItem = {
  value: string;
  label: string;
};

export type DatabaseRegionData = {
  id: string;
  title: string;
  image: string;
  stats: StatItem[];
};

export type DatabaseData = DatabaseRegionData[];

export type Message = {
  sender: "user" | "ai";
  text: string;
  fileName?: string;
  fileUrl?: string;
  sourceName?: string;
  sourceUrl?: string;
};
