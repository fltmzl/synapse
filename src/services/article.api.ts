import { db } from "@/firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";
import {
  Article,
  CreateArticleDto,
  UpdateArticleDto
} from "@/types/article.type";

export class ArticleService {
  private static colName = "articles";
  private static colRef = collection(db, ArticleService.colName);

  static async getAll() {
    const querySnapshot = await getDocs(ArticleService.colRef);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as Article[];
  }

  static async getById(id: string) {
    const docRef = doc(db, ArticleService.colName, id);
    const docSnap = await getDoc(docRef);

    console.log(docSnap.data());

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Article;
    } else {
      return null;
    }
  }

  static async create(data: CreateArticleDto) {
    const docRef = await addDoc(ArticleService.colRef, {
      ...data,
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
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  }

  static async delete(id: string) {
    const docRef = doc(db, ArticleService.colName, id);
    await deleteDoc(docRef);
  }
}
