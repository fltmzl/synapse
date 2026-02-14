import { db } from "@/firebase/config";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
  writeBatch
} from "firebase/firestore";
import {
  Association,
  CreateAssociationDto,
  UpdateAssociationDto,
  AssociationDataFromExcelDto
} from "@/types/person-relation.type";
import { generateCode, CODE_PREFIXES } from "@/lib/code-generator";
import { syncAssociation, syncBatch } from "@/lib/neo4j-sync-client";
import { uniqueBySelector } from "@/app/dashboard/admin-panel/persons/utils";

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
    const code = payload.code || generateCode(CODE_PREFIXES.ASSOCIATION);

    await setDoc(doc(AssociationService.colRef, slug), {
      ...payload,
      code,
      slug,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    // Sync to Neo4j
    await syncAssociation("create", {
      id: slug,
      code,
      slug,
      ...payload
    });

    return {
      id: slug,
      ...payload,
      code,
      slug,
      success: true,
      message: "Association created successfully"
    };
  }

  static async createManyFromExcel(payload: AssociationDataFromExcelDto[]) {
    // 1. Extract unique territories from implantation names
    const uniqueTerritoryNames = uniqueBySelector(
      payload,
      (item) => item.address.implantation
    ).filter(Boolean);

    // 2. Upsert territories to Firestore
    if (uniqueTerritoryNames.length > 0) {
      const territoryBatch = writeBatch(db);
      uniqueTerritoryNames.forEach((name) => {
        const slug = generateSlug(name);
        const territoryRef = doc(db, "territories", slug);
        territoryBatch.set(
          territoryRef,
          {
            id: slug,
            name: name,
            slug: slug,
            updatedAt: serverTimestamp()
          },
          { merge: true }
        );
      });
      await territoryBatch.commit();
    }

    const mappedData = payload.map((item) => {
      const territorySlug = item.address.implantation
        ? generateSlug(item.address.implantation)
        : null;

      const slug = generateSlug(item.structure.structure_name);
      const id = item.identifier.id; // Use ID from Excel
      const code = id; // Code must be the same as ID

      return {
        id: id,
        name: item.structure.structure_name,
        implantation: item.address.implantation,
        territoryId: territorySlug,
        street: item.address.street,
        zipCode: item.address.zip_code,
        city: item.address.city,
        code: code,
        slug: slug,
        authorizedRepresentativeId: item.legal_representative.id,
        email: item.address.email,
        phone: item.address.phone,
        website: item.address.website,
        activity: item.address.activity,
        description: item.address.description,
        registrationCode: item.address.registration_code,
        action: {
          numberOfEmployees: Number(item.action.number_of_employees) || 0,
          numberOfMembers: Number(item.action.number_of_members) || 0,
          budget: Number(item.action.budget) || 0,
          cause: item.action.cause || "",
          mainProject: item.action.main_project || ""
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
    });

    const BATCH_SIZE = 450;
    const chunks = [];

    for (let i = 0; i < mappedData.length; i += BATCH_SIZE) {
      chunks.push(mappedData.slice(i, i + BATCH_SIZE));
    }

    console.log(
      `Processing ${payload.length} associations in ${chunks.length} batches.`
    );

    let successCount = 0;
    let failCount = 0;

    for (const [index, chunk] of chunks.entries()) {
      try {
        const batch = writeBatch(db);

        chunk.forEach((data) => {
          const docRef = doc(db, AssociationService.colName, data.id);
          batch.set(docRef, data, { merge: true });
        });

        await batch.commit();

        // Batch Sync to Neo4j
        await syncBatch(
          "association",
          chunk.map((data) => ({
            ...data,
            id: data.id,
            code: data.code,
            slug: data.slug
          }))
        ).catch((err) =>
          console.error("Neo4j Association Batch Sync Failed:", err)
        );

        successCount += chunk.length;
        console.log(
          `Association Batch ${index + 1}/${chunks.length} committed and synced successfully.`
        );
      } catch (error) {
        console.error(
          `Association Batch ${index + 1}/${chunks.length} failed:`,
          error
        );
        failCount += chunk.length;
      }
    }

    return {
      success: true,
      totalProcessed: payload.length,
      successCount,
      failCount,
      message: `Processed ${payload.length} associations. Success: ${successCount}, Failed: ${failCount}`
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

    // Get current association data for code
    const currentDoc = await getDoc(docRef);
    if (!currentDoc.exists()) {
      throw new Error("Association not found");
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
      await syncAssociation("update", {
        id,
        code: currentData.code,
        ...currentData,
        ...cleanData
      });
    }

    return {
      success: true,
      message: "Association updated successfully"
    };
  }

  static async delete(id: string) {
    const docRef = doc(db, AssociationService.colName, id);

    // Get association data for code before deleting
    const associationDoc = await getDoc(docRef);
    if (associationDoc.exists()) {
      const associationData = associationDoc.data();

      // Delete from Firestore
      await deleteDoc(docRef);

      // Sync to Neo4j
      if (associationData.code) {
        await syncAssociation("delete", { code: associationData.code });
      }
    }

    return {
      success: true,
      message: "Association deleted successfully"
    };
  }
}
