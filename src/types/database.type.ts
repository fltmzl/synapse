export type StatItem = {
  value: string;
  label: string;
};

export type DatabaseRegionData = {
  image: string;
  stats: StatItem[];
};

export type DatabaseData = {
  [region: string]: DatabaseRegionData;
};
