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
  updateDoc,
  where,
  orderBy,
  QueryConstraint,
  startAt,
  endAt,
  startAfter,
  increment
} from "firebase/firestore";
import {
  Article,
  ArticleQueryOptions,
  CreateArticleDto,
  SectionCategory,
  UpdateArticleDto
} from "@/types/article.type";

export class ArticleService {
  private static colName = "articles";
  private static colRef = collection(db, ArticleService.colName);

  private static generateSearchKeywords(data: {
    title?: string;
    category?: string;
    tags?: string[];
    slug?: string;
  }) {
    const keywords = new Set<string>();

    const processText = (text: string) => {
      if (!text) return;
      // Remove special characters and split by space
      const words = text
        .toLowerCase()
        .replace(/[^\w\s]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length > 0);
      words.forEach((w) => keywords.add(w));
    };

    if (data.title) processText(data.title);
    if (data.category) processText(data.category);
    if (data.tags) data.tags.forEach((tag) => processText(tag));
    if (data.slug) {
      data.slug.split("-").forEach((w) => {
        if (w.length > 0) keywords.add(w.toLowerCase());
      });
    }

    return Array.from(keywords);
  }

  static convertToSlug(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  static async getAll(options: ArticleQueryOptions = {}) {
    const {
      sectionCategory,
      category,
      limit: limitCount,
      isPublished,
      search,
      sortBy,
      lastVisible
    } = options;
    const constraints: QueryConstraint[] = [];

    if (sectionCategory) {
      constraints.push(where("sectionCategory", "==", sectionCategory));
    }

    if (category) {
      constraints.push(
        where("category", "in", [
          ArticleService.convertToSlug(category),
          category
        ])
      );
    }

    if (isPublished !== undefined) {
      constraints.push(where("isPublished", "==", isPublished));
    }

    const searchWords = search
      ? search
          .toLowerCase()
          .split(/\s+/)
          .filter((w) => w.length > 0)
      : [];

    if (searchWords.length > 0) {
      constraints.push(
        where("searchKeywords", "array-contains", searchWords[0])
      );
    }

    if (lastVisible) {
      constraints.push(startAfter(lastVisible));
    }

    if (limitCount) {
      constraints.push(limit(limitCount));
    }

    const q = query(ArticleService.colRef, ...constraints);

    const querySnapshot = await getDocs(q);
    let results = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as Article[];

    // If there are multiple search words, filter the rest in memory
    if (searchWords.length > 1) {
      results = results.filter((article) => {
        const keywords = article.searchKeywords || [];
        return searchWords.slice(1).every((word) => keywords.includes(word));
      });
    }

    // Client-side Sorting
    if (sortBy) {
      results.sort((a, b) => {
        switch (sortBy) {
          case "newest":
            return (
              (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0)
            );
          case "duration":
            return (b.readTimeAvg || 0) - (a.readTimeAvg || 0);
          case "popularity":
            return (b.engagementScore || 0) - (a.engagementScore || 0);
          case "relevance":
            // Skip for now, fallback to "newest"
            return (
              (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0)
            );
          default:
            return 0;
        }
      });
    }

    // Ambil dokumen terakhir sebagai cursor untuk next page
    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

    return {
      data: results,
      lastVisible: lastDoc
    };
  }

  static async getById(id: string) {
    const docRef = doc(db, ArticleService.colName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Article;
    } else {
      return null;
    }
  }

  static async getBySlug(slug: string) {
    const docRef = query(
      ArticleService.colRef,
      where("slug", "==", slug),
      limit(1)
    );
    const docSnap = await getDocs(docRef);

    if (!docSnap.empty) {
      const doc = docSnap.docs[0];

      return {
        id: doc.id,
        ...doc.data()
      } as Article;
    } else {
      return null;
    }
  }

  static async create(data: CreateArticleDto) {
    // Filter out undefined values
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    const searchKeywords = ArticleService.generateSearchKeywords({
      title: data.title,
      category: data.category,
      tags: data.tags,
      slug: data.slug
    });

    const docRef = await addDoc(ArticleService.colRef, {
      ...cleanData,
      searchKeywords,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      isPublished: data.isPublished ?? false
    });

    return {
      id: docRef.id,
      ...data
    };
  }

  static async publish(id: string) {
    await ArticleService.update({
      id,
      data: { isPublished: true }
    });
  }

  static async unpublish(id: string) {
    await ArticleService.update({
      id,
      data: { isPublished: false }
    });
  }

  static async update({ id, data }: { id: string; data: UpdateArticleDto }) {
    const docRef = doc(db, ArticleService.colName, id);

    // Filter out undefined values
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    // Regenerate search keywords if relevant fields are updated
    if (data.title || data.category || data.tags || data.slug) {
      // Fetch current doc to ensure we have all searchable fields
      const currentDoc = await ArticleService.getById(id);
      if (currentDoc) {
        const mergedData = {
          title: data.title ?? currentDoc.title,
          category: data.category ?? currentDoc.category,
          tags: data.tags ?? currentDoc.tags,
          slug: data.slug ?? currentDoc.slug
        };
        cleanData.searchKeywords =
          ArticleService.generateSearchKeywords(mergedData);
      }
    }

    await updateDoc(docRef, {
      ...cleanData,
      updatedAt: serverTimestamp()
    });
  }

  static async delete(id: string) {
    const docRef = doc(db, ArticleService.colName, id);
    await deleteDoc(docRef);
  }

  static async incrementView(id: string) {
    const docRef = doc(db, ArticleService.colName, id);
    await updateDoc(docRef, {
      viewCount: increment(1)
    });
    await this.updateEngagementScore(id);
  }

  static async incrementShare(id: string) {
    const docRef = doc(db, ArticleService.colName, id);
    await updateDoc(docRef, {
      shareCount: increment(1)
    });
    await this.updateEngagementScore(id);
  }

  static async updateReadTime(id: string, seconds: number) {
    if (seconds <= 0) return;
    const docRef = doc(db, ArticleService.colName, id);
    const article = await this.getById(id);
    if (!article) return;

    // Simple average calculation
    const currentTotalTime =
      (article.readTimeAvg || 0) * (article.viewCount || 1);
    const newTotalTime = currentTotalTime + seconds;
    const newAvg = Math.round(newTotalTime / (article.viewCount || 1));

    await updateDoc(docRef, {
      readTimeAvg: newAvg
    });
    await this.updateEngagementScore(id);
  }

  private static async updateEngagementScore(id: string) {
    const docRef = doc(db, ArticleService.colName, id);
    const article = await this.getById(id);
    if (!article) return;

    /**
     * Engagement Score Formula (Adjustable):
     * View: 1 point
     * Share: 5 points
     * Read Time: 0.1 point per second
     */
    const score =
      (article.viewCount || 0) * 1 +
      (article.shareCount || 0) * 5 +
      (article.readTimeAvg || 0) * 0.1;

    await updateDoc(docRef, {
      engagementScore: Math.round(score)
    });
  }
}
