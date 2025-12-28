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

export type Category = {
  id: string;
  name: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type CreateCategoryPayload = {
  name: string;
};

export class CategoryService {
  private static colName = "categories";
  private static colRef = collection(db, CategoryService.colName);

  static async create(payload: CreateCategoryPayload) {
    const { name } = payload;

    const categoryRef = await addDoc(CategoryService.colRef, {
      name,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return {
      id: categoryRef.id,
      name,
      success: true,
      message: "Category created successfully"
    };
  }

  static async getAll(): Promise<Category[]> {
    const querySnapshot = await getDocs(CategoryService.colRef);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Category, "id">)
    }));
  }

  static async delete(id: string) {
    const categoryRef = doc(db, CategoryService.colName, id);
    await deleteDoc(categoryRef);

    return {
      success: true,
      message: "Category deleted successfully"
    };
  }
}
