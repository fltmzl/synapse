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
  CompanyPerson,
  CreateCompanyPersonDto,
  UpdateCompanyPersonDto
} from "@/types/person-relation.type";

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
