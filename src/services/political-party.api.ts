import { db } from "@/firebase/config";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  Timestamp as FirestoreTimestamp,
  updateDoc,
  writeBatch
} from "firebase/firestore";
import {
  PoliticalParty,
  CreatePoliticalPartyDto,
  UpdatePoliticalPartyDto,
  PoliticalPartyDataFromExcelDto,
  PoliticalPartyPersonRelationsFromExcelDto
} from "@/types/person-relation.type";
import { generateCode, CODE_PREFIXES } from "@/lib/code-generator";
import {
  syncBatch,
  syncPoliticalParty,
  syncRelationship
} from "@/lib/neo4j-sync-client";
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

export class PoliticalPartyService {
  private static colName = "political_parties";
  private static colRef = collection(db, PoliticalPartyService.colName);

  static async create(payload: CreatePoliticalPartyDto) {
    const prefixId = "PP_";
    const slug = generateSlug(payload.name);
    const id = prefixId + slug; // Document ID is the slug
    const code = id; // Code must be the same as ID as requested

    // Filter out undefined values
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataToSave: Record<string, any> = {
      ...payload,
      code,
      slug,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    if (payload.dateOfCreation) {
      dataToSave.dateOfCreation = FirestoreTimestamp.fromDate(
        payload.dateOfCreation
      );
    }

    // Filter out undefined values
    const cleanData = Object.fromEntries(
      Object.entries(dataToSave).filter(([_, v]) => v !== undefined)
    );

    await setDoc(doc(PoliticalPartyService.colRef, slug), cleanData);

    // Sync to Neo4j
    await syncPoliticalParty("create", {
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
      message: "Political Party created successfully"
    };
  }

  static async createManyFromExcel(payload: PoliticalPartyDataFromExcelDto[]) {
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

      const slug = generateSlug(item.structure.political_party);
      const id = item.identifier.id; // Use ID from Excel
      const code = id; // Code must be the same as ID as requested

      return {
        id: id,
        name: item.structure.political_party,
        implantation: item.address.implantation,
        territoryId: territorySlug,
        address: item.address.street,
        zipCode: item.address.zip_code,
        city: item.address.city,
        code: code,
        slug: slug,
        authorizedRepresentativeId: item.legal_representative.id,
        email: item.address.email,
        phone: item.address.phone,
        website: item.address.website,
        dateOfCreation: item.address.date_of_creation,
        description: item.address.description,
        registrationCode: item.address.registration_code,
        members: {
          numberOfMembers: Number(item.members.number_of_members) || 0,
          numberOfCandidates: Number(item.members.number_of_candidates) || 0,
          numberOfElected: Number(item.members.number_of_elected) || 0
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
      `Processing ${payload.length} items in ${chunks.length} batches.`
    );

    let successCount = 0;
    let failCount = 0;

    for (const [index, chunk] of chunks.entries()) {
      try {
        const batch = writeBatch(db);

        chunk.forEach((data) => {
          const docRef = doc(db, PoliticalPartyService.colName, data.id);
          batch.set(docRef, data, { merge: true });
        });

        await batch.commit();

        // Batch Sync to Neo4j
        await syncBatch(
          "political_party",
          chunk.map((data) => ({
            ...data,
            id: data.id,
            code: data.code,
            slug: data.slug
          }))
        ).catch((err) =>
          console.error("Neo4j Political Party Batch Sync Failed:", err)
        );

        successCount += chunk.length;
        console.log(
          `Batch ${index + 1}/${chunks.length} committed and synced successfully.`
        );
      } catch (error) {
        console.error(`Batch ${index + 1}/${chunks.length} failed:`, error);
        failCount += chunk.length;
      }
    }

    return {
      success: true,
      totalProcessed: payload.length,
      successCount,
      failCount,
      message: `Processed ${payload.length} items. Success: ${successCount}, Failed: ${failCount}`
    };
  }

  static async createManyRelationsFromExcel(
    payload: PoliticalPartyPersonRelationsFromExcelDto[]
  ) {
    const BATCH_SIZE = 450;
    const chunks = [];

    for (let i = 0; i < payload.length; i += BATCH_SIZE) {
      chunks.push(payload.slice(i, i + BATCH_SIZE));
    }

    let successCount = 0;
    let failCount = 0;

    for (const [index, chunk] of chunks.entries()) {
      try {
        const batch = writeBatch(db);

        // Fetch all necessary codes in parallel for the chunk if needed,
        // but typically Excel has the codes or IDs.
        // For simplicity and matching company-person flow:
        for (const item of chunk) {
          const personCode = item.relation.person;
          const partyCode = item.relation.political_party;
          const title = item.relation.nature_of_the_link;
          const relationType = "supports"; // "supports" | "opposes"

          const id = `${personCode}_${partyCode}`;
          const docRef = doc(db, "political_party_person", id);

          batch.set(docRef, {
            personId: personCode, // Assuming code is used as ID or we have ID
            politicalPartyId: partyCode,
            type: relationType,
            title: title,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });

          // Sync individual relationship to Neo4j
          await syncRelationship("create", relationType.toUpperCase(), {
            personCode,
            partyCode: partyCode,
            type: relationType,
            title: title,
            isCurrent: true
          }).catch((err) =>
            console.error("Neo4j relationship sync failed:", err)
          );
        }

        await batch.commit();
        successCount += chunk.length;
      } catch (error) {
        console.error(`Batch ${index + 1}/${chunks.length} failed:`, error);
        failCount += chunk.length;
      }
    }

    return {
      success: true,
      totalProcessed: payload.length,
      successCount,
      failCount,
      message: `Processed ${payload.length} relations. Success: ${successCount}, Failed: ${failCount}`
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

    // Convert Date to Timestamp if dateOfCreation exists
    if (data.dateOfCreation) {
      cleanData.dateOfCreation = FirestoreTimestamp.fromDate(
        data.dateOfCreation
      );
    }

    await updateDoc(docRef, {
      ...cleanData,
      updatedAt: serverTimestamp()
    });

    // Sync to Neo4j
    try {
      const updatedDoc = await getDoc(docRef);
      if (updatedDoc.exists()) {
        const updatedData = updatedDoc.data();
        if (updatedData.code) {
          await syncPoliticalParty("update", {
            id,
            code: updatedData.code,
            ...updatedData
          });
        }
      }
    } catch (error) {
      console.error("[PoliticalPartyService] Error syncing to Neo4j:", error);
      throw error;
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
