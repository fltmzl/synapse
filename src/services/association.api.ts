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
  Association,
  CreateAssociationDto,
  UpdateAssociationDto
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

export class AssociationService {
  private static colName = "associations";
  private static colRef = collection(db, AssociationService.colName);

  static async create(payload: CreateAssociationDto) {
    const slug = generateSlug(payload.name);

    const docRef = await addDoc(AssociationService.colRef, {
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
      message: "Association created successfully"
    };
  }

  static async getAll(): Promise<Association[]> {
    const querySnapshot = await getDocs(AssociationService.colRef);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Association, "id">)
    }));
  }

  static async getById(id: string): Promise<Association | null> {
    const docRef = doc(db, AssociationService.colName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Association;
    }
    return null;
  }

  static async update({
    id,
    data
  }: {
    id: string;
    data: UpdateAssociationDto;
  }) {
    const docRef = doc(db, AssociationService.colName, id);

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
      message: "Association updated successfully"
    };
  }

  static async delete(id: string) {
    const docRef = doc(db, AssociationService.colName, id);
    await deleteDoc(docRef);

    return {
      success: true,
      message: "Association deleted successfully"
    };
  }
}
