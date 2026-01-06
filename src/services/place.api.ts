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

export type Place = {
  id: string;
  name: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type CreatePlacePayload = {
  name: string;
};

export class PlaceService {
  private static colName = "places";
  private static colRef = collection(db, PlaceService.colName);

  static async create(payload: CreatePlacePayload) {
    const { name } = payload;

    const docRef = await addDoc(PlaceService.colRef, {
      name,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return {
      id: docRef.id,
      name,
      success: true,
      message: "Place created successfully"
    };
  }

  static async getAll(): Promise<Place[]> {
    const querySnapshot = await getDocs(PlaceService.colRef);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Place, "id">)
    }));
  }

  static async delete(id: string) {
    const docRef = doc(db, PlaceService.colName, id);
    await deleteDoc(docRef);

    return {
      success: true,
      message: "Place deleted successfully"
    };
  }
}
