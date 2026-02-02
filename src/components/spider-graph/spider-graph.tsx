"use client";

import GeneralInfo from "@/app/(main)/(landing-page)/actors/[slug]/components/general-info";
import useELK from "@/hooks/use-elk";
import { ArrowRightIcon } from "@/icons/arrow-right-icon";
import { BuildingIcon } from "@/icons/building-icon";
import { MapPinIcon } from "@/icons/map-pin-icon";
import { PlusIcon } from "@/icons/plus-icon";
import { SearchIcons } from "@/icons/search-icon";
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
import { MaximizeIcon, MinusIcon, XIcon } from "lucide-react";
import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "../ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CenterNode } from "./custom-element/center-node";
import CircleBlueNode from "./custom-element/circle-blue-node";
import CustomEdge from "./custom-element/custom-edge";
import FloatingConnectionLine from "./custom-element/floating-connection-line";
import FloatingEdge from "./custom-element/floating-edge";
import { GroupNode } from "./custom-element/group-node";
import DiamondIcon from "./custom-element/nodes/icons/diamond-icon";
import HexagonIcon from "./custom-element/nodes/icons/hexagon-icon";
import PentagonIcon from "./custom-element/nodes/icons/pentagon-icon";
import RoundedCircleIcon from "./custom-element/nodes/icons/rounded-circle-icon";
import RoundedTriangleIcon from "./custom-element/nodes/icons/rounded-triangle-icon";
import { cn } from "@/lib/utils";

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
  centerNode: CenterNode,
  circleBlueNode: CircleBlueNode,
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
    [nodes, edges, getLayoutedElements]
  );

  useLayoutEffect(() => {
    if (!elk) return;
    onLayout({ direction: "DOWN", useInitialNodes: true });
  }, [elk]);

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

      {/*<div className="absolute top-4 left-4 w-[290px]">
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

      {selectedNode && (
        <div className="absolute top-4 left-4 rounded-lg bg-background border w-full max-w-[300px] z-[2] @xl: bg-blue-400">
          <div className="p-4">
            <div>
              <Avatar className="w-10 h-10 rounded-sm border">
                <AvatarImage
                  src={"http://placehold.jpw/100x100.png"}
                  alt={"actor"}
                />
                <AvatarFallback className="rounded-sm bg-body">
                  <BuildingIcon />
                </AvatarFallback>
              </Avatar>

              <h3 className="font-medium mt-3">Caribbean Business Council</h3>
              <span className="text-sm text-muted-foreground">
                Business Organization
              </span>
            </div>

            <button className="absolute top-4 right-4">
              <XIcon size={20} className="text-muted-foreground" />
            </button>
          </div>

          <hr />

          <div className="p-4">
            <GeneralInfo
              size="sm"
              icon={MapPinIcon}
              label="Location"
              value="Bridgetown, Barbados"
            />

            <p className="text-sm mt-4">
              Regional business council supporting economic cooperation among
              Caribbean territories.
            </p>
          </div>

          <hr />

          <div className="p-4">
            <h3 className="font-medium">Connections with Isabelle</h3>

            <div className="text-sm mt-4 space-y-4">
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Relation type</span>
                <span>Affiliation</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Role</span>
                <span>Consultant</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Period</span>
                <span>2013-2017</span>
              </div>
            </div>
          </div>

          <hr />

          <div className="p-4">
            <Button className="w-full" variant="outline">
              View full profile <ArrowRightIcon />{" "}
            </Button>
          </div>
        </div>
      )}

      <div className="absolute top-4 right-4 z-[1]">
        <Accordion
          type="single"
          collapsible
          className="w-full border rounded-sm"
        >
          <AccordionItem
            value="item-1"
            className="rounded-t-sm rounded-b-sm [&[data-state=open]>button]:rounded-b-none overflow-hidden"
          >
            <AccordionTrigger className="bg-background gap-14 py-2 px-3 hover:no-underline rounded-none">
              Indicator
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-3 bg-background border-t p-3">
              <div className="flex justify-between">
                <Label htmlFor="person" className="font-normal text-xs">
                  <RoundedCircleIcon />
                  Person
                </Label>
                <Checkbox id="person" name="person" className="size-4" />
              </div>

              <div className="flex justify-between">
                <Label htmlFor="organization" className="font-normal text-xs">
                  <PentagonIcon />
                  Organization
                </Label>
                <Checkbox
                  id="organization"
                  name="organization"
                  className="size-4"
                />
              </div>

              <div className="flex justify-between">
                <Label htmlFor="government" className="font-normal text-xs">
                  <DiamondIcon />
                  Government
                </Label>
                <Checkbox
                  id="government"
                  name="government"
                  className="size-4"
                />
              </div>

              <div className="flex justify-between">
                <Label htmlFor="party" className="font-normal text-xs">
                  <RoundedTriangleIcon />
                  Party
                </Label>
                <Checkbox id="party" name="party" className="size-4" />
              </div>

              <div className="flex justify-between">
                <Label htmlFor="education" className="font-normal text-xs">
                  <HexagonIcon />
                  Education
                </Label>
                <Checkbox id="education" name="education" className="size-4" />
              </div>

              <div className="flex justify-between">
                <Label htmlFor="association" className="font-normal text-xs">
                  <HexagonIcon color="#29CC6A" />
                  Association
                </Label>
                <Checkbox
                  id="association"
                  name="association"
                  className="size-4"
                />
              </div>

              <div className="flex justify-between">
                <Label htmlFor="media" className="font-normal text-xs">
                  <RoundedCircleIcon color="#8C31F4" />
                  Media
                </Label>
                <Checkbox id="media" name="media" className="size-4" />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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
      </div>*/}
    </div>
  );
}
