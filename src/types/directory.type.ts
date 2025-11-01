export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
}

export interface Representative {
  name: string;
  title?: string;
  email?: string;
  phone?: string;
  bio?: string;
  avatar?: string;
}

export interface DirectoryItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  territory: string;
  year?: number;
  pic?: string;
  image: string;
  description?: string;
  address?: string;
  contact?: ContactInfo;
  representative?: Representative;
}
