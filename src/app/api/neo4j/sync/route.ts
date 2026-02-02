/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import {
  PersonNeo4jSyncService,
  CompanyNeo4jSyncService,
  EducationNeo4jSyncService,
  AssociationNeo4jSyncService,
  PoliticalPartyNeo4jSyncService,
  RelationshipNeo4jSyncService,
  BaseNeo4jSyncService
} from "@/services/neo4j";

export const dynamic = "force-dynamic";

/**
 * Neo4j Sync API Route
 * POST /api/neo4j/sync
 *
 * Syncs entities and relationships to Neo4j
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, entityType, data } = body;

    if (!action || !entityType) {
      return NextResponse.json(
        { error: "Missing required fields: action, entityType" },
        { status: 400 }
      );
    }

    // Verify Neo4j connection
    const isConnected = await BaseNeo4jSyncService.verifyConnection();
    if (!isConnected) {
      return NextResponse.json(
        { error: "Neo4j connection failed" },
        { status: 500 }
      );
    }

    // Handle different entity types
    switch (entityType) {
      case "person":
        await handlePersonSync(action, data);
        break;

      case "company":
        await handleCompanySync(action, data);
        break;

      case "education":
        await handleEducationSync(action, data);
        break;

      case "association":
        await handleAssociationSync(action, data);
        break;

      case "political_party":
        await handlePoliticalPartySync(action, data);
        break;

      case "relationship":
        await handleRelationshipSync(action, data);
        break;

      default:
        return NextResponse.json(
          { error: `Unknown entity type: ${entityType}` },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      message: `${entityType} ${action}d successfully`
    });
  } catch (error) {
    console.error("[Neo4j Sync API] Error:", error);
    return NextResponse.json(
      {
        error: "Sync failed",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// Helper functions for each entity type

async function handlePersonSync(action: string, data: any) {
  switch (action) {
    case "batch":
      if (!Array.isArray(data))
        throw new Error("Data must be an array for batch action");
      await PersonNeo4jSyncService.syncPersonsBatch(data);
      break;

    case "create":
    case "update":
      if (!data.code) throw new Error("Person code is required");
      await PersonNeo4jSyncService.syncPerson(data);
      break;

    case "delete":
      if (!data.code) throw new Error("Person code is required");
      await PersonNeo4jSyncService.deletePerson(data.code);
      break;

    default:
      throw new Error(`Unknown action: ${action}`);
  }
}

async function handleCompanySync(action: string, data: any) {
  switch (action) {
    case "batch":
      if (!Array.isArray(data))
        throw new Error("Data must be an array for batch action");
      await CompanyNeo4jSyncService.syncCompaniesBatch(data);
      break;

    case "create":
    case "update":
      if (!data.code) throw new Error("Company code is required");
      await CompanyNeo4jSyncService.syncCompany(data);
      break;

    case "delete":
      if (!data.code) throw new Error("Company code is required");
      await CompanyNeo4jSyncService.deleteCompany(data.code);
      break;

    default:
      throw new Error(`Unknown action: ${action}`);
  }
}

async function handleEducationSync(action: string, data: any) {
  switch (action) {
    case "create":
    case "update":
      if (!data.code) throw new Error("Education code is required");
      await EducationNeo4jSyncService.syncEducation(data);
      break;

    case "delete":
      if (!data.code) throw new Error("Education code is required");
      await EducationNeo4jSyncService.deleteEducation(data.code);
      break;

    default:
      throw new Error(`Unknown action: ${action}`);
  }
}

async function handleAssociationSync(action: string, data: any) {
  switch (action) {
    case "create":
    case "update":
      if (!data.code) throw new Error("Association code is required");
      await AssociationNeo4jSyncService.syncAssociation(data);
      break;

    case "delete":
      if (!data.code) throw new Error("Association code is required");
      await AssociationNeo4jSyncService.deleteAssociation(data.code);
      break;

    default:
      throw new Error(`Unknown action: ${action}`);
  }
}

async function handlePoliticalPartySync(action: string, data: any) {
  switch (action) {
    case "create":
    case "update":
      if (!data.code) throw new Error("Political party code is required");
      await PoliticalPartyNeo4jSyncService.syncPoliticalParty(data);
      break;

    case "delete":
      if (!data.code) throw new Error("Political party code is required");
      await PoliticalPartyNeo4jSyncService.deletePoliticalParty(data.code);
      break;

    default:
      throw new Error(`Unknown action: ${action}`);
  }
}

async function handleRelationshipSync(action: string, data: any) {
  const { relationshipType, ...params } = data;

  if (action === "batch") {
    if (!Array.isArray(data))
      throw new Error("Data must be an array for batch action");

    // For now we only support batching WORKS_FOR since it's the main concern for Excel import
    // Extend for other types as needed
    const worksForItems = data.filter(
      (item) => item.relationshipType === "WORKS_FOR"
    );
    if (worksForItems.length > 0) {
      await RelationshipNeo4jSyncService.syncWorkRelationshipsBatch(
        worksForItems
      );
    }
    return;
  }

  switch (action) {
    case "create":
    case "update":
      switch (relationshipType) {
        case "WORKS_FOR":
          await RelationshipNeo4jSyncService.syncWorkRelationship(params);
          break;

        case "STUDIED_AT":
          await RelationshipNeo4jSyncService.syncStudyRelationship(params);
          break;

        case "MEMBER_OF":
          await RelationshipNeo4jSyncService.syncMembershipRelationship(params);
          break;

        case "SUPPORTS":
        case "OPPOSES":
          await RelationshipNeo4jSyncService.syncPoliticalRelationship({
            ...params,
            type: relationshipType
          });
          break;

        default:
          throw new Error(`Unknown relationship type: ${relationshipType}`);
      }
      break;

    case "delete":
      await RelationshipNeo4jSyncService.deletePersonRelationship(params);
      break;

    case "delete_all":
      await RelationshipNeo4jSyncService.deleteAllRelationships({
        personCode: params.personCode,
        relationshipType: relationshipType as any
      });
      break;

    default:
      throw new Error(`Unknown action: ${action}`);
  }
}
