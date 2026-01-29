/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { BaseNeo4jSyncService } from "@/services/neo4j";

export const dynamic = "force-dynamic";

/**
 * Spider Graph Query API Route
 * GET /api/neo4j/spider-graph?code=PERSON_12345&depth=2
 *
 * Returns spider graph data for a person
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const depth = parseInt(searchParams.get("depth") || "2");

    if (!code) {
      return NextResponse.json(
        { error: "Missing required parameter: code" },
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

    // Query for spider graph data
    const query = `
      MATCH (center:Person {code: $code})
      
      // Get work relationships
      OPTIONAL MATCH workPath = (center)-[work:WORKS_FOR*1..${depth}]-(org:Organization {category: "COMPANY"})
      
      // Get education relationships
      OPTIONAL MATCH eduPath = (center)-[edu:STUDIED_AT]-(education:Education)
      
      // Get association memberships
      OPTIONAL MATCH assocPath = (center)-[mem:MEMBER_OF]-(assoc:Organization {category: "ASSOCIATION"})
      
      // Get political relationships
      OPTIONAL MATCH politicalPath = (center)-[pol:SUPPORTS|OPPOSES]-(party:PoliticalEntity)
      
      RETURN 
        center,
        collect(DISTINCT workPath) as workPaths,
        collect(DISTINCT eduPath) as eduPaths,
        collect(DISTINCT assocPath) as assocPaths,
        collect(DISTINCT politicalPath) as politicalPaths
    `;

    const results = await BaseNeo4jSyncService["executeQuery"](query, {
      code,
      depth
    });

    if (!results || results.length === 0) {
      return NextResponse.json(
        { error: "Person not found in graph" },
        { status: 404 }
      );
    }

    // Transform results to graph format
    const graphData = transformToGraphData(results[0]);

    return NextResponse.json(graphData);
  } catch (error) {
    console.error("[Spider Graph API] Error:", error);
    return NextResponse.json(
      {
        error: "Query failed",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

/**
 * Transform Neo4j results to graph data format
 */
function transformToGraphData(result: any) {
  const nodes: any[] = [];
  const edges: any[] = [];
  const nodeIds = new Set<string>();

  // Add center node
  const center = result.center.properties;
  if (center && center.code) {
    nodes.push({
      id: center.code,
      label: center.name,
      type: "person",
      data: center
    });
    nodeIds.add(center.code);
  }

  // Process each path type
  const pathTypes = [
    { paths: result.workPaths, relationshipType: "WORKS_FOR" },
    { paths: result.eduPaths, relationshipType: "STUDIED_AT" },
    { paths: result.assocPaths, relationshipType: "MEMBER_OF" },
    { paths: result.politicalPaths, relationshipType: "SUPPORTS" }
  ];

  pathTypes.forEach(({ paths, relationshipType }) => {
    if (!paths || paths.length === 0) return;

    paths.forEach((path: any) => {
      if (!path || !path.segments) return;

      path.segments.forEach((segment: any) => {
        // Add start node
        const start = segment.start.properties;
        if (start && start.code && !nodeIds.has(start.code)) {
          nodes.push({
            id: start.code,
            label: start.name,
            type: getNodeType(start.category),
            data: start
          });
          nodeIds.add(start.code);
        }

        // Add end node
        const end = segment.end.properties;
        if (end && end.code && !nodeIds.has(end.code)) {
          nodes.push({
            id: end.code,
            label: end.name,
            type: getNodeType(end.category),
            data: end
          });
          nodeIds.add(end.code);
        }

        // Add edge
        const rel = segment.relationship;
        if (rel && start && end) {
          edges.push({
            id: `${start.code}-${rel.type}-${end.code}`,
            source: start.code,
            target: end.code,
            label: rel.properties.label || rel.type,
            type: rel.type,
            data: rel.properties
          });
        }
      });
    });
  });

  return {
    center: nodes.find((n) => n.id === center.code),
    nodes,
    edges,
    stats: {
      totalNodes: nodes.length,
      totalEdges: edges.length
    }
  };
}

/**
 * Get node type from category
 */
function getNodeType(category: string): string {
  const typeMap: Record<string, string> = {
    PERSON: "person",
    COMPANY: "company",
    ASSOCIATION: "association",
    EDUCATION: "education",
    POLITICAL_PARTY: "political_party"
  };

  return typeMap[category] || "unknown";
}
