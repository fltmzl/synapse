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

export type Person = {
  id: string;
  name: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type CreatePersonPayload = {
  name: string;
};

export class PersonService {
  private static colName = "persons";
  private static colRef = collection(db, PersonService.colName);

  static async create(payload: CreatePersonPayload) {
    const { name } = payload;

    const docRef = await addDoc(PersonService.colRef, {
      name,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return {
      id: docRef.id,
      name,
      success: true,
      message: "Person created successfully"
    };
  }

  static async getAll(): Promise<Person[]> {
    const querySnapshot = await getDocs(PersonService.colRef);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Person, "id">)
    }));
  }

  static async delete(id: string) {
    const docRef = doc(db, PersonService.colName, id);
    await deleteDoc(docRef);

    return {
      success: true,
      message: "Person deleted successfully"
    };
  }
}
