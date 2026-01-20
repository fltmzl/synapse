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
  updateDoc,
  where
} from "firebase/firestore";
import {
  PoliticalPartyPerson,
  CreatePoliticalPartyPersonDto,
  UpdatePoliticalPartyPersonDto,
  PoliticalPartyRelationType
} from "@/types/person-relation.type";

export class PoliticalPartyPersonService {
  private static colName = "political_parties_person";
  private static colRef = collection(db, PoliticalPartyPersonService.colName);

  static async create(payload: CreatePoliticalPartyPersonDto) {
    const docRef = await addDoc(PoliticalPartyPersonService.colRef, {
      ...payload,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return {
      id: docRef.id,
      ...payload,
      success: true,
      message: "Political Party-Person relation created successfully"
    };
  }

  static async getAll(): Promise<PoliticalPartyPerson[]> {
    const querySnapshot = await getDocs(PoliticalPartyPersonService.colRef);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<PoliticalPartyPerson, "id">)
    }));
  }

  static async getById(id: string): Promise<PoliticalPartyPerson | null> {
    const docRef = doc(db, PoliticalPartyPersonService.colName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as PoliticalPartyPerson;
    }
    return null;
  }

  static async getByPoliticalPartyId(
    politicalPartyId: string
  ): Promise<PoliticalPartyPerson[]> {
    const q = query(
      PoliticalPartyPersonService.colRef,
      where("politicalPartyId", "==", politicalPartyId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<PoliticalPartyPerson, "id">)
    }));
  }

  static async getByPersonId(
    personId: string
  ): Promise<PoliticalPartyPerson[]> {
    const q = query(
      PoliticalPartyPersonService.colRef,
      where("personId", "==", personId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<PoliticalPartyPerson, "id">)
    }));
  }

  static async getByType(
    type: PoliticalPartyRelationType
  ): Promise<PoliticalPartyPerson[]> {
    const q = query(
      PoliticalPartyPersonService.colRef,
      where("type", "==", type)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<PoliticalPartyPerson, "id">)
    }));
  }

  static async update({
    id,
    data
  }: {
    id: string;
    data: UpdatePoliticalPartyPersonDto;
  }) {
    const docRef = doc(db, PoliticalPartyPersonService.colName, id);

    // Filter out undefined values
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cleanData: Record<string, any> = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    await updateDoc(docRef, {
      ...cleanData,
      updatedAt: serverTimestamp()
    });

    return {
      success: true,
      message: "Political Party-Person relation updated successfully"
    };
  }

  static async delete(id: string) {
    const docRef = doc(db, PoliticalPartyPersonService.colName, id);
    await deleteDoc(docRef);

    return {
      success: true,
      message: "Political Party-Person relation deleted successfully"
    };
  }
}
