import { Timestamp } from "firebase/firestore";

export type Article = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage?: string;
  tags?: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isPublished: boolean;
};

export type CreateArticleDto = {
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage?: string;
  tags?: string[];
  isPublished?: boolean;
};

export type UpdateArticleDto = Partial<CreateArticleDto>;
