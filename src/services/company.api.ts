import { db } from "@/firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  Timestamp as FirestoreTimestamp,
  updateDoc,
  where,
  writeBatch,
  getCountFromServer
} from "firebase/firestore";
import {
  Company,
  CreateCompanyDto,
  UpdateCompanyDto,
  CreateCompanyWithRepresentativeDto,
  UpdateCompanyWithRepresentativeDto,
  CompanyWithDetails
} from "@/types/person-relation.type";
import { generateCode, CODE_PREFIXES } from "@/lib/code-generator";
import {
  syncCompany,
  syncPerson,
  syncRelationship
} from "@/lib/neo4j-sync-client";

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
    const code = payload.code || generateCode(CODE_PREFIXES.COMPANY);

    // Convert Date to Timestamp if establishmentDate exists
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataToSave: Record<string, any> = {
      ...payload,
      code,
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

    // Sync to Neo4j
    await syncCompany("create", {
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
    const personCode =
      payload.representative.code || generateCode(CODE_PREFIXES.PERSON);
    const now = serverTimestamp();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const personData: Record<string, any> = {
      ...payload.representative,
      code: personCode,
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
    const companyCode =
      payload.company.code || generateCode(CODE_PREFIXES.COMPANY);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const companyData: Record<string, any> = {
      ...payload.company,
      code: companyCode,
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

    // Sync person (representative) to Neo4j
    await syncPerson("create", {
      id: personId,
      code: personCode,
      slug: personSlug,
      ...payload.representative
    });

    // Sync company to Neo4j
    await syncCompany("create", {
      id: companyId,
      code: companyCode,
      slug: companySlug,
      ...payload.company
    });

    // Sync relationship (WORKS_FOR)
    await syncRelationship("create", "WORKS_FOR", {
      personCode,
      companyCode,
      title: "Authorized Representative",
      employmentType: "other",
      startDate: new Date().toISOString(),
      isCurrent: true
    });

    return {
      companyId,
      personId,
      companyCode,
      personCode,
      companySlug,
      personSlug,
      success: true,
      message: "Company and authorized representative created successfully"
    };
  }

  static async getAll(filters?: {
    categoryIds?: string[];
    territoryIds?: string[];
    search?: string;
    page?: number;
    pageSize?: number;
  }): Promise<{ data: CompanyWithDetails[]; total: number }> {
    let q = query(CompanyService.colRef);

    if (filters?.categoryIds && filters.categoryIds.length > 0) {
      q = query(q, where("categoryId", "in", filters.categoryIds));
    }

    if (filters?.territoryIds && filters.territoryIds.length > 0) {
      q = query(q, where("territoryId", "in", filters.territoryIds));
    }

    // Get total count matching category/territory filters
    const countSnapshot = await getCountFromServer(q);
    let total = countSnapshot.data().count;

    let companies: Company[] = [];

    if (filters?.search) {
      // If searching, we fetch all relevant documents to filter by 'name' in-memory
      const querySnapshot = await getDocs(q);
      const allCompanies = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Company, "id">)
      }));

      const searchLower = filters.search.toLowerCase();
      const filteredCompanies = allCompanies.filter((c) =>
        c.name.toLowerCase().includes(searchLower)
      );

      total = filteredCompanies.length;

      if (filters.page !== undefined && filters.pageSize !== undefined) {
        const start = filters.page * filters.pageSize;
        companies = filteredCompanies.slice(
          start,
          start + filters.pageSize
        ) as Company[];
      } else {
        companies = filteredCompanies as Company[];
      }
    } else {
      // If no search, we use limit for optimization
      if (filters?.page !== undefined && filters?.pageSize !== undefined) {
        const limitCount = (filters.page + 1) * filters.pageSize;
        const qWithLimit = query(q, limit(limitCount));
        const querySnapshot = await getDocs(qWithLimit);
        const allFetched = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Company, "id">)
        }));

        const start = filters.page * filters.pageSize;
        companies = allFetched.slice(
          start,
          start + filters.pageSize
        ) as Company[];
      } else {
        const querySnapshot = await getDocs(q);
        companies = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Company, "id">)
        })) as Company[];
      }
    }

    if (companies.length === 0) return { data: [], total };

    // 1. Collect unique IDs for joins
    const categoryIds = [
      ...new Set(companies.map((c) => c.categoryId).filter(Boolean))
    ] as string[];
    const territoryIds = [
      ...new Set(companies.map((c) => c.territoryId).filter(Boolean))
    ] as string[];
    const representativeIds = [
      ...new Set(
        companies.map((c) => c.authorizedRepresentativeId).filter(Boolean)
      )
    ] as string[];

    // 2. Fetch related data in parallel (with basic caching/batching simulation)
    const [categoriesSnap, territoriesSnap, personsSnap] = await Promise.all([
      categoryIds.length > 0
        ? Promise.all(
            categoryIds.map((id) => getDoc(doc(db, "categories", id)))
          )
        : Promise.resolve([]),
      territoryIds.length > 0
        ? Promise.all(
            territoryIds.map((id) => getDoc(doc(db, "territories", id)))
          )
        : Promise.resolve([]),
      representativeIds.length > 0
        ? Promise.all(
            representativeIds.map((id) => getDoc(doc(db, "persons", id)))
          )
        : Promise.resolve([])
    ]);

    // 3. Create lookup maps
    const categoryMap = new Map(
      categoriesSnap
        .filter((s) => s.exists())
        .map((s) => [s.id, { id: s.id, name: s.data()?.name }])
    );
    const territoryMap = new Map(
      territoriesSnap
        .filter((s) => s.exists())
        .map((s) => [s.id, { id: s.id, name: s.data()?.name }])
    );
    const personMap = new Map(
      personsSnap
        .filter((s) => s.exists())
        .map((s) => [s.id, { id: s.id, name: s.data()?.name }])
    );

    // 4. Map companies with their joined data
    const dataWithDetails = companies.map((company) => ({
      ...company,
      category: company.categoryId ? categoryMap.get(company.categoryId) : null,
      territory: company.territoryId
        ? territoryMap.get(company.territoryId)
        : null,
      authorizedRepresentative: company.authorizedRepresentativeId
        ? personMap.get(company.authorizedRepresentativeId)
        : null
    }));

    return {
      data: dataWithDetails,
      total
    };
  }

  static async getBySlug(slug: string): Promise<CompanyWithDetails | null> {
    const q = query(CompanyService.colRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return null;

    const companyDoc = querySnapshot.docs[0];
    const data = companyDoc.data() as Omit<Company, "id">;
    const company = {
      id: companyDoc.id,
      ...data,
      createdAt:
        data.createdAt &&
        typeof data.createdAt === "object" &&
        "toMillis" in data.createdAt
          ? (data.createdAt as FirestoreTimestamp).toMillis()
          : null,
      updatedAt:
        data.updatedAt &&
        typeof data.updatedAt === "object" &&
        "toMillis" in data.updatedAt
          ? (data.updatedAt as FirestoreTimestamp).toMillis()
          : null,
      establishmentDate:
        data.establishmentDate &&
        typeof data.establishmentDate === "object" &&
        "toMillis" in data.establishmentDate
          ? (data.establishmentDate as FirestoreTimestamp).toMillis()
          : null
    };

    // Fetch related data
    const [categorySnap, territorySnap, representativeSnap] = await Promise.all(
      [
        company.categoryId
          ? getDoc(doc(db, "categories", company.categoryId))
          : Promise.resolve(null),
        company.territoryId
          ? getDoc(doc(db, "territories", company.territoryId))
          : Promise.resolve(null),
        company.authorizedRepresentativeId
          ? getDoc(doc(db, "persons", company.authorizedRepresentativeId))
          : Promise.resolve(null)
      ]
    );

    return {
      ...company,
      category:
        categorySnap?.exists() && categorySnap.data()
          ? {
              id: categorySnap.id,
              name: (categorySnap.data() as { name: string }).name
            }
          : null,
      territory:
        territorySnap?.exists() && territorySnap.data()
          ? {
              id: territorySnap.id,
              name: (territorySnap.data() as { name: string }).name
            }
          : null,
      authorizedRepresentative:
        representativeSnap?.exists() && representativeSnap.data()
          ? {
              id: representativeSnap.id,
              name: (representativeSnap.data() as { name: string }).name,
              profilePicture: (
                representativeSnap.data() as { profilePicture?: string }
              ).profilePicture,
              email: (representativeSnap.data() as { email?: string }).email,
              phoneNumber: (
                representativeSnap.data() as { phoneNumber?: string }
              ).phoneNumber,
              description: (
                representativeSnap.data() as { description?: string }
              ).description,
              currentJobPosition: (
                representativeSnap.data() as { currentJobPosition?: string }
              ).currentJobPosition,
              slug: (representativeSnap.data() as { slug?: string }).slug
            }
          : null
    } as CompanyWithDetails;
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

    // Sync to Neo4j
    try {
      const updatedDoc = await getDoc(docRef);
      if (updatedDoc.exists()) {
        const updatedData = updatedDoc.data();
        if (updatedData.code) {
          await syncCompany("update", {
            id,
            code: updatedData.code,
            ...updatedData
          });
        }
      }
    } catch (error) {
      console.error("[CompanyService] Error syncing to Neo4j:", error);
      throw error;
    }

    return {
      success: true,
      message: "Company updated successfully"
    };
  }

  /**
   * Update a company along with creating a new authorized representative person in a single batch operation
   */
  static async updateWithRepresentative(
    payload: UpdateCompanyWithRepresentativeDto
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

    // 2. Update Company
    const companyRef = doc(db, CompanyService.colName, payload.companyId);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const companyData: Record<string, any> = {
      ...payload.company,
      authorizedRepresentativeId: personId, // Link to the new person
      updatedAt: now
    };

    // Regenerate slug if name is updated
    if (payload.company.name) {
      companyData.slug = generateSlug(payload.company.name);
    }

    if (payload.company.establishmentDate) {
      companyData.establishmentDate = FirestoreTimestamp.fromDate(
        payload.company.establishmentDate
      );
    }

    // Filter out undefined values for company
    const cleanCompanyData = Object.fromEntries(
      Object.entries(companyData).filter(([_, v]) => v !== undefined)
    );

    batch.update(companyRef, cleanCompanyData);

    await batch.commit();

    // Sync to Neo4j
    try {
      // Fetch company code
      const companyDoc = await getDoc(companyRef);
      const companyCode = companyDoc.data()?.code;
      const personDoc = await getDoc(personRef);
      const personCode = personDoc.data()?.code;

      if (companyCode && personCode) {
        // 1. Sync Person (Representative)
        await syncPerson("create", {
          id: personId,
          code: personCode,
          slug: personSlug,
          ...payload.representative
        });

        // 2. Sync Company (Update)
        await syncCompany("update", {
          id: payload.companyId,
          code: companyCode,
          ...payload.company,
          authorizedRepresentativeId: personId
        });

        // 3. Sync Relationship (WORKS_FOR)
        await syncRelationship("create", "WORKS_FOR", {
          personCode,
          companyCode,
          title: "Authorized Representative",
          employmentType: "other",
          startDate: new Date().toISOString(),
          isCurrent: true
        });
      }
    } catch (error) {
      console.error("[CompanyService] Error syncing to Neo4j:", error);
      throw error;
    }

    return {
      personId,
      personSlug,
      success: true,
      message:
        "Company updated and authorized representative created successfully"
    };
  }

  static async delete(id: string) {
    const docRef = doc(db, CompanyService.colName, id);

    // Get company data for code before deleting
    const companyDoc = await getDoc(docRef);
    if (companyDoc.exists()) {
      const companyData = companyDoc.data();

      // Delete from Firestore
      await deleteDoc(docRef);

      // Sync to Neo4j
      if (companyData.code) {
        await syncCompany("delete", { code: companyData.code });
      }
    }

    return {
      success: true,
      message: "Company deleted successfully"
    };
  }
}
