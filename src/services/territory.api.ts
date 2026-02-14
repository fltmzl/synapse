import { db } from "@/firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  Timestamp,
  setDoc
} from "firebase/firestore";

export type Territory = {
  id: string;
  name: string;
  slug: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type CreateTerritoryPayload = {
  name: string;
};

export class TerritoryService {
  private static colName = "territories";
  private static colRef = collection(db, TerritoryService.colName);

  static async create(payload: CreateTerritoryPayload) {
    const { name } = payload;
    const id = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const docRef = doc(db, TerritoryService.colName, id);
    await setDoc(docRef, {
      name,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return {
      id,
      name,
      success: true,
      message: "Territory created successfully"
    };
  }

  static async getAll(): Promise<Territory[]> {
    const querySnapshot = await getDocs(TerritoryService.colRef);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Territory, "id">)
    }));
  }

  static async delete(id: string) {
    const docRef = doc(db, TerritoryService.colName, id);
    await deleteDoc(docRef);

    return {
      success: true,
      message: "Territory deleted successfully"
    };
  }
}
