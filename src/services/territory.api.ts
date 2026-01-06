import { db } from "@/firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";

export type Territory = {
  id: string;
  name: string;
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

    const docRef = await addDoc(TerritoryService.colRef, {
      name,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return {
      id: docRef.id,
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
