import { db } from "@/firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch
} from "firebase/firestore";
import {
  Jumbotron,
  CreateJumbotronDto,
  UpdateJumbotronDto
} from "@/types/jumbotron.type";

export class JumbotronService {
  private static colName = "jumbotrons";
  private static colRef = collection(db, JumbotronService.colName);

  /**
   * Get all jumbotrons ordered by creation date
   */
  static async getAll(): Promise<Jumbotron[]> {
    const q = query(JumbotronService.colRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as Jumbotron
    );
  }

  /**
   * Get the currently active jumbotron
   */
  static async getActive(): Promise<Jumbotron | null> {
    const q = query(JumbotronService.colRef, where("isActive", "==", true));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Jumbotron;
  }

  /**
   * Create a new jumbotron. If isActive is true, deactivate all others.
   */
  static async create(data: CreateJumbotronDto): Promise<Jumbotron> {
    if (data.isActive) {
      await JumbotronService.deactivateAll();
    }

    const docRef = await addDoc(JumbotronService.colRef, {
      ...data,
      isActive: data.isActive ?? false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return {
      id: docRef.id,
      ...data,
      isActive: data.isActive ?? false
    } as Jumbotron;
  }

  /**
   * Update a jumbotron. If setting isActive to true, deactivate all others.
   */
  static async update(id: string, data: UpdateJumbotronDto): Promise<void> {
    if (data.isActive) {
      await JumbotronService.deactivateAll();
    }

    const docRef = doc(db, JumbotronService.colName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  }

  /**
   * Delete a jumbotron
   */
  static async delete(id: string): Promise<void> {
    const docRef = doc(db, JumbotronService.colName, id);
    await deleteDoc(docRef);
  }

  /**
   * Set a specific jumbotron as active (deactivates all others)
   */
  static async setActive(id: string): Promise<void> {
    await JumbotronService.deactivateAll();
    const docRef = doc(db, JumbotronService.colName, id);
    await updateDoc(docRef, {
      isActive: true,
      updatedAt: serverTimestamp()
    });
  }

  /**
   * Deactivate all jumbotrons
   */
  private static async deactivateAll(): Promise<void> {
    const q = query(JumbotronService.colRef, where("isActive", "==", true));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return;

    const batch = writeBatch(db);
    snapshot.docs.forEach((docSnap) => {
      batch.update(docSnap.ref, {
        isActive: false,
        updatedAt: serverTimestamp()
      });
    });
    await batch.commit();
  }
}
