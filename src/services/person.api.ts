import { db } from "@/firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  Timestamp,
  updateDoc,
  writeBatch
} from "firebase/firestore";
import {
  Person,
  CreatePersonDto,
  UpdatePersonDto,
  CreatePersonWithRelationsDto
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

export class PersonService {
  private static colName = "persons";
  private static colRef = collection(db, PersonService.colName);

  static async create(payload: CreatePersonDto) {
    const slug = generateSlug(payload.name);

    const docRef = await addDoc(PersonService.colRef, {
      ...payload,
      slug,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return {
      id: docRef.id,
      ...payload,
      slug,
      success: true,
      message: "Person created successfully"
    };
  }

  /**
   * Create a person along with all their relations in a single batch operation
   */
  static async createWithRelations(payload: CreatePersonWithRelationsDto) {
    const batch = writeBatch(db);
    const personId = doc(PersonService.colRef).id;
    const personRef = doc(db, PersonService.colName, personId);

    const slug = generateSlug(payload.person.name);
    const now = serverTimestamp();

    // Helper to clean undefined values
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const clean = (obj: Record<string, any>) =>
      Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => v !== undefined)
      );

    // 1. Create Person
    batch.set(personRef, {
      ...clean(payload.person),
      slug,
      createdAt: now,
      updatedAt: now
    });

    // 2. Create Company Relations
    if (payload.companies && payload.companies.length > 0) {
      const companyPersonCol = collection(db, "company_person");
      payload.companies.forEach((rel) => {
        const relRef = doc(companyPersonCol);
        const cleanedRel = clean(rel);
        batch.set(relRef, {
          ...cleanedRel,
          personId,
          startDate: rel.startDate ? Timestamp.fromDate(rel.startDate) : null,
          endDate: rel.endDate ? Timestamp.fromDate(rel.endDate) : null,
          createdAt: now,
          updatedAt: now
        });
      });
    }

    // 3. Create Education Relations
    if (payload.educations && payload.educations.length > 0) {
      console.log("Creating education relations");
      const educationPersonCol = collection(db, "education_person");
      payload.educations.forEach((rel) => {
        const relRef = doc(educationPersonCol);
        const cleanedRel = clean(rel);
        batch.set(relRef, {
          ...cleanedRel,
          personId,
          startDate: rel.startDate ? Timestamp.fromDate(rel.startDate) : null,
          endDate: rel.endDate ? Timestamp.fromDate(rel.endDate) : null,
          createdAt: now,
          updatedAt: now
        });
      });
    }

    // 4. Create Association Relations
    if (payload.associations && payload.associations.length > 0) {
      console.log("Creating association relations");
      const associationPersonCol = collection(db, "association_person");
      payload.associations.forEach((rel) => {
        const relRef = doc(associationPersonCol);
        const cleanedRel = clean(rel);
        batch.set(relRef, {
          ...cleanedRel,
          personId,
          startDate: rel.startDate ? Timestamp.fromDate(rel.startDate) : null,
          endDate: rel.endDate ? Timestamp.fromDate(rel.endDate) : null,
          createdAt: now,
          updatedAt: now
        });
      });
    }

    // 5. Create Political Party Relations
    if (payload.politicalParties && payload.politicalParties.length > 0) {
      console.log("Creating political party relations");
      const politicalPartyPersonCol = collection(
        db,
        "political_parties_person"
      );
      payload.politicalParties.forEach((rel) => {
        const relRef = doc(politicalPartyPersonCol);
        const cleanedRel = clean(rel);
        batch.set(relRef, {
          ...cleanedRel,
          personId,
          createdAt: now,
          updatedAt: now
        });
      });
    }

    await batch.commit();

    return {
      id: personId,
      slug,
      success: true,
      message: "Person and relations created successfully"
    };
  }

  static async getAll(): Promise<Person[]> {
    const querySnapshot = await getDocs(PersonService.colRef);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Person, "id">)
    }));
  }

  static async getById(id: string): Promise<Person | null> {
    const docRef = doc(db, PersonService.colName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Person;
    }
    return null;
  }

  /**
   * Get a person with all their relations populated
   */
  static async getWithRelations(id: string) {
    const person = await this.getById(id);
    if (!person) return null;

    // Fetch relations
    const [companies, educations, associations, politicalParties] =
      await Promise.all([
        getDocs(
          query(collection(db, "company_person"), where("personId", "==", id))
        ),
        getDocs(
          query(collection(db, "education_person"), where("personId", "==", id))
        ),
        getDocs(
          query(
            collection(db, "association_person"),
            where("personId", "==", id)
          )
        ),
        getDocs(
          query(
            collection(db, "political_parties_person"),
            where("personId", "==", id)
          )
        )
      ]);

    return {
      ...person,
      companies: companies.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      educations: educations.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      associations: associations.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })),
      politicalParties: politicalParties.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
    };
  }

  static async update({ id, data }: { id: string; data: UpdatePersonDto }) {
    const docRef = doc(db, PersonService.colName, id);

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

    return {
      success: true,
      message: "Person updated successfully"
    };
  }

  static async delete(id: string) {
    const docRef = doc(db, PersonService.colName, id);
    await deleteDoc(docRef);

    return {
      success: true,
      message: "Person deleted successfully"
    };
  }
}
