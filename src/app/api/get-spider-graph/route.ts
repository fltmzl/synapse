import { NextResponse } from "next/server";
import { SpiderGraphService } from "./services/spider-graph.service";
import {
  Neo4jData,
  Neo4jRecord,
  transformNeo4jToReactFlow
} from "@/components/spider-graph/utils/graph-transformer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, id } = body;

    if (!type || !id) {
      return NextResponse.json(
        { error: "Missing type or id in payload" },
        { status: 400 }
      );
    }

    if (type !== "company" && type !== "person") {
      return NextResponse.json(
        { error: "Invalid type. Must be 'company' or 'person'" },
        { status: 400 }
      );
    }

    const data = await SpiderGraphService.getSpiderGraph(type, id);

    const neo4jRecords = data.records as unknown as Neo4jRecord[];

    const reactFlowData = transformNeo4jToReactFlow({
      data: {
        records: neo4jRecords
      }
    });

    return NextResponse.json({ data: reactFlowData });
  } catch (err: unknown) {
    const error = err as Error;

    console.error("Error in get-spider-graph API:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
