import { BaseNeo4jSyncService } from "./base-sync.service";
import { Person } from "@/types/person-relation.type";

/**
 * Person Neo4j Sync Service
 * Handles syncing Person entities to Neo4j
 */
export class PersonNeo4jSyncService extends BaseNeo4jSyncService {
  private static readonly LABEL = "Person";

  /**
   * Sync multiple persons to Neo4j in a single batch
   */
  static async syncPersonsBatch(
    persons: Array<Partial<Person> & { code: string }>
  ): Promise<void> {
    const items = persons.map((person) => ({
      code: person.code,
      properties: {
        id: person.id,
        code: person.code,
        name: person.name,
        slug: person.slug,
        profilePicture: person.profilePicture || null,
        currentJobPosition: person.currentJobPosition || null,
        email: person.email || null,
        phoneNumber: person.phoneNumber || null,
        category: "PERSON"
      }
    }));

    await this.mergeNodesBatch(this.LABEL, items);
  }

  /**
   * Sync a person to Neo4j
   */
  static async syncPerson(
    person: Partial<Person> & { code: string }
  ): Promise<void> {
    await this.syncPersonsBatch([person]);
  }

  /**
   * Delete a person from Neo4j
   */
  static async deletePerson(code: string): Promise<void> {
    await this.deleteNode(this.LABEL, code);
  }

  /**
   * Get person by code
   */
  static async getPersonByCode(code: string) {
    const query = `
      MATCH (p:${this.LABEL} {code: $code})
      RETURN p
    `;

    const results = await this.executeQuery(query, { code });
    return results[0]?.p || null;
  }
}
