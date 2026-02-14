"use client";

import useELK from "@/hooks/use-elk";
import { cn } from "@/lib/utils";
import {
  Background,
  Edge,
  MarkerType,
  Node,
  ReactFlow,
  ReactFlowInstance,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { ElkExtendedEdge, ElkNode } from "elkjs/lib/elk-api";
import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { CenterCompanyNode } from "./custom-element/center-company-node";
import { CenterNode } from "./custom-element/center-node";
import CircleBlueNode from "./custom-element/circle-blue-node";
import CustomEdge from "./custom-element/custom-edge";
import FloatingConnectionLine from "./custom-element/floating-connection-line";
import FloatingEdge from "./custom-element/floating-edge";
import { GroupNode } from "./custom-element/group-node";
import HexagonNode from "./custom-element/hexagon-node";
import PentagonNode from "./custom-element/pentagon-node";
import RoundedTriangleNode from "./custom-element/rounded-triangle-node";
import CircleRedNode from "./custom-element/circle-red-node";

type Props = {
  initialNodes: Node[];
  initialEdges: Edge[];
  children: (props: {
    isInfoShowed: boolean;
    setIsInfoShowed: React.Dispatch<React.SetStateAction<boolean>>;
    selectedNode: string | null;
    setSelectedNode: React.Dispatch<React.SetStateAction<string | null>>;
    reactFlowInstance: ReactFlowInstance<Node, Edge>;
  }) => React.ReactNode;
  classNames?: Partial<{
    container?: string;
  }>;
};

const nodeTypes = {
  centerNode: CenterNode, // person center
  centerCompanyNode: CenterCompanyNode, // company center
  circleBlueNode: CircleBlueNode, // person
  hexagonNode: HexagonNode, // education
  pentagonNode: PentagonNode, // company
  roundedTriangleNode: RoundedTriangleNode, // political party
  circleRedNode: CircleRedNode, // association
  groupNode: GroupNode
};

const edgeTypes = {
  customEdge: CustomEdge,
  floating: FloatingEdge
};

export default function SpiderGraph({
  initialEdges,
  initialNodes,
  children,
  classNames
}: Props) {
  const [isInfoShowed, setIsInfoShowed] = useState(true);
  const elk = useELK();

  const elkOptions = {
    "elk.algorithm": "radial",
    "elk.layered.spacing.nodeNodeBetweenLayers": "80", // Mengatur jarak antar node
    // "elk.layered.spacing.nodeNode": "60", // Mengatur jarak antar node dalam satu layer
    "elk.spacing.nodeNode": "20" // Jarak antar node secara keseluruhan
  };

  const getLayoutedElements = useCallback(
    async (
      nodes: Node[],
      edges: Edge[],
      options: Record<string, string> = {}
    ): Promise<{
      nodes: ElkNode[];
      edges: ElkExtendedEdge[];
    }> => {
      if (!elk)
        return {
          nodes: [],
          edges: []
        };

      const isHorizontal = options?.["elk.direction"] === "RIGHT";
      const graph: ElkNode = {
        id: "root",
        layoutOptions: options,
        children: nodes.map((node) => ({
          ...node,
          // Adjust the target and source handle positions based on the layout
          // direction.
          targetPosition: isHorizontal ? "left" : "top",
          sourcePosition: isHorizontal ? "right" : "bottom",

          // Hardcode a width and height for elk to use when layouting.
          width: node.type === "centerNode" ? 165 : 32,
          height: node.type === "centerNode" ? 48 : 32
        })),
        edges: edges as unknown as ElkExtendedEdge[]
      };

      try {
        const layoutedGraph = await elk.layout(graph);
        if (!layoutedGraph || !layoutedGraph.children || !layoutedGraph.edges)
          return { nodes: [], edges: [] };

        return {
          nodes: layoutedGraph.children.map((node) => ({
            ...node,
            // React Flow expects a position property on the node instead of `x` and `y` fields.
            position: { x: node.x, y: node.y }
          })),
          edges: layoutedGraph.edges
        };
      } catch (error) {
        console.error(error);
        return { nodes: [], edges: [] }; // fallback
      }

      // return elk
      //   .layout(graph)
      //   .then((layoutedGraph) => ({
      //     nodes: layoutedGraph?.children?.map((node) => ({
      //       ...node,
      //       // React Flow expects a position property on the node instead of `x`
      //       // and `y` fields.
      //       position: { x: node.x, y: node.y }
      //     })),

      //     edges: layoutedGraph.edges
      //   }))
      //   .catch(console.error);
    },
    [elk]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Parameters<typeof addEdge>[0]) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "floating",
            markerEnd: { type: MarkerType.ArrowClosed }
          },
          eds
        )
      ),
    [setEdges]
  );
  const reactFlowInstance = useReactFlow();
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedParentNodeId, setSelectedParentNodeId] = useState<
    string | null
  >(null);

  const connectedNodeIds = useMemo(() => {
    if (!selectedNode) return [];
    const connectedEdges = edges.filter(
      (e) => e.source === selectedNode || e.target === selectedNode
    );
    const connectedIds = connectedEdges.flatMap((e) => [e.source, e.target]);
    return Array.from(new Set(connectedIds));
  }, [selectedNode, edges]);

  const styledNodes = useMemo(() => {
    return nodes.map((node) => {
      const isConnected = connectedNodeIds.includes(node.id);
      const isNodeInsideGroupSelected = node.id === selectedParentNodeId;

      const opacity = selectedNode
        ? isConnected || isNodeInsideGroupSelected
          ? 1
          : 0.3 // redupkan node yang tidak berhubungan
        : 1;

      // Only return a new object if the style actually changed
      if (node.style?.opacity === opacity) return node;

      return {
        ...node,
        style: {
          ...node.style,
          opacity,
          transition: "opacity 0.3s ease"
        }
      };
    });
  }, [nodes, connectedNodeIds, selectedNode, selectedParentNodeId]);

  const styledEdges = useMemo(() => {
    return edges.map((edge) => {
      const opacity =
        selectedNode &&
        !(
          connectedNodeIds.includes(edge.source) &&
          connectedNodeIds.includes(edge.target)
        )
          ? 0.3
          : 1;

      // Only return a new object if the style actually changed
      if (edge.style?.opacity === opacity) return edge;

      return {
        ...edge,
        style: {
          ...edge.style,
          opacity,
          transition: "opacity 0.3s ease"
        }
      };
    });
  }, [edges, connectedNodeIds, selectedNode]);

  const onLayout = useCallback(
    ({
      direction,
      useInitialNodes = false
    }: {
      direction: string;
      useInitialNodes?: boolean;
    }) => {
      const opts = { "elk.direction": direction, ...elkOptions };
      const ns = useInitialNodes ? initialNodes : nodes;
      const es = useInitialNodes ? initialEdges : edges;

      getLayoutedElements(ns, es, opts).then(
        ({ nodes: layoutedNodes, edges: layoutedEdges }) => {
          setNodes(layoutedNodes as unknown as Node[]);
          setEdges(layoutedEdges as unknown as Edge[]);
          reactFlowInstance.fitView();
        }
      );
    },
    [nodes, edges, initialNodes, initialEdges, getLayoutedElements]
  );

  useLayoutEffect(() => {
    if (!elk) return;
    onLayout({ direction: "DOWN", useInitialNodes: true });
  }, [elk, initialNodes, initialEdges]);

  if (!elk) return <>Loading Spider...</>;

  return (
    <div
      className={cn(
        "relative w-full h-[677px] lg:h-[403px] lg:aspect-video border-2 border-border rounded-2lg transition duration-1000",
        classNames?.container
      )}
    >
      <ReactFlow
        fitView
        fitViewOptions={{
          padding: 8
          // maxZoom: 0.5
        }}
        nodes={styledNodes}
        edges={styledEdges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onPaneClick={() => setSelectedNode(null)}
        onNodeClick={(_, node) => {
          setSelectedNode((prev) => {
            if (node.type === "groupNode") return null;
            // if (node.type === "centerNode") return null;
            return prev === node.id ? null : node.id;
          });

          setSelectedParentNodeId(node.parentId || null);
        }}
        defaultEdgeOptions={{
          type: "customEdge",
          markerEnd: {
            type: "arrowclosed",
            color: "rgba(36, 71, 213, 1)"
          }
        }}
        connectionLineComponent={FloatingConnectionLine}
        nodesConnectable={false}
      >
        <Background
          style={{
            opacity: 0.2
          }}
          gap={20}
          size={3}
          bgColor="var(--body)"
        />
      </ReactFlow>

      {children({
        isInfoShowed,
        setIsInfoShowed,
        selectedNode,
        setSelectedNode,
        reactFlowInstance
      })}
    </div>
  );
}
