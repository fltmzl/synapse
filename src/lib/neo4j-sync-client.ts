/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Neo4j Sync Client
 * Helper utility for calling Neo4j sync API
 */

export type SyncAction =
  | "create"
  | "update"
  | "delete"
  | "delete_all"
  | "batch";

export type EntityType =
  | "person"
  | "company"
  | "education"
  | "association"
  | "political_party"
  | "relationship";

interface SyncParams {
  action: SyncAction;
  entityType: EntityType;
  data: any;
}

/**
 * Call Neo4j sync API
 */
export async function syncToNeo4j(params: SyncParams): Promise<void> {
  console.log(
    `API ROUTE: Syncing ${params.entityType} (${params.action}) to Neo4j`
  );
  try {
    const response = await fetch("/api/neo4j/sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("[Neo4j Sync] Failed:", error);
    }
  } catch (error) {
    console.error("[Neo4j Sync] Error:", error);
  }
}

/**
 * Sync entities in batch to Neo4j
 */
export async function syncBatch(
  entityType: EntityType,
  items: any[]
): Promise<void> {
  if (items.length === 0) return;

  await syncToNeo4j({
    action: "batch",
    entityType,
    data: items
  });
}

/**
 * Sync person to Neo4j
 */
export async function syncPerson(
  action: SyncAction,
  person: any
): Promise<void> {
  await syncToNeo4j({
    action,
    entityType: "person",
    data: {
      code: person.code,
      id: person.id,
      name: person.name,
      slug: person.slug,
      profilePicture: person.profilePicture,
      currentJobPosition: person.currentJobPosition,
      email: person.email,
      phoneNumber: person.phoneNumber
    }
  });
}

/**
 * Sync company to Neo4j
 */
export async function syncCompany(
  action: SyncAction,
  company: any
): Promise<void> {
  await syncToNeo4j({
    action,
    entityType: "company",
    data: {
      code: company.code,
      id: company.id,
      name: company.name,
      slug: company.slug,
      profilePicture: company.profilePicture,
      description: company.description,
      email: company.email,
      phoneNumber: company.phoneNumber,
      website: company.website
    }
  });
}

/**
 * Sync education to Neo4j
 */
export async function syncEducation(
  action: SyncAction,
  education: any
): Promise<void> {
  await syncToNeo4j({
    action,
    entityType: "education",
    data: {
      code: education.code,
      id: education.id,
      name: education.name,
      slug: education.slug,
      profilePicture: education.profilePicture,
      description: education.description,
      link: education.link
    }
  });
}

/**
 * Sync association to Neo4j
 */
export async function syncAssociation(
  action: SyncAction,
  association: any
): Promise<void> {
  await syncToNeo4j({
    action,
    entityType: "association",
    data: {
      code: association.code,
      id: association.id,
      name: association.name,
      slug: association.slug,
      profilePicture: association.profilePicture,
      link: association.link
    }
  });
}

/**
 * Sync political party to Neo4j
 */
export async function syncPoliticalParty(
  action: SyncAction,
  party: any
): Promise<void> {
  await syncToNeo4j({
    action,
    entityType: "political_party",
    data: {
      code: party.code,
      id: party.id,
      name: party.name,
      slug: party.slug,
      profilePicture: party.profilePicture,
      description: party.description,
      email: party.email,
      phone: party.phone,
      website: party.website,
      registrationCode: party.registrationCode,
      implantation: party.implantation,
      territoryId: party.territoryId
    }
  });
}

/**
 * Sync relationship to Neo4j
 */
export async function syncRelationship(
  action: SyncAction,
  relationshipType: string,
  data: any
): Promise<void> {
  await syncToNeo4j({
    action,
    entityType: "relationship",
    data: {
      relationshipType,
      ...data
    }
  });
}
