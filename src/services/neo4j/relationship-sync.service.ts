import { BaseNeo4jSyncService } from "./base-sync.service";

/**
 * Relationship Types for Person connections
 */
export enum RelationshipType {
  WORKS_FOR = "WORKS_FOR",
  STUDIED_AT = "STUDIED_AT",
  MEMBER_OF = "MEMBER_OF",
  SUPPORTS = "SUPPORTS",
  OPPOSES = "OPPOSES"
}

/**
 * Relationship Neo4j Sync Service
 * Handles syncing relationships between entities
 */
export class RelationshipNeo4jSyncService extends BaseNeo4jSyncService {
  /**
   * Sync multiple work relationships (Person -> Company) in a single batch
   */
  static async syncWorkRelationshipsBatch(
    items: Array<{
      personCode: string;
      companyCode: string;
      roles?: string[];
      label?: string;
      title?: string;
      employmentType?: string;
      startDate?: string | null;
      endDate?: string | null;
      isCurrent?: boolean;
    }>
  ): Promise<void> {
    const batchItems = items.map((params) => ({
      fromCode: params.personCode,
      toCode: params.companyCode,
      properties: {
        roles: params.roles || [],
        label: params.label || params.title || "",
        title: params.title || "",
        employmentType: params.employmentType || null,
        startDate: params.startDate || null,
        endDate: params.endDate || null,
        isCurrent:
          params.isCurrent ??
          (params.endDate === null || params.endDate === undefined)
      }
    }));

    await this.mergeRelationshipsBatch(
      "Person",
      "Organization",
      RelationshipType.WORKS_FOR,
      batchItems
    );
  }

  /**
   * Sync a work relationship (Person -> Company)
   */
  static async syncWorkRelationship(params: {
    personCode: string;
    companyCode: string;
    roles?: string[];
    label?: string;
    title?: string;
    employmentType?: string;
    startDate?: string | null;
    endDate?: string | null;
    isCurrent?: boolean;
  }): Promise<void> {
    await this.syncWorkRelationshipsBatch([params]);
  }

  /**
   * Sync a study relationship (Person -> Education)
   */
  static async syncStudyRelationship(params: {
    personCode: string;
    educationCode: string;
    major?: string;
    gpa?: number;
    startDate?: string | null;
    endDate?: string | null;
  }): Promise<void> {
    const properties = {
      major: params.major || null,
      gpa: params.gpa || null,
      startDate: params.startDate || null,
      endDate: params.endDate || null
    };

    await this.mergeRelationship(
      "Person",
      params.personCode,
      "Education",
      params.educationCode,
      RelationshipType.STUDIED_AT,
      properties
    );
  }

  /**
   * Sync a membership relationship (Person -> Association)
   */
  static async syncMembershipRelationship(params: {
    personCode: string;
    associationCode: string;
    roles?: string[];
    label?: string;
    title?: string;
    type?: string;
    startDate?: string | null;
    endDate?: string | null;
  }): Promise<void> {
    const properties = {
      roles: params.roles || [],
      label: params.label || params.title || "",
      title: params.title || "",
      type: params.type || null,
      startDate: params.startDate || null,
      endDate: params.endDate || null
    };

    await this.mergeRelationship(
      "Person",
      params.personCode,
      "Organization",
      params.associationCode,
      RelationshipType.MEMBER_OF,
      properties
    );
  }

  /**
   * Sync a political support/oppose relationship (Person -> PoliticalParty)
   */
  static async syncPoliticalRelationship(params: {
    personCode: string;
    partyCode: string;
    type: "SUPPORTS" | "OPPOSES";
  }): Promise<void> {
    const relationshipType =
      params.type === "SUPPORTS"
        ? RelationshipType.SUPPORTS
        : RelationshipType.OPPOSES;

    await this.mergeRelationship(
      "Person",
      params.personCode,
      "PoliticalEntity",
      params.partyCode,
      relationshipType,
      { type: params.type }
    );
  }

  /**
   * Delete a relationship between person and target
   */
  static async deletePersonRelationship(params: {
    personCode: string;
    targetCode: string;
    targetLabel: "Organization" | "Education" | "PoliticalEntity";
    relationshipType: RelationshipType;
  }): Promise<void> {
    await this.deleteRelationship(
      "Person",
      params.personCode,
      params.targetLabel,
      params.targetCode,
      params.relationshipType
    );
  }

  /**
   * Delete all relationships of a specific type for a person
   */
  static async deleteAllRelationships(params: {
    personCode: string;
    relationshipType: RelationshipType;
  }): Promise<void> {
    await this.executeQuery(
      `
      MATCH (p:Person {code: $personCode})-[r:${params.relationshipType}]->()
      DELETE r
      `,
      { personCode: params.personCode }
    );
  }
}
