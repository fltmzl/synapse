"use client";

import { PlusIcon } from "@/icons/plus-icon";
import { SearchIcons } from "@/icons/search-icon";
import {
  Background,
  Edge,
  MarkerType,
  Node,
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { MaximizeIcon, MinusIcon, XIcon } from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState
} from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { CenterNode } from "./custom-element/center-node";
import CircleBlueNode from "./custom-element/circle-blue-node";
import CustomEdge from "./custom-element/custom-edge";
import FloatingConnectionLine from "./custom-element/floating-connection-line";
import FloatingEdge from "./custom-element/floating-edge";
import { GroupNode } from "./custom-element/group-node";
import useELK from "@/hooks/use-elk";

type Props = {
  initialNodes: Node[];
  initialEdges: Edge[];
};

const nodeTypes = {
  centerNode: CenterNode,
  circleBlueNode: CircleBlueNode,
  groupNode: GroupNode
};

const edgeTypes = {
  customEdge: CustomEdge,
  floating: FloatingEdge
};

export default function SpiderGraph({ initialEdges, initialNodes }: Props) {
  const [isInfoShowed, setIsInfoShowed] = useState(true);
  const elk = useELK();

  const elkOptions = {
    "elk.algorithm": "radial",
    "elk.layered.spacing.nodeNodeBetweenLayers": "80", // Mengatur jarak antar node
    // "elk.layered.spacing.nodeNode": "60", // Mengatur jarak antar node dalam satu layer
    "elk.spacing.nodeNode": "20" // Jarak antar node secara keseluruhan
  };

  const getLayoutedElements = useCallback(
    (nodes: Node[], edges: Edge[], options: Record<string, string> = {}) => {
      if (!elk) return null;

      const isHorizontal = options?.["elk.direction"] === "RIGHT";
      const graph = {
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
        edges: edges
      };

      return elk
        .layout(graph)
        .then((layoutedGraph) => ({
          nodes: layoutedGraph.children.map((node) => ({
            ...node,
            // React Flow expects a position property on the node instead of `x`
            // and `y` fields.
            position: { x: node.x, y: node.y }
          })),

          edges: layoutedGraph.edges
        }))
        .catch(console.error);
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
  const { zoomIn, fitView, zoomOut } = useReactFlow();
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

  const styledNodes = nodes.map((node) => {
    const isConnected = connectedNodeIds.includes(node.id);
    const isNodeInsideGroupSelected = node.id === selectedParentNodeId;

    return {
      ...node,
      style: {
        ...node.style,
        opacity: selectedNode
          ? isConnected || isNodeInsideGroupSelected
            ? 1
            : 0.3 // redupkan node yang tidak berhubungan
          : 1,
        transition: "opacity 0.3s ease"
      }
    };
  });

  const styledEdges = edges.map((edge) => ({
    ...edge,
    style: {
      ...edge.style,
      opacity:
        selectedNode &&
        !(
          connectedNodeIds.includes(edge.source) &&
          connectedNodeIds.includes(edge.target)
        )
          ? 0.3
          : 1,
      transition: "opacity 0.3s ease"
    }
  }));

  // const runElkLayout = useCallback(async () => {
  //   if (!elk) return;

  //   const graph = {
  //     id: "root",
  //     layoutOptions: {
  //       algorithm: "radial", // <--- ini kuncinya
  //       "elk.direction": "DOWN",
  //       "elk.layered.spacing.nodeNodeBetweenLayers": "100",
  //       "elk.spacing.nodeNode": "60"
  //     },
  //     children: nodes.map((n) => ({
  //       id: n.id,
  //       width: 100,
  //       height: 60
  //     })),
  //     edges: edges.map((e) => ({
  //       id: e.id,
  //       sources: [e.source],
  //       targets: [e.target]
  //     }))
  //   };

  //   const layout = await elk.layout(graph);

  //   // apply posisi hasil ELK ke node React Flow
  //   const laidOutNodes = nodes.map((node) => {
  //     const layoutNode = layout?.children?.find((n) => n.id === node.id);

  //     return {
  //       ...node,
  //       position: { x: layoutNode.x, y: layoutNode.y }
  //     } as Node;
  //   });

  //   setNodes(laidOutNodes);
  // }, [nodes, edges, elk]);

  // useEffect(() => {
  //   runElkLayout();
  // }, [runElkLayout]);

  const onLayout = useCallback(
    ({ direction, useInitialNodes = false }) => {
      const opts = { "elk.direction": direction, ...elkOptions };
      const ns = useInitialNodes ? initialNodes : nodes;
      const es = useInitialNodes ? initialEdges : edges;

      getLayoutedElements(ns, es, opts).then(
        ({ nodes: layoutedNodes, edges: layoutedEdges }) => {
          setNodes(layoutedNodes);
          setEdges(layoutedEdges);
          fitView();
        }
      );
    },
    [nodes, edges, getLayoutedElements]
  );

  useLayoutEffect(() => {
    if (!elk) return;
    onLayout({ direction: "DOWN", useInitialNodes: true });
  }, [elk]);

  console.log({ elk });

  if (!elk) return <>Loading Spider...</>;

  return (
    <div className="relative w-full h-[677px] lg:h-[403px] lg:aspect-video border-2 border-border rounded-2lg transition duration-1000">
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
      <div className="absolute top-4 left-4 w-[290px]">
        <div className="relative">
          <Input placeholder="Find connection" className="h-10 pl-4 pr-13" />
          <Button
            size="icon"
            className="size-8 rounded-sm absolute top-1 right-1 bg-secondary"
          >
            <SearchIcons />
          </Button>
        </div>

        {isInfoShowed && (
          <Card className="p-4 gap-2 mt-2 relative">
            <h5 className="text-base font-medium">
              Explore Isabelle’s Network
            </h5>
            <p>
              Click on a node to view detailed information about the connection.
            </p>
            <button
              className="text-muted-foreground absolute top-2 right-2"
              onClick={() => setIsInfoShowed(false)}
            >
              <XIcon className="size-5" />
            </button>
          </Card>
        )}
      </div>
      <div className="absolute bottom-5 right-5 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <Button
            size="icon"
            className="size-10 rounded-sm"
            variant="outline"
            onClick={() => zoomIn()}
          >
            <PlusIcon className="size-5" />
          </Button>
          <Button
            size="icon"
            className="size-10 rounded-sm"
            variant="outline"
            onClick={() => zoomOut()}
          >
            <MinusIcon className="size-5" />
          </Button>
        </div>
        <Button
          size="icon"
          className="size-10 rounded-sm"
          variant="outline"
          onClick={() => fitView()}
        >
          <MaximizeIcon />
        </Button>
      </div>
    </div>
  );
}
