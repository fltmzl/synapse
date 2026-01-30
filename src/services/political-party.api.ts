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
  PoliticalParty,
  CreatePoliticalPartyDto,
  UpdatePoliticalPartyDto
} from "@/types/person-relation.type";
import { generateCode, CODE_PREFIXES } from "@/lib/code-generator";
import { syncPoliticalParty } from "@/lib/neo4j-sync-client";

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

export class PoliticalPartyService {
  private static colName = "political_parties";
  private static colRef = collection(db, PoliticalPartyService.colName);

  static async create(payload: CreatePoliticalPartyDto) {
    const slug = generateSlug(payload.name);
    const code = payload.code || generateCode(CODE_PREFIXES.POLITICAL_PARTY);

    const docRef = await addDoc(PoliticalPartyService.colRef, {
      ...payload,
      code,
      slug,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    // Sync to Neo4j
    await syncPoliticalParty("create", {
      id: docRef.id,
      code,
      slug,
      ...payload
    });

    return {
      id: docRef.id,
      ...payload,
      code,
      slug,
      success: true,
      message: "Political Party created successfully"
    };
  }

  static async getAll(): Promise<PoliticalParty[]> {
    const querySnapshot = await getDocs(PoliticalPartyService.colRef);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<PoliticalParty, "id">)
    }));
  }

  static async getById(id: string): Promise<PoliticalParty | null> {
    const docRef = doc(db, PoliticalPartyService.colName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as PoliticalParty;
    }
    return null;
  }

  static async update({
    id,
    data
  }: {
    id: string;
    data: UpdatePoliticalPartyDto;
  }) {
    const docRef = doc(db, PoliticalPartyService.colName, id);

    // Get current political party data for code
    const currentDoc = await getDoc(docRef);
    if (!currentDoc.exists()) {
      throw new Error("Political Party not found");
    }
    const currentData = currentDoc.data();

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

    // Sync to Neo4j
    if (currentData.code) {
      await syncPoliticalParty("update", {
        id,
        code: currentData.code,
        ...currentData,
        ...cleanData
      });
    }

    return {
      success: true,
      message: "Political Party updated successfully"
    };
  }

  static async delete(id: string) {
    const docRef = doc(db, PoliticalPartyService.colName, id);

    // Get political party data for code before deleting
    const partyDoc = await getDoc(docRef);
    if (partyDoc.exists()) {
      const partyData = partyDoc.data();

      // Delete from Firestore
      await deleteDoc(docRef);

      // Sync to Neo4j
      if (partyData.code) {
        await syncPoliticalParty("delete", { code: partyData.code });
      }
    }

    return {
      success: true,
      message: "Political Party deleted successfully"
    };
  }
}
