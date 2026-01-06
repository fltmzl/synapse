import { Timestamp } from "firebase/firestore";

export type Video = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string;
  territory?: string;
  place?: string;
  publisher?: string;
  category?: string;
  person?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;

  /** Analytics */
  viewCount: number;
  shareCount: number;
  engagementScore: number;
  tags?: string[];
};

export type CreateVideoDto = {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string;
  territory?: string;
  place?: string;
  publisher?: string;
  category?: string;
  person?: string;
  tags?: string[];
};

export type UpdateVideoDto = Partial<CreateVideoDto>;
