export type NewsItem = {
  id?: string;
  slug: string;
  category: string;
  date: string;
  title: string;
  author: string;
  images: string[] | null;
  content: string;
  description: string;
};

export type productionDataType = {
  category: string;
  date: string;
  title: string;
  image: string;
};

export type NewsData = {
  title: string;
  description: string;
  date: string;
  image: string;
  category: string;
}[];

export type CategoryNews =
  | "Politique"
  | "Juridique"
  | "Citoyenne"
  | "Economique";

// export type CategoryNews = {
//   category: "politique" | "juridique" | "citoyenne" | "économique";
//   title: string;
//   description: string;
//   date: string;
//   image: string;
// };

export type SocialPost = {
  platform: "Instagram" | "X (Twitter)";
  username: string;
  contentMain: string;
  contentHighlight?: string;
  image: string;
  likes: number;
  comments?: number;
  retweets?: number;
};

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
