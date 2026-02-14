import { Timestamp } from "firebase/firestore";

export type Jumbotron = {
  id: string;
  title: string;
  mediaType: "video" | "image";
  mediaUrl: string;
  thumbnailUrl?: string;
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type CreateJumbotronDto = {
  title: string;
  mediaType: "video" | "image";
  mediaUrl: string;
  thumbnailUrl?: string;
  isActive?: boolean;
};

export type UpdateJumbotronDto = Partial<CreateJumbotronDto>;
