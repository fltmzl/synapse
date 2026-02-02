import { BaseNeo4jSyncService } from "./base-sync.service";
import { Company } from "@/types/person-relation.type";

/**
 * Company Neo4j Sync Service
 * Handles syncing Company entities to Neo4j as Organization nodes
 */
export class CompanyNeo4jSyncService extends BaseNeo4jSyncService {
  private static readonly LABEL = "Organization";

  /**
   * Sync multiple companies to Neo4j in a single batch
   */
  static async syncCompaniesBatch(
    companies: Array<Partial<Company> & { code: string }>
  ): Promise<void> {
    const items = companies.map((company) => ({
      code: company.code,
      properties: {
        id: company.id,
        code: company.code,
        name: company.name,
        slug: company.slug,
        profilePicture: company.profilePicture || null,
        description: company.description || null,
        email: company.email || null,
        phoneNumber: company.phoneNumber || null,
        website: company.website || null,
        category: "ORGANIZATION"
      }
    }));

    await this.mergeNodesBatch(this.LABEL, items);
  }

  /**
   * Sync a company to Neo4j
   */
  static async syncCompany(
    company: Partial<Company> & { code: string }
  ): Promise<void> {
    await this.syncCompaniesBatch([company]);
  }

  /**
   * Delete a company from Neo4j
   */
  static async deleteCompany(code: string): Promise<void> {
    await this.deleteNode(this.LABEL, code);
  }

  /**
   * Get company by code
   */
  static async getCompanyByCode(code: string) {
    const query = `
      MATCH (c:${this.LABEL} {code: $code, category: "COMPANY"})
      RETURN c
    `;

    const results = await this.executeQuery(query, { code });
    return results[0]?.c || null;
  }
}
