import { BaseNeo4jSyncService } from "./base-sync.service";
import { PoliticalParty } from "@/types/person-relation.type";

/**
 * Political Party Neo4j Sync Service
 * Handles syncing Political Party entities to Neo4j as PoliticalEntity nodes
 */
export class PoliticalPartyNeo4jSyncService extends BaseNeo4jSyncService {
  private static readonly LABEL = "PoliticalEntity";

  /**
   * Sync a political party to Neo4j
   */
  static async syncPoliticalParty(
    party: Partial<PoliticalParty> & { code: string }
  ): Promise<void> {
    const properties = {
      id: party.id,
      code: party.code,
      name: party.name,
      slug: party.slug,
      profilePicture: party.profilePicture || null,
      category: "POLITICAL_PARTY"
    };

    await this.mergeNode(this.LABEL, party.code, properties);
  }

  /**
   * Delete a political party from Neo4j
   */
  static async deletePoliticalParty(code: string): Promise<void> {
    await this.deleteNode(this.LABEL, code);
  }

  /**
   * Get political party by code
   */
  static async getPoliticalPartyByCode(code: string) {
    const query = `
      MATCH (p:${this.LABEL} {code: $code})
      RETURN p
    `;

    const results = await this.executeQuery(query, { code });
    return results[0]?.p || null;
  }
}
