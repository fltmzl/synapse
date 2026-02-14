import { db } from "@/firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  startAfter,
  QueryDocumentSnapshot,
  UpdateData
} from "firebase/firestore";
import { Video, CreateVideoDto, UpdateVideoDto } from "@/types/video.type";

export class VideoService {
  private static colName = "videos";
  private static colRef = collection(db, VideoService.colName);

  private static generateSearchKeywords(data: {
    title?: string;
    description?: string;
    tags?: string[];
    territory?: string;
    place?: string;
    publisher?: string;
    category?: string;
  }) {
    const keywords = new Set<string>();

    const processText = (text: string) => {
      if (!text) return;
      const words = text
        .toLowerCase()
        .replace(/[^\w\s]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length > 0);
      words.forEach((w) => keywords.add(w));
    };

    if (data.title) processText(data.title);
    if (data.description) processText(data.description);
    if (data.tags) data.tags.forEach((tag) => processText(tag));
    if (data.territory) processText(data.territory);
    if (data.place) processText(data.place);
    if (data.publisher) processText(data.publisher);
    if (data.category) processText(data.category);

    return Array.from(keywords);
  }

  static convertToSlug(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  static async getAll(options?: {
    categories?: string[];
    territories?: string[];
    persons?: string[];
    search?: string;
    sortBy?: string;
    lastVisible?: QueryDocumentSnapshot;
    limit?: number;
  }) {
    try {
      let q = query(
        VideoService.colRef,
        orderBy("createdAt", "desc"),
        limit(options?.limit || 10)
      );

      const convertedCategorySlugs =
        options?.categories?.map((category) =>
          VideoService.convertToSlug(category)
        ) || [];

      if (options?.categories?.length) {
        q = query(
          q,
          where("category", "in", [
            ...options.categories,
            ...convertedCategorySlugs
          ])
        );
      }

      if (options?.lastVisible) {
        q = query(q, startAfter(options.lastVisible));
      }

      // Note: Firestore only supports one 'in' or 'array-contains-any' clause per query.
      // If we need multiple filters, we might need to filter client-side or use a different strategy.
      // For now, let's prioritize category filter if present, otherwise handle others if possible or client-side.
      // Since we can't chain multiple 'in' queries easily without advanced indexing or client-side filtering.

      const querySnapshot = await getDocs(q);
      let videos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as Video[];

      console.log("videos", videos);

      // Client-side filtering for other fields to avoid Firestore limitations
      if (options?.territories?.length) {
        videos = videos.filter(
          (video) =>
            video.territory && options.territories?.includes(video.territory)
        );
      }

      if (options?.persons?.length) {
        videos = videos.filter(
          (video) => video.person && options.persons?.includes(video.person)
        );
      }

      if (options?.search) {
        const searchLower = options.search.toLowerCase();
        videos = videos.filter(
          (video) =>
            video.title.toLowerCase().includes(searchLower) ||
            video.description.toLowerCase().includes(searchLower)
        );
      }

      // Sorting (if not default)
      if (options?.sortBy) {
        // Implement client-side sorting if needed beyond default createdAt
        // For now, we keep the default createdAt desc from Firestore query
        // unless specific sorting logic is requested.
        if (options.sortBy === "newest") {
          videos.sort(
            (a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()
          );
        } else if (options.sortBy === "duration") {
          // Assuming duration is not yet a field, skip or implement if available
        } else if (options.sortBy === "popularity") {
          videos.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
        } else if (options.sortBy === "relevance") {
          // Placeholder for relevance
        }
      }

      return {
        data: videos,
        lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1]
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getById(id: string) {
    const docRef = doc(db, VideoService.colName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists()
      ? ({ id: docSnap.id, ...docSnap.data() } as Video)
      : null;
  }

  static async create(data: CreateVideoDto) {
    const searchKeywords = VideoService.generateSearchKeywords({
      title: data.title,
      description: data.description,
      tags: data.tags,
      territory: data.territory,
      place: data.place,
      publisher: data.publisher || "Synapse",
      category: data.category
    });

    const docRef = await addDoc(VideoService.colRef, {
      ...data,
      publisher: data.publisher || "Synapse",
      searchKeywords,
      viewCount: 0,
      shareCount: 0,
      engagementScore: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { id: docRef.id, ...data };
  }

  static async update(id: string, data: UpdateVideoDto) {
    const docRef = doc(db, VideoService.colName, id);

    const updateData: Record<string, unknown> = {
      ...data,
      updatedAt: serverTimestamp()
    };

    if (
      data.title ||
      data.description ||
      data.tags ||
      data.territory ||
      data.place ||
      data.publisher ||
      data.category
    ) {
      const currentDoc = await VideoService.getById(id);
      if (currentDoc) {
        updateData.searchKeywords = VideoService.generateSearchKeywords({
          title: data.title ?? currentDoc.title,
          description: data.description ?? currentDoc.description,
          tags: data.tags ?? currentDoc.tags,
          territory: data.territory ?? currentDoc.territory,
          place: data.place ?? currentDoc.place,
          publisher: data.publisher ?? currentDoc.publisher,
          category: data.category ?? currentDoc.category
        });
      }
    }

    await updateDoc(docRef, updateData as UpdateData<Video>);
  }

  static async delete(id: string) {
    const docRef = doc(db, VideoService.colName, id);
    await deleteDoc(docRef);
  }

  static async incrementView(id: string) {
    const docRef = doc(db, VideoService.colName, id);
    await updateDoc(docRef, {
      viewCount: increment(1),
      engagementScore: increment(1)
    });
  }

  static async incrementShare(id: string) {
    const docRef = doc(db, VideoService.colName, id);
    await updateDoc(docRef, {
      shareCount: increment(1),
      engagementScore: increment(5)
    });
  }
}
