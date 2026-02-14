import { BaseNeo4jSyncService } from "./base-sync.service";
import { Association } from "@/types/person-relation.type";

/**
 * Association Neo4j Sync Service
 * Handles syncing Association entities to Neo4j as Organization nodes
 */
export class AssociationNeo4jSyncService extends BaseNeo4jSyncService {
  private static readonly LABEL = "Association";

  /**
   * Sync an association to Neo4j
   */
  static async syncAssociation(
    association: Partial<Association> & { code: string }
  ): Promise<void> {
    const properties = {
      id: association.id,
      code: association.code,
      name: association.name,
      slug: association.slug,
      profilePicture: association.profilePicture || null,
      link: association.link || null,
      category: "ASSOCIATION" // Distinguishes from COMPANY
    };

    await this.mergeNode(this.LABEL, association.code, properties);
  }

  /**
   * Sync associations in batch to Neo4j
   */
  static async syncAssociationsBatch(
    associations: Array<Partial<Association> & { code: string }>
  ): Promise<void> {
    const items = associations.map((assoc) => ({
      code: assoc.code,
      properties: {
        id: assoc.id,
        code: assoc.code,
        name: assoc.name,
        slug: assoc.slug,
        profilePicture: assoc.profilePicture || null,
        link: assoc.link || null,
        category: "ASSOCIATION"
      }
    }));

    await this.mergeNodesBatch(this.LABEL, items);
  }

  /**
   * Delete an association from Neo4j
   */
  static async deleteAssociation(code: string): Promise<void> {
    await this.deleteNode(this.LABEL, code);
  }

  /**
   * Get association by code
   */
  static async getAssociationByCode(code: string) {
    const query = `
      MATCH (a:${this.LABEL} {code: $code, category: "ASSOCIATION"})
      RETURN a
    `;

    const results = await this.executeQuery(query, { code });
    return results[0]?.a || null;
  }
}
