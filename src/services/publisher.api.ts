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

export type Publisher = {
  id: string;
  name: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type CreatePublisherPayload = {
  name: string;
};

export class PublisherService {
  private static colName = "publishers";
  private static colRef = collection(db, PublisherService.colName);

  static async create(payload: CreatePublisherPayload) {
    const { name } = payload;

    const docRef = await addDoc(PublisherService.colRef, {
      name,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return {
      id: docRef.id,
      name,
      success: true,
      message: "Publisher created successfully"
    };
  }

  static async getAll(): Promise<Publisher[]> {
    const querySnapshot = await getDocs(PublisherService.colRef);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Publisher, "id">)
    }));
  }

  static async delete(id: string) {
    const docRef = doc(db, PublisherService.colName, id);
    await deleteDoc(docRef);

    return {
      success: true,
      message: "Publisher deleted successfully"
    };
  }
}
