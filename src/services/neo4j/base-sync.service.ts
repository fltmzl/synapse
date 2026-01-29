/* eslint-disable @typescript-eslint/no-explicit-any */
import driver, { databaseName } from "@/lib/neo4j";
import { Session } from "neo4j-driver";

/**
 * Base Neo4j Sync Service
 * Provides common utilities for all entity-specific sync services
 */
export class BaseNeo4jSyncService {
  /**
   * Execute a Cypher query with parameters
   */
  protected static async executeQuery<T = any>(
    query: string,
    params: Record<string, any> = {}
  ): Promise<T[]> {
    const session: Session = driver.session({ database: databaseName });

    try {
      const result = await session.run(query, params);
      return result.records.map((record) => record.toObject() as T);
    } catch (error) {
      console.error("[Neo4j] Query execution failed:", error);
      throw error;
    } finally {
      await session.close();
    }
  }

  /**
   * Create or update a node using MERGE
   */
  protected static async mergeNode(
    label: string,
    code: string,
    properties: Record<string, any>
  ): Promise<void> {
    const query = `
      MERGE (n:${label} {code: $code})
      SET n += $properties
      SET n.updatedAt = datetime()
      RETURN n
    `;

    const mergedResult = await this.executeQuery(query, {
      code,
      properties: {
        ...properties,
        code // Ensure code is in properties
      }
    });
  }

  /**
   * Delete a node by code
   */
  protected static async deleteNode(
    label: string,
    code: string
  ): Promise<void> {
    const query = `
      MATCH (n:${label} {code: $code})
      DETACH DELETE n
    `;

    await this.executeQuery(query, { code });
  }

  /**
   * Create or update a relationship
   */
  protected static async mergeRelationship(
    fromLabel: string,
    fromCode: string,
    toLabel: string,
    toCode: string,
    relationshipType: string,
    properties: Record<string, any> = {}
  ): Promise<void> {
    const query = `
      MATCH (from:${fromLabel} {code: $fromCode})
      MATCH (to:${toLabel} {code: $toCode})
      MERGE (from)-[r:${relationshipType}]->(to)
      SET r += $properties
      SET r.updatedAt = datetime()
      RETURN r
    `;

    await this.executeQuery(query, {
      fromCode,
      toCode,
      properties
    });
  }

  /**
   * Delete a relationship
   */
  protected static async deleteRelationship(
    fromLabel: string,
    fromCode: string,
    toLabel: string,
    toCode: string,
    relationshipType: string
  ): Promise<void> {
    const query = `
      MATCH (from:${fromLabel} {code: $fromCode})-[r:${relationshipType}]->(to:${toLabel} {code: $toCode})
      DELETE r
    `;

    await this.executeQuery(query, {
      fromCode,
      toCode
    });
  }

  /**
   * Check if driver is connected
   */
  static async verifyConnection(): Promise<boolean> {
    try {
      await driver.verifyConnectivity();
      return true;
    } catch (error) {
      console.error("[Neo4j] Connection verification failed:", error);
      return false;
    }
  }
}
