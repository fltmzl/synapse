import { BaseNeo4jSyncService } from "./base-sync.service";
import { Company } from "@/types/person-relation.type";

/**
 * Company Neo4j Sync Service
 * Handles syncing Company entities to Neo4j as Organization nodes
 */
export class CompanyNeo4jSyncService extends BaseNeo4jSyncService {
  private static readonly LABEL = "Organization";

  /**
   * Sync a company to Neo4j
   */
  static async syncCompany(
    company: Partial<Company> & { code: string }
  ): Promise<void> {
    const properties = {
      id: company.id,
      code: company.code,
      name: company.name,
      slug: company.slug,
      profilePicture: company.profilePicture || null,
      description: company.description || null,
      category: "COMPANY", // Distinguishes from ASSOCIATION
      email: company.email || null,
      phoneNumber: company.phoneNumber || null,
      website: company.website || null
    };

    await this.mergeNode(this.LABEL, company.code, properties);
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
