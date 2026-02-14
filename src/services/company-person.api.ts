import { db } from "@/firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  Timestamp as FirestoreTimestamp,
  updateDoc,
  where,
  writeBatch
} from "firebase/firestore";
import {
  Company,
  CompanyDataFromExcelDto,
  CompanyPersonRelationsFromExcelDto,
  CompanyPerson,
  CreateCompanyPersonDto,
  UpdateCompanyPersonDto
} from "@/types/person-relation.type";
import {
  syncRelationship,
  syncCompany,
  syncBatch
} from "@/lib/neo4j-sync-client";
import { uniqueBySelector } from "@/app/dashboard/admin-panel/persons/utils";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/-+/g, "-"); // Replace multiple dashes with single dash
}

export class CompanyPersonService {
  private static colName = "company_person";
  private static colRef = collection(db, CompanyPersonService.colName);

  static async create(payload: CreateCompanyPersonDto) {
    // Convert Date to Timestamp for date fields
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataToSave: Record<string, any> = {
      ...payload,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    if (payload.startDate) {
      dataToSave.startDate = FirestoreTimestamp.fromDate(payload.startDate);
    }

    if (payload.endDate) {
      dataToSave.endDate = FirestoreTimestamp.fromDate(payload.endDate);
    }

    const docRef = await addDoc(CompanyPersonService.colRef, dataToSave);

    return {
      id: docRef.id,
      ...payload,
      success: true,
      message: "Company-Person relation created successfully"
    };
  }

  static async createManyRelationsFromExcel(
    payload: CompanyPersonRelationsFromExcelDto[]
  ) {
    const mappedData = payload.map((item) => ({
      personId: item.relation.person,
      companyId: item.relation.organization,
      title: item.relation.nature_of_the_link,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }));

    const BATCH_SIZE = 500;
    const chunks = [];

    for (let i = 0; i < mappedData.length; i += BATCH_SIZE) {
      chunks.push(mappedData.slice(i, i + BATCH_SIZE));
    }

    let successCount = 0;
    let failCount = 0;

    for (const [index, chunk] of chunks.entries()) {
      try {
        const batch = writeBatch(db);

        chunk.forEach((data) => {
          // Use deterministic ID to prevent duplicates (personId_companyId)
          const docId = `${data.personId}_${data.companyId}`;
          const docRef = doc(db, CompanyPersonService.colName, docId);
          batch.set(docRef, data);
        });

        await batch.commit();

        // Batch Sync to Neo4j
        await syncBatch(
          "relationship",
          chunk.map((data) => ({
            relationshipType: "WORKS_FOR",
            personCode: data.personId,
            companyCode: data.companyId,
            title: data.title,
            employmentType: "other",
            startDate: new Date().toISOString(),
            isCurrent: true
          }))
        ).catch((err) =>
          console.error("Neo4j Relations Batch Sync Failed:", err)
        );

        successCount += chunk.length;
        console.log(
          `Relation Batch ${index + 1}/${chunks.length} committed and synced successfully.`
        );
      } catch (error) {
        console.error(
          `Relation Batch ${index + 1}/${chunks.length} failed:`,
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
      message: `Processed ${payload.length} relations. Success: ${successCount}, Failed: ${failCount}`
    };
  }

  static async getAll(): Promise<CompanyPerson[]> {
    const querySnapshot = await getDocs(CompanyPersonService.colRef);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<CompanyPerson, "id">)
    }));
  }

  static async getById(id: string): Promise<CompanyPerson | null> {
    const docRef = doc(db, CompanyPersonService.colName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as CompanyPerson;
    }
    return null;
  }

  static async getByCompanyId(companyId: string): Promise<CompanyPerson[]> {
    const q = query(
      CompanyPersonService.colRef,
      where("companyId", "==", companyId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<CompanyPerson, "id">)
    }));
  }

  static async getByPersonId(personId: string): Promise<CompanyPerson[]> {
    const q = query(
      CompanyPersonService.colRef,
      where("personId", "==", personId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<CompanyPerson, "id">)
    }));
  }

  static async update({
    id,
    data
  }: {
    id: string;
    data: UpdateCompanyPersonDto;
  }) {
    const docRef = doc(db, CompanyPersonService.colName, id);

    // Filter out undefined values
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cleanData: Record<string, any> = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    // Convert Date to Timestamp for date fields
    if (data.startDate) {
      cleanData.startDate = FirestoreTimestamp.fromDate(data.startDate);
    }

    if (data.endDate) {
      cleanData.endDate = FirestoreTimestamp.fromDate(data.endDate);
    }

    await updateDoc(docRef, {
      ...cleanData,
      updatedAt: serverTimestamp()
    });

    return {
      success: true,
      message: "Company-Person relation updated successfully"
    };
  }

  static async delete(id: string) {
    const docRef = doc(db, CompanyPersonService.colName, id);
    await deleteDoc(docRef);

    return {
      success: true,
      message: "Company-Person relation deleted successfully"
    };
  }
}
