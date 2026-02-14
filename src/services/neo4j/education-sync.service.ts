import { BaseNeo4jSyncService } from "./base-sync.service";
import { Education } from "@/types/person-relation.type";

/**
 * Education Neo4j Sync Service
 * Handles syncing Education entities to Neo4j
 */
export class EducationNeo4jSyncService extends BaseNeo4jSyncService {
  private static readonly LABEL = "Education";

  /**
   * Sync an education institution to Neo4j
   */
  static async syncEducation(
    education: Partial<Education> & { code: string }
  ): Promise<void> {
    const properties = {
      id: education.id,
      code: education.code,
      name: education.name,
      slug: education.slug,
      profilePicture: education.profilePicture || null,
      description: education.description || null,
      link: education.link || null,
      category: "EDUCATION"
    };

    await this.mergeNode(this.LABEL, education.code, properties);
  }

  /**
   * Sync educations in batch to Neo4j
   */
  static async syncEducationsBatch(
    educations: Array<Partial<Education> & { code: string }>
  ): Promise<void> {
    const items = educations.map((edu) => ({
      code: edu.code,
      properties: {
        id: edu.id,
        code: edu.code,
        name: edu.name,
        slug: edu.slug,
        profilePicture: edu.profilePicture || null,
        description: edu.description || null,
        link: edu.link || null,
        category: "EDUCATION"
      }
    }));

    await this.mergeNodesBatch(this.LABEL, items);
  }

  /**
   * Delete an education institution from Neo4j
   */
  static async deleteEducation(code: string): Promise<void> {
    await this.deleteNode(this.LABEL, code);
  }

  /**
   * Get education by code
   */
  static async getEducationByCode(code: string) {
    const query = `
      MATCH (e:${this.LABEL} {code: $code})
      RETURN e
    `;

    const results = await this.executeQuery(query, { code });
    return results[0]?.e || null;
  }
}
