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
  AssociationPerson,
  AssociationPersonRelationsFromExcelDto,
  CreateAssociationPersonDto,
  UpdateAssociationPersonDto
} from "@/types/person-relation.type";
import { syncRelationship } from "@/lib/neo4j-sync-client";

export class AssociationPersonService {
  private static colName = "association_person";
  private static colRef = collection(db, AssociationPersonService.colName);

  static async create(payload: CreateAssociationPersonDto) {
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

    const docRef = await addDoc(AssociationPersonService.colRef, dataToSave);

    return {
      id: docRef.id,
      ...payload,
      success: true,
      message: "Association-Person relation created successfully"
    };
  }

  static async createManyRelationsFromExcel(
    payload: AssociationPersonRelationsFromExcelDto[]
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

        for (const item of chunk) {
          const personCode = item.relation.person;
          const associationCode = item.relation.organization;
          const title = item.relation.nature_of_the_link;

          const id = `${personCode}_${associationCode}`;
          const docRef = doc(db, AssociationPersonService.colName, id);

          batch.set(docRef, {
            personId: personCode,
            associationId: associationCode,
            title: title,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });

          // Sync individual relationship to Neo4j
          await syncRelationship("create", "MEMBER_OF", {
            personCode,
            associationCode: associationCode,
            title: title,
            isCurrent: true
          }).catch((err) =>
            console.error("Neo4j association relationship sync failed:", err)
          );
        }

        await batch.commit();
        successCount += chunk.length;
        console.log(
          `Association Relation Batch ${index + 1}/${chunks.length} committed and synced successfully.`
        );
      } catch (error) {
        console.error(
          `Association Relation Batch ${index + 1}/${chunks.length} failed:`,
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
      message: `Processed ${payload.length} association relations. Success: ${successCount}, Failed: ${failCount}`
    };
  }

  static async getAll(): Promise<AssociationPerson[]> {
    const querySnapshot = await getDocs(AssociationPersonService.colRef);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<AssociationPerson, "id">)
    }));
  }

  static async getById(id: string): Promise<AssociationPerson | null> {
    const docRef = doc(db, AssociationPersonService.colName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as AssociationPerson;
    }
    return null;
  }

  static async getByAssociationId(
    associationId: string
  ): Promise<AssociationPerson[]> {
    const q = query(
      AssociationPersonService.colRef,
      where("associationId", "==", associationId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<AssociationPerson, "id">)
    }));
  }

  static async getByPersonId(personId: string): Promise<AssociationPerson[]> {
    const q = query(
      AssociationPersonService.colRef,
      where("personId", "==", personId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<AssociationPerson, "id">)
    }));
  }

  static async update({
    id,
    data
  }: {
    id: string;
    data: UpdateAssociationPersonDto;
  }) {
    const docRef = doc(db, AssociationPersonService.colName, id);

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
      message: "Association-Person relation updated successfully"
    };
  }

  static async delete(id: string) {
    const docRef = doc(db, AssociationPersonService.colName, id);
    await deleteDoc(docRef);

    return {
      success: true,
      message: "Association-Person relation deleted successfully"
    };
  }
}
