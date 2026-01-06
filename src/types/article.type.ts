import { QueryDocumentSnapshot, Timestamp } from "firebase/firestore";

export type SectionCategory =
  | "top_of_the_day"
  | "latest_publication"
  | "news"
  | "business_corner";

export type Article = {
  id: string;
  title: string;
  searchKeywords?: string[];
  slug: string;
  summary: string;
  content: string;
  coverImage?: string;
  tags?: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isPublished: boolean;
  sectionCategory?: SectionCategory;
  category?: string;

  /** Analytics & Engagement */
  viewCount: number;
  shareCount: number;
  bookmarkCount: number;
  readTimeAvg: number;

  engagementScore: number; // combined score: view + share + bookmark + read time

  publishedAt?: Timestamp; // timestamp saat pertama kali dipublish
};

export type CreateArticleDto = {
  title: string;
  searchKeywords?: string[];
  slug: string;
  summary: string;
  content: string;
  coverImage?: string;
  tags?: string[];
  isPublished: boolean;
  sectionCategory?: SectionCategory;
  category?: string;

  viewCount: number;
  shareCount: number;
  bookmarkCount: number;
  readTimeAvg: number;

  engagementScore: number;

  publishedAt?: Timestamp;
};

export type UpdateArticleDto = Partial<CreateArticleDto>;

export type ArticleSortOption =
  | "newest"
  | "duration"
  | "popularity"
  | "relevance";

export type ArticleQueryOptions = {
  sectionCategory?: SectionCategory;
  category?: string;
  limit?: number;
  isPublished?: boolean;
  search?: string;
  sortBy?: ArticleSortOption;
  lastVisible?: QueryDocumentSnapshot;
};
