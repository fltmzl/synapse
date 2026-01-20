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
  Education,
  CreateEducationDto,
  UpdateEducationDto
} from "@/types/person-relation.type";

/**
 * Utility function to generate slug from name
 */
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/-+/g, "-"); // Replace multiple dashes with single dash
}

export class EducationService {
  private static colName = "educations";
  private static colRef = collection(db, EducationService.colName);

  static async create(payload: CreateEducationDto) {
    const slug = generateSlug(payload.name);

    const docRef = await addDoc(EducationService.colRef, {
      ...payload,
      slug,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return {
      id: docRef.id,
      ...payload,
      slug,
      success: true,
      message: "Education created successfully"
    };
  }

  static async getAll(): Promise<Education[]> {
    const querySnapshot = await getDocs(EducationService.colRef);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Education, "id">)
    }));
  }

  static async getById(id: string): Promise<Education | null> {
    const docRef = doc(db, EducationService.colName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Education;
    }
    return null;
  }

  static async update({ id, data }: { id: string; data: UpdateEducationDto }) {
    const docRef = doc(db, EducationService.colName, id);

    // Filter out undefined values
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cleanData: Record<string, any> = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    // Regenerate slug if name is updated
    if (data.name) {
      cleanData.slug = generateSlug(data.name);
    }

    await updateDoc(docRef, {
      ...cleanData,
      updatedAt: serverTimestamp()
    });

    return {
      success: true,
      message: "Education updated successfully"
    };
  }

  static async delete(id: string) {
    const docRef = doc(db, EducationService.colName, id);
    await deleteDoc(docRef);

    return {
      success: true,
      message: "Education deleted successfully"
    };
  }
}
