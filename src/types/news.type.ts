export type NewsItem = {
  category: string;
  date: string;
  title: string;
  image: string;
};

export type NewsTabsHeader = {
  activeTab: string;
  setActiveTab: (value: string) => void;
  tabs: string[];
};

export type NewsData = {
  title: string;
  description: string;
  date: string;
  image: string;
}[];

export type CategoryNews = Record<string, NewsData>;

export type ProductionItem = {
  category: string;
  date: string;
  title: string;
  image: string;
};

export type ProductionCardProps = {
  data: ProductionItem;
  variant?: "desktop" | "mobile";
  className?: string;
};

export interface SocialPost {
  platform: "Instagram" | "X (Twitter)";
  username: string;
  contentMain: string;
  contentHighlight?: string;
  image: string;
  likes: number;
  comments?: number;
  retweets?: number;
}

export type LegalNewsItem = {
  category: string;
  territory: string;
  person: string;
  title: string;
  tags: string[];
  platform: string[];
  image: string;
  date: string;
  excerpt: string;
  place: string;
  publisher: string;
};
