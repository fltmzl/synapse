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
  where
} from "firebase/firestore";
import {
  AssociationPerson,
  CreateAssociationPersonDto,
  UpdateAssociationPersonDto
} from "@/types/person-relation.type";

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
