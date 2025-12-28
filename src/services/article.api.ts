import { db } from "@/firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  updateDoc,
  where
} from "firebase/firestore";
import {
  Article,
  CreateArticleDto,
  SectionCategory,
  UpdateArticleDto
} from "@/types/article.type";

export class ArticleService {
  private static colName = "articles";
  private static colRef = collection(db, ArticleService.colName);

  static async getAll(sectionCategory?: SectionCategory) {
    let q = query(ArticleService.colRef);

    if (sectionCategory) {
      q = query(
        ArticleService.colRef,
        where("sectionCategory", "==", sectionCategory)
      );
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as Article[];
  }

  static async getById(id: string) {
    const docRef = doc(db, ArticleService.colName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Article;
    } else {
      return null;
    }
  }

  static async getBySlug(slug: string) {
    const docRef = query(
      ArticleService.colRef,
      where("slug", "==", slug),
      limit(1)
    );
    const docSnap = await getDocs(docRef);

    if (!docSnap.empty) {
      const doc = docSnap.docs[0];

      return {
        id: doc.id,
        ...doc.data()
      } as Article;
    } else {
      return null;
    }
  }

  static async create(data: CreateArticleDto) {
    // Filter out undefined values
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    const docRef = await addDoc(ArticleService.colRef, {
      ...cleanData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      isPublished: data.isPublished ?? false
    });

    return {
      id: docRef.id,
      ...data
    };
  }

  static async publish(id: string) {
    await this.update({
      id,
      data: { isPublished: true }
    });
  }

  static async unpublish(id: string) {
    await this.update({
      id,
      data: { isPublished: false }
    });
  }

  static async update({ id, data }: { id: string; data: UpdateArticleDto }) {
    const docRef = doc(db, ArticleService.colName, id);

    // Filter out undefined values
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    await updateDoc(docRef, {
      ...cleanData,
      updatedAt: serverTimestamp()
    });
  }

  static async delete(id: string) {
    const docRef = doc(db, ArticleService.colName, id);
    await deleteDoc(docRef);
  }
}
