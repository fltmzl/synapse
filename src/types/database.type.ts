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
