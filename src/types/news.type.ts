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
}

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
}

export type ProductionCardProps =  {
  data: ProductionItem;
  variant?: "desktop" | "mobile";
  className?: string;
}