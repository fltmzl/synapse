import { Node, Edge } from "@xyflow/react";
import { Record, RecordShape } from "neo4j-driver";

// Neo4j Types
interface Neo4jIdentity {
  low: number;
  high: number;
}

interface Neo4jProperties {
  id: string;
  name: string;
  role?: string[];
  category?: string;
  label?: string;
  [key: string]: unknown;
}

interface Neo4jNode {
  identity: Neo4jIdentity;
  labels: string[];
  properties: Neo4jProperties;
  elementId: string;
}

interface Neo4jRelationship {
  identity: Neo4jIdentity;
  start: Neo4jIdentity;
  end: Neo4jIdentity;
  type: string;
  properties: Neo4jProperties;
  elementId: string;
  startNodeElementId: string;
  endNodeElementId: string;
}

interface Neo4jSegment {
  start: Neo4jNode;
  relationship: Neo4jRelationship;
  end: Neo4jNode;
}

interface Neo4jPath {
  start: Neo4jNode;
  end: Neo4jNode;
  segments: Neo4jSegment[];
  length: number;
}

export interface Neo4jRecord {
  keys: string[];
  length: number;
  _fields: (Neo4jNode | Neo4jPath)[];
  _fieldLookup: { [key: string]: number };
}

export interface Neo4jData {
  data: {
    records: Neo4jRecord[];
    // records: Record<
    //   RecordShape,
    //   PropertyKey,
    //   RecordShape<PropertyKey, number>
    // >[];
  };
}

// React Flow Types
export interface CustomNodeData {
  label?: string;
  name: string;
  role?: string[] | null;
  category?: string;
  [key: string]: unknown;
}

type NodeType =
  | "centerNode"
  | "centerPersonNode"
  | "circleBlueNode"
  | "hexagonNode"
  | "pentagonNode"
  | "default";

interface NodeStyle {
  padding: number;
  borderRadius: number;
  border: string;
  fontSize: number;
  fontWeight: number;
  backgroundColor?: string;
  borderColor?: string;
  color?: string;
}

interface EdgeStyle {
  strokeWidth: number;
  stroke?: string;
}

export interface TransformResult {
  nodes: Node<CustomNodeData>[];
  edges: Edge[];
}

/**
 * Transform Neo4j graph data to React Flow format
 */
export function transformNeo4jToReactFlow(
  neo4jData: Neo4jData
): TransformResult {
  const nodesMap = new Map<string, Node<CustomNodeData>>();
  const edgesMap = new Map<string, Edge>();

  // Process all records from Neo4j response
  neo4jData.data.records.forEach((record) => {
    const fields = record._fields;

    // Process center node
    if (fields[0] && "labels" in fields[0]) {
      const centerNode = fields[0] as Neo4jNode;
      addNode(nodesMap, centerNode);
    }

    // Process path if exists
    const pathField = fields[1];
    if (pathField && "segments" in pathField) {
      const path = pathField as Neo4jPath;
      path.segments.forEach((segment) => {
        // Add start node
        addNode(nodesMap, segment.start);

        // Add end node
        addNode(nodesMap, segment.end);

        // Add relationship as edge
        addEdge(edgesMap, segment.relationship, segment.start, segment.end);
      });
    }
  });

  return {
    nodes: Array.from(nodesMap.values()),
    edges: Array.from(edgesMap.values())
  };
}

/**
 * Add node to nodes map
 */
function addNode(
  nodesMap: Map<string, Node<CustomNodeData>>,
  nodeData: Neo4jNode
): void {
  const nodeId = nodeData.properties.id || nodeData.elementId;

  if (!nodesMap.has(nodeId)) {
    const node: Node<CustomNodeData> = {
      id: nodeId,
      type: getNodeType(nodeData.properties.category || "Company"),
      data: {
        label: nodeData.properties.name,
        name: nodeData.properties.name,
        role: nodeData.properties.role?.length ? nodeData.properties.role : [],
        category: nodeData.properties.category
        // ...nodeData.properties
      },
      position: { x: 0, y: 0 } // Will be calculated by layout algorithm
      // style: getNodeStyle(nodeData.labels)
    };

    nodesMap.set(nodeId, node);
  }
}

/**
 * Add edge to edges map
 */
function addEdge(
  edgesMap: Map<string, Edge>,
  relationship: Neo4jRelationship,
  startNode: Neo4jNode,
  endNode: Neo4jNode
): void {
  const edgeId = relationship.elementId;

  if (!edgesMap.has(edgeId)) {
    const edge: Edge = {
      id: edgeId,
      source: startNode.properties.id || startNode.elementId,
      target: endNode.properties.id || endNode.elementId,
      label: relationship.properties.label,
      type: "customEdge",
      animated: false
      // style: getEdgeStyle(relationship.type)
    };

    edgesMap.set(edgeId, edge);
  }
}

/**
 * Determine node type based on labels
 */
// function getNodeType(labels: string[]): NodeType {
//   if (labels.includes("Company")) return "centerNode";
//   if (labels.includes("Division")) return "circleBlueNode";
//   if (labels.includes("Person")) return "circleBlueNode";
//   return "default";
// }
function getNodeType(category: string): NodeType {
  if (category.toLowerCase() === "PERSON".toLowerCase()) return "centerNode";
  if (category.toLowerCase() === "ORGANIZATION".toLowerCase())
    return "pentagonNode";
  return "circleBlueNode";
}

/**
 * Get node styling based on type
 */
function getNodeStyle(labels: string[]): NodeStyle {
  const baseStyle: NodeStyle = {
    padding: 10,
    borderRadius: 5,
    border: "2px solid",
    fontSize: 12,
    fontWeight: 500
  };

  if (labels.includes("Company")) {
    return {
      ...baseStyle,
      backgroundColor: "#e3f2fd",
      borderColor: "#1976d2",
      color: "#0d47a1"
    };
  }

  if (labels.includes("Division")) {
    return {
      ...baseStyle,
      backgroundColor: "#f3e5f5",
      borderColor: "#7b1fa2",
      color: "#4a148c"
    };
  }

  if (labels.includes("Person")) {
    return {
      ...baseStyle,
      backgroundColor: "#e8f5e9",
      borderColor: "#388e3c",
      color: "#1b5e20"
    };
  }

  return baseStyle;
}

/**
 * Get edge styling based on relationship type
 */
function getEdgeStyle(relationType: string): EdgeStyle {
  const baseStyle: EdgeStyle = {
    strokeWidth: 2
  };

  switch (relationType) {
    case "HEAD_DIVISION":
      return { ...baseStyle, stroke: "#1976d2" };
    case "HEAD_BY":
      return { ...baseStyle, stroke: "#7b1fa2" };
    case "MANAGES":
      return { ...baseStyle, stroke: "#388e3c" };
    case "EXECUTIVE":
      return { ...baseStyle, stroke: "#d32f2f" };
    case "REGIONAL_LEADERSHIP":
      return { ...baseStyle, stroke: "#f57c00" };
    default:
      return { ...baseStyle, stroke: "#757575" };
  }
}

/**
 * Apply automatic layout to nodes using hierarchical positioning
 */

// Example usage
/*
const neo4jData: Neo4jData = // your Neo4j data
const { nodes, edges } = transformNeo4jToReactFlow(neo4jData);
const layoutedNodes = applyHierarchicalLayout(nodes, edges);

console.log('Nodes:', layoutedNodes);
console.log('Edges:', edges);
*/
