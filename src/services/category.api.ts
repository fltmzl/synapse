import { db } from "@/firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  Timestamp,
  getCountFromServer,
  query,
  where,
  setDoc
} from "firebase/firestore";

export type Category = {
  id: string;
  name: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type CategoryWithCount = Category & {
  totalArticles: number;
};

export type CreateCategoryPayload = {
  name: string;
};

export class CategoryService {
  private static colName = "categories";
  private static colRef = collection(db, CategoryService.colName);

  static async create(payload: CreateCategoryPayload) {
    const { name } = payload;
    const id = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const categoryRef = doc(db, CategoryService.colName, id);
    await setDoc(categoryRef, {
      name,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return {
      id,
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

  static async getAllWithTotalArticles(): Promise<CategoryWithCount[]> {
    const categories = await this.getAll();
    const articlesCol = collection(db, "articles");

    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const q = query(
          articlesCol,
          where("category", "==", category.name),
          where("sectionCategory", "==", "news"),
          where("isPublished", "==", true)
        );
        const snapshot = await getCountFromServer(q);
        return {
          ...category,
          totalArticles: snapshot.data().count
        };
      })
    );

    return categoriesWithCount.filter((cat) => cat.totalArticles > 0);
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
