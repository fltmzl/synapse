import { Timestamp } from "firebase/firestore";
import { Role } from "./role.type";

export type User = {
  uid: string;
  id?: string;
  phoneNumber?: string;
  firstName: string;
  lastName?: string;
  email: string;
  createdAt: Timestamp;
  role: Role;
  createdBy?: string;
  companyId?: string;
  photoURL?: string;
  countryCode?: string;
  lastLoginAt?: Timestamp;
  settings?: {
    newResourceDrops?: boolean;
    ongoingProgramEmails?: boolean;
  };
};
