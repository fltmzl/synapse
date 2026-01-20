import { db } from "@/firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  Timestamp as FirestoreTimestamp,
  updateDoc,
  writeBatch
} from "firebase/firestore";
import {
  Company,
  CreateCompanyDto,
  UpdateCompanyDto,
  CreateCompanyWithRepresentativeDto
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

export class CompanyService {
  private static colName = "companies";
  private static colRef = collection(db, CompanyService.colName);

  static async create(payload: CreateCompanyDto) {
    const slug = generateSlug(payload.name);

    // Convert Date to Timestamp if establishmentDate exists
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataToSave: Record<string, any> = {
      ...payload,
      slug,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    if (payload.establishmentDate) {
      dataToSave.establishmentDate = FirestoreTimestamp.fromDate(
        payload.establishmentDate
      );
    }

    const docRef = await addDoc(CompanyService.colRef, dataToSave);

    return {
      id: docRef.id,
      ...payload,
      slug,
      success: true,
      message: "Company created successfully"
    };
  }

  /**
   * Create a company along with its authorized representative person in a single batch operation
   */
  static async createWithRepresentative(
    payload: CreateCompanyWithRepresentativeDto
  ) {
    const batch = writeBatch(db);

    // 1. Prepare Person (Representative)
    const personId = doc(collection(db, "persons")).id;
    const personRef = doc(db, "persons", personId);
    const personSlug = generateSlug(payload.representative.name);
    const now = serverTimestamp();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const personData: Record<string, any> = {
      ...payload.representative,
      slug: personSlug,
      createdAt: now,
      updatedAt: now
    };

    // Filter out undefined values for person
    const cleanPersonData = Object.fromEntries(
      Object.entries(personData).filter(([_, v]) => v !== undefined)
    );

    batch.set(personRef, cleanPersonData);

    // 2. Prepare Company
    const companyId = doc(CompanyService.colRef).id;
    const companyRef = doc(db, CompanyService.colName, companyId);
    const companySlug = generateSlug(payload.company.name);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const companyData: Record<string, any> = {
      ...payload.company,
      authorizedRepresentativeId: personId, // Link to the new person
      slug: companySlug,
      createdAt: now,
      updatedAt: now
    };

    if (payload.company.establishmentDate) {
      companyData.establishmentDate = FirestoreTimestamp.fromDate(
        payload.company.establishmentDate
      );
    }

    // Filter out undefined values for company
    const cleanCompanyData = Object.fromEntries(
      Object.entries(companyData).filter(([_, v]) => v !== undefined)
    );

    batch.set(companyRef, cleanCompanyData);

    await batch.commit();

    return {
      companyId,
      personId,
      companySlug,
      personSlug,
      success: true,
      message: "Company and authorized representative created successfully"
    };
  }

  static async getAll(): Promise<Company[]> {
    const querySnapshot = await getDocs(CompanyService.colRef);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Company, "id">)
    }));
  }

  static async getById(id: string): Promise<Company | null> {
    const docRef = doc(db, CompanyService.colName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Company;
    }
    return null;
  }

  static async update({ id, data }: { id: string; data: UpdateCompanyDto }) {
    const docRef = doc(db, CompanyService.colName, id);

    // Filter out undefined values
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cleanData: Record<string, any> = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    // Regenerate slug if name is updated
    if (data.name) {
      cleanData.slug = generateSlug(data.name);
    }

    // Convert Date to Timestamp if establishmentDate exists
    if (data.establishmentDate) {
      cleanData.establishmentDate = FirestoreTimestamp.fromDate(
        data.establishmentDate
      );
    }

    await updateDoc(docRef, {
      ...cleanData,
      updatedAt: serverTimestamp()
    });

    return {
      success: true,
      message: "Company updated successfully"
    };
  }

  static async delete(id: string) {
    const docRef = doc(db, CompanyService.colName, id);
    await deleteDoc(docRef);

    return {
      success: true,
      message: "Company deleted successfully"
    };
  }
}
