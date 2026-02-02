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
  EducationPerson,
  CreateEducationPersonDto,
  UpdateEducationPersonDto
} from "@/types/person-relation.type";

export class EducationPersonService {
  private static colName = "education_person";
  private static colRef = collection(db, EducationPersonService.colName);

  static async create(payload: CreateEducationPersonDto) {
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

    const docRef = await addDoc(EducationPersonService.colRef, dataToSave);

    return {
      id: docRef.id,
      ...payload,
      success: true,
      message: "Education-Person relation created successfully"
    };
  }

  static async getAll(): Promise<EducationPerson[]> {
    const querySnapshot = await getDocs(EducationPersonService.colRef);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<EducationPerson, "id">)
    }));
  }

  static async getById(id: string): Promise<EducationPerson | null> {
    const docRef = doc(db, EducationPersonService.colName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as EducationPerson;
    }
    return null;
  }

  static async getByEducationId(
    educationId: string
  ): Promise<EducationPerson[]> {
    const q = query(
      EducationPersonService.colRef,
      where("educationId", "==", educationId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<EducationPerson, "id">)
    }));
  }

  static async getByPersonId(personId: string): Promise<EducationPerson[]> {
    const q = query(
      EducationPersonService.colRef,
      where("personId", "==", personId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<EducationPerson, "id">)
    }));
  }

  static async update({
    id,
    data
  }: {
    id: string;
    data: UpdateEducationPersonDto;
  }) {
    const docRef = doc(db, EducationPersonService.colName, id);

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
      message: "Education-Person relation updated successfully"
    };
  }

  static async delete(id: string) {
    const docRef = doc(db, EducationPersonService.colName, id);
    await deleteDoc(docRef);

    return {
      success: true,
      message: "Education-Person relation deleted successfully"
    };
  }
}
