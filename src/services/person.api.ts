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
  writeBatch,
  limit
} from "firebase/firestore";
import {
  Person,
  CreatePersonDto,
  UpdatePersonDto,
  CreatePersonWithRelationsDto,
  UpdatePersonWithRelationsDto,
  PersonWithDetails,
  Company,
  Education,
  PoliticalParty,
  CompanyPerson,
  EducationPerson,
  AssociationPerson,
  PoliticalPartyPerson,
  Association,
  CreateCompanyPersonDto,
  CreateEducationPersonDto,
  CreateAssociationPersonDto,
  CreatePoliticalPartyPersonDto,
  PoliticalPartyRelationType
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

  static async getAll(): Promise<PersonWithDetails[]> {
    const [
      personsSnap,
      territoriesSnap,
      categoriesSnap,
      associationsSnap,
      associationPersonSnap
    ] = await Promise.all([
      getDocs(PersonService.colRef),
      getDocs(collection(db, "territories")),
      getDocs(collection(db, "categories")),
      getDocs(collection(db, "associations")),
      getDocs(collection(db, "association_person"))
    ]);

    const territoriesMap = new Map(
      territoriesSnap.docs.map((doc) => [
        doc.id,
        { id: doc.id, ...(doc.data() as { name: string }) }
      ])
    );

    const categoriesMap = new Map(
      categoriesSnap.docs.map((doc) => [
        doc.id,
        { id: doc.id, ...(doc.data() as { name: string }) }
      ])
    );

    const associationsMap = new Map(
      associationsSnap.docs.map((doc) => [
        doc.id,
        {
          id: doc.id,
          ...(doc.data() as { name: string; profilePicture?: string })
        }
      ])
    );

    const associationPersonList = associationPersonSnap.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as {
        personId: string;
        associationId: string;
        startDate?: Timestamp;
        endDate?: Timestamp;
      })
    }));

    return personsSnap.docs.map((doc) => {
      const personData = doc.data() as Omit<Person, "id">;
      const personId = doc.id;

      const territory = personData.territoryId
        ? territoriesMap.get(personData.territoryId) || null
        : null;

      const category = personData.categoryId
        ? categoriesMap.get(personData.categoryId) || null
        : null;

      const personAssociations = associationPersonList
        .filter((ap) => ap.personId === personId)
        .map((ap) => {
          const assoc = associationsMap.get(ap.associationId);
          return {
            id: ap.id,
            associationId: ap.associationId,
            name: assoc?.name || "Unknown Association",
            profilePicture: assoc?.profilePicture,
            startDate: ap.startDate,
            endDate: ap.endDate
          };
        });

      return {
        id: personId,
        ...personData,
        territory,
        category,
        associations: personAssociations
      };
    });
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

  static async getBySlug(slug: string): Promise<Person | null> {
    const q = query(PersonService.colRef, where("slug", "==", slug), limit(1));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0];
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
  static async getWithRelations(slug: string): Promise<
    | (PersonWithDetails & {
        companies: Array<Company & CompanyPerson>;
        educations: Array<Education & EducationPerson>;
        politicalParties: Array<PoliticalParty & PoliticalPartyPerson>;
      })
    | null
  > {
    const person = await this.getBySlug(slug);
    if (!person) return null;

    const id = person.id;

    // Fetch junction records and basic details
    const [
      companyPersonSnap,
      educationPersonSnap,
      associationPersonSnap,
      politicalPartyPersonSnap,
      territorySnap,
      categorySnap
    ] = await Promise.all([
      getDocs(
        query(collection(db, "company_person"), where("personId", "==", id))
      ),
      getDocs(
        query(collection(db, "education_person"), where("personId", "==", id))
      ),
      getDocs(
        query(collection(db, "association_person"), where("personId", "==", id))
      ),
      getDocs(
        query(
          collection(db, "political_parties_person"),
          where("personId", "==", id)
        )
      ),
      person.territoryId
        ? getDoc(doc(db, "territories", person.territoryId))
        : Promise.resolve(null),
      person.categoryId
        ? getDoc(doc(db, "categories", person.categoryId))
        : Promise.resolve(null)
    ]);

    const territory =
      territorySnap && territorySnap.exists()
        ? {
            id: territorySnap.id,
            ...(territorySnap.data() as {
              name: string;
              createdAt: Timestamp;
              updatedAt: Timestamp;
            })
          }
        : null;

    const category =
      categorySnap && categorySnap.exists()
        ? {
            id: categorySnap.id,
            ...(categorySnap.data() as {
              name: string;
              createdAt: Timestamp;
              updatedAt: Timestamp;
            })
          }
        : null;

    // Helper to fetch root details for junction records
    const fetchRootDetails = async <T>(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      junctionDocs: any[],
      collectionName: string,
      idField: string
    ) => {
      const ids = Array.from(new Set(junctionDocs.map((d) => d[idField])));
      if (ids.length === 0) return new Map<string, T>();

      const details = await Promise.all(
        ids.map((id) => getDoc(doc(db, collectionName, id)))
      );

      return new Map(
        details
          .filter((snap) => snap.exists())
          .map((snap) => [snap.id, { id: snap.id, ...snap.data() } as T])
      );
    };

    // Fetch all root details in parallel
    const [companiesMap, educationsMap, associationsMap, politicalPartiesMap] =
      await Promise.all([
        fetchRootDetails<Company>(
          companyPersonSnap.docs.map((d) => d.data()),
          "companies",
          "companyId"
        ),
        fetchRootDetails<Education>(
          educationPersonSnap.docs.map((d) => d.data()),
          "educations",
          "educationId"
        ),
        fetchRootDetails<Association>(
          associationPersonSnap.docs.map((d) => d.data()),
          "associations",
          "associationId"
        ),
        fetchRootDetails<PoliticalParty>(
          politicalPartyPersonSnap.docs.map((d) => d.data()),
          "political_parties",
          "politicalPartyId"
        )
      ]);

    // Join data
    const companies = companyPersonSnap.docs.map((d) => {
      const data = d.data() as CompanyPerson;
      const root = companiesMap.get(data.companyId);
      return { ...root, ...data, id: d.id } as Company & CompanyPerson;
    });

    const educations = educationPersonSnap.docs.map((d) => {
      const data = d.data() as EducationPerson;
      const root = educationsMap.get(data.educationId);
      return { ...root, ...data, id: d.id } as Education & EducationPerson;
    });

    const associations = associationPersonSnap.docs.map((d) => {
      const data = d.data() as AssociationPerson;
      const root = associationsMap.get(data.associationId);
      return {
        id: d.id,
        associationId: data.associationId,
        name: root?.name || "Unknown Association",
        profilePicture: root?.profilePicture,
        link: root?.link,
        title: data.title,
        type: data.type,
        startDate: data.startDate,
        endDate: data.endDate
      };
    });

    const politicalParties = politicalPartyPersonSnap.docs.map((d) => {
      const data = d.data() as PoliticalPartyPerson;
      const root = politicalPartiesMap.get(data.politicalPartyId);
      return {
        ...root,
        ...data,
        id: d.id
      } as PoliticalParty & PoliticalPartyPerson;
    });

    return {
      ...person,
      territory,
      category,
      companies,
      educations,
      associations,
      politicalParties
    };
  }

  static async update({
    id,
    data
  }: {
    id: string;
    data: UpdatePersonDto | UpdatePersonWithRelationsDto;
  }) {
    const batch = writeBatch(db);
    const personRef = doc(db, PersonService.colName, id);
    const now = serverTimestamp();

    // Helper to clean undefined values
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const clean = (obj: Record<string, any>) =>
      Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => v !== undefined)
      );

    let personData: UpdatePersonDto;
    let relations: Omit<UpdatePersonWithRelationsDto, "person"> | null = null;

    if ("person" in data) {
      personData = data.person;
      relations = {
        companies: data.companies,
        educations: data.educations,
        associations: data.associations,
        politicalParties: data.politicalParties
      };
    } else {
      personData = data;
    }

    const cleanPersonData = clean(personData);
    if (cleanPersonData.name) {
      cleanPersonData.slug = generateSlug(cleanPersonData.name);
    }

    // 1. Update Person
    batch.update(personRef, {
      ...cleanPersonData,
      updatedAt: now
    });

    // 2. Handle Relations if provided
    if (relations) {
      // We need to delete existing relations first.
      // Since we can't query in a batch, we fetch them first.
      const [
        companyPersonSnap,
        educationPersonSnap,
        associationPersonSnap,
        politicalPartyPersonSnap
      ] = await Promise.all([
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

      // Delete existing
      companyPersonSnap.docs.forEach((d) => batch.delete(d.ref));
      educationPersonSnap.docs.forEach((d) => batch.delete(d.ref));
      associationPersonSnap.docs.forEach((d) => batch.delete(d.ref));
      politicalPartyPersonSnap.docs.forEach((d) => batch.delete(d.ref));

      // Add new Company Relations
      if (relations.companies && relations.companies.length > 0) {
        const col = collection(db, "company_person");
        relations.companies.forEach(
          (
            rel: Omit<CreateCompanyPersonDto, "personId"> & {
              companyId: string;
            }
          ) => {
            const relRef = doc(col);
            batch.set(relRef, {
              ...clean(rel),
              personId: id,
              startDate: rel.startDate
                ? Timestamp.fromDate(new Date(rel.startDate))
                : null,
              endDate: rel.endDate
                ? Timestamp.fromDate(new Date(rel.endDate))
                : null,
              createdAt: now,
              updatedAt: now
            });
          }
        );
      }

      // Add new Education Relations
      if (relations.educations && relations.educations.length > 0) {
        const col = collection(db, "education_person");
        relations.educations.forEach(
          (
            rel: Omit<CreateEducationPersonDto, "personId"> & {
              educationId: string;
            }
          ) => {
            const relRef = doc(col);
            batch.set(relRef, {
              ...clean(rel),
              personId: id,
              startDate: rel.startDate
                ? Timestamp.fromDate(new Date(rel.startDate))
                : null,
              endDate: rel.endDate
                ? Timestamp.fromDate(new Date(rel.endDate))
                : null,
              createdAt: now,
              updatedAt: now
            });
          }
        );
      }

      // Add new Association Relations
      if (relations.associations && relations.associations.length > 0) {
        const col = collection(db, "association_person");
        relations.associations.forEach(
          (
            rel: Omit<CreateAssociationPersonDto, "personId"> & {
              associationId: string;
            }
          ) => {
            const relRef = doc(col);
            batch.set(relRef, {
              ...clean(rel),
              personId: id,
              startDate: rel.startDate
                ? Timestamp.fromDate(new Date(rel.startDate))
                : null,
              endDate: rel.endDate
                ? Timestamp.fromDate(new Date(rel.endDate))
                : null,
              createdAt: now,
              updatedAt: now
            });
          }
        );
      }

      // Add new Political Party Relations
      if (relations.politicalParties && relations.politicalParties.length > 0) {
        const col = collection(db, "political_parties_person");
        relations.politicalParties.forEach(
          (
            rel: Omit<CreatePoliticalPartyPersonDto, "personId"> & {
              politicalPartyId: string;
              type: PoliticalPartyRelationType;
            }
          ) => {
            const relRef = doc(col);
            batch.set(relRef, {
              ...clean(rel),
              personId: id,
              createdAt: now,
              updatedAt: now
            });
          }
        );
      }
    }

    await batch.commit();

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
