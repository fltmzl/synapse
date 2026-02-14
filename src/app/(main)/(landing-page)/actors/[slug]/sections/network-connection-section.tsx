"use client";

import GeneralInfo from "@/app/(main)/(landing-page)/actors/[slug]/components/general-info";
import SectionContainer from "@/components/container/section-container";
import LabelValue from "@/components/label-value";
import DiamondIcon from "@/components/spider-graph/custom-element/nodes/icons/diamond-icon";
import HexagonIcon from "@/components/spider-graph/custom-element/nodes/icons/hexagon-icon";
import PentagonIcon from "@/components/spider-graph/custom-element/nodes/icons/pentagon-icon";
import RoundedCircleIcon from "@/components/spider-graph/custom-element/nodes/icons/rounded-circle-icon";
import RoundedTriangleIcon from "@/components/spider-graph/custom-element/nodes/icons/rounded-triangle-icon";
import SpiderGraph from "@/components/spider-graph/spider-graph";
import { CustomNodeData } from "@/components/spider-graph/utils/graph-transformer";
import {
  initialElements,
  mapCompanyPersonsToReactFlow
} from "@/components/spider-graph/utils/initialElements";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useIsClient from "@/hooks/use-is-client";
import useModal from "@/hooks/use-modal";
import { ArrowRightIcon } from "@/icons/arrow-right-icon";
import { BuildingIcon } from "@/icons/building-icon";
import { MapPinIcon } from "@/icons/map-pin-icon";
import { PlusIcon } from "@/icons/plus-icon";
import { SearchIcons } from "@/icons/search-icon";
import useCompany from "@/queries/use-company";
import useCompanyPersonById from "@/queries/use-company-person-by-id";
import usePersonById from "@/queries/use-person-by-id";
import usePoliticalPartyById from "@/queries/use-political-party-by-id";
import usePoliticalPartyPersonById from "@/queries/use-political-party-person-by-id";
import useSpiderGraph from "@/queries/use-spider-graph";
import { Node } from "@xyflow/react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ExpandIcon,
  MaximizeIcon,
  MinusIcon,
  UserIcon,
  XIcon
} from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer";
import { useWindowSize } from "@/hooks/use-window-size";

const CATEGORY_METADATA: Record<
  string,
  {
    label: string;
    icon: React.ComponentType<{ color?: string }>;
    color?: string;
  }
> = {
  PERSON: {
    label: "Person",
    icon: RoundedCircleIcon
  },
  ORGANIZATION: {
    label: "Organization",
    icon: PentagonIcon
  },
  GOVERNMENT: {
    label: "Government",
    icon: DiamondIcon
  },
  POLITICAL_PARTY: {
    label: "Political Party",
    icon: RoundedTriangleIcon
  },
  EDUCATION: {
    label: "Education",
    icon: HexagonIcon
  },
  ASSOCIATION: {
    label: "Association",
    icon: RoundedCircleIcon,
    color: "#fb2c36"
  },
  MEDIA: {
    label: "Media",
    icon: RoundedCircleIcon,
    color: "#8C31F4"
  }
};

const NetworkConnectionSkeleton = () => (
  <SectionContainer className="rounded-2lg">
    <div className="p-5 lg:px-6 border-b flex justify-between items-center">
      <Skeleton className="h-7 w-32" />
      <div className="flex gap-2 items-center">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
    </div>
    <div className="p-4 h-[400px]">
      <Skeleton className="w-full h-full rounded-md" />
    </div>
  </SectionContainer>
);

export default function NetworkConnectionSection() {
  const isClient = useIsClient();
  const { slug } = useParams();
  const { isOpen, openModal, setIsOpen } = useModal();
  const [search, setSearch] = useState("");
  const { data, isLoading } = useSpiderGraph("person", slug as string);

  // Use useMemo for stable categories and avoid unnecessary re-renders
  const availableCategories = useMemo(() => {
    const rawNodes = (data?.nodes as Node<CustomNodeData>[]) || [];
    const categories = new Set<string>();
    rawNodes.forEach((node) => {
      if (node.data?.category) {
        categories.add(node.data.category);
      }
    });
    return Array.from(categories);
  }, [data]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Sync selectedCategories when data loads or categories change for the first time
  const [hasInitializedCategories, setHasInitializedCategories] =
    useState(false);
  if (availableCategories.length > 0 && !hasInitializedCategories) {
    setSelectedCategories(availableCategories);
    setHasInitializedCategories(true);
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const { filteredNodes, filteredEdges } = useMemo(() => {
    const rawNodes = (data?.nodes as Node<CustomNodeData>[]) || [];
    const rawEdges = data?.edges || [];

    const nodes = rawNodes.filter((node) => {
      if (node.type === "centerNode") return true;

      const matchesSearch =
        !search ||
        node.data?.label?.toLowerCase().includes(search.toLowerCase()) ||
        node.data?.name?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        !node.data?.category || selectedCategories.includes(node.data.category);

      return matchesSearch && matchesCategory;
    });

    const nodeIds = new Set(nodes.map((n) => n.id));
    const edges = rawEdges.filter(
      (edge) => nodeIds.has(edge.source) && nodeIds.has(edge.target)
    );

    return { filteredNodes: nodes, filteredEdges: edges };
  }, [data, search, selectedCategories]);

  const initialEdges = filteredEdges;
  const initialNodes = filteredNodes;

  const currentCenterNode = initialNodes.find(
    (node) => node.type === "centerNode"
  );

  const { width } = useWindowSize();
  const isMobile = width < 1024;

  if (!isClient || isLoading) return <NetworkConnectionSkeleton />;

  return (
    <SectionContainer className="rounded-2lg">
      <div className="p-5 lg:px-6 border-b flex justify-between">
        <h2 className="text-xl font-medium">Cartographie</h2>

        <div className="flex gap-2 items-center">
          <span className="text-sm text-muted-foreground">Soutien</span>
          <Badge>FORT</Badge>
        </div>
      </div>

      <div className="p-4 @container">
        {!isOpen && (
          <SpiderGraph initialEdges={initialEdges} initialNodes={initialNodes}>
            {({ reactFlowInstance }) => (
              <>
                <div className="absolute top-2 right-2 flex flex-col gap-6">
                  <div className="flex flex-col gap-1">
                    <Button
                      size="icon"
                      className="size-10 rounded-sm text-muted-foreground"
                      variant="outline"
                      onClick={() => reactFlowInstance.zoomIn()}
                    >
                      <PlusIcon className="size-5" />
                    </Button>
                    <Button
                      size="icon"
                      className="size-10 rounded-sm text-muted-foreground"
                      variant="outline"
                      onClick={() => reactFlowInstance.zoomOut()}
                    >
                      <MinusIcon className="size-5" />
                    </Button>
                  </div>
                </div>

                <Button
                  size="icon"
                  className="absolute top-2 left-2 size-10 rounded-sm text-muted-foreground"
                  variant="outline"
                  onClick={() => openModal()}
                >
                  <ExpandIcon />
                </Button>
              </>
            )}
          </SpiderGraph>
        )}
      </div>

      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogHeader className="sr-only">
            <DialogTitle>Network Connection</DialogTitle>
            <DialogDescription>Network Connection Details</DialogDescription>
          </DialogHeader>
          {/* <DialogContent showCloseButton={false} className="lg:max-w-7xl"> */}
          <DialogContent
            showCloseButton={false}
            className="w-screen h-screen max-w-full lg:w-auto lg:h-auto lg:max-w-7xl"
          >
            {/* <div className="h-[700px]"> */}
            <div className="h-full lg:h-[700px] p-6 lg:p-0">
              <button className="lg:hidden">
                <XIcon size={28} />
              </button>

              <h2 className="font-medium text-2xl my-4 lg:hidden">
                Associate People
              </h2>

              <SpiderGraph
                initialEdges={initialEdges}
                initialNodes={initialNodes}
                classNames={{
                  container: "h-[90%] lg:h-full"
                }}
              >
                {({
                  isInfoShowed,
                  setIsInfoShowed,
                  selectedNode,
                  setSelectedNode,
                  reactFlowInstance
                }) => {
                  return (
                    <>
                      <div className="absolute top-4 left-4 w-[90%] lg:max-w-[290px]">
                        <div className="relative">
                          <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Find connection"
                            className="h-10 pl-4 pr-19"
                          />
                          <Button
                            size="icon"
                            className="size-8 rounded-sm absolute top-1 right-1 bg-secondary"
                          >
                            <SearchIcons />
                          </Button>
                          {search && (
                            <button
                              className="absolute top-1/2 -translate-y-1/2 right-13 text-muted-foreground"
                              onClick={() => setSearch("")}
                            >
                              <XIcon className="size-4" />
                            </button>
                          )}
                        </div>

                        {isInfoShowed && (
                          <Card className="p-4 gap-2 mt-2 relative">
                            <h5 className="text-base font-medium">
                              Explore {currentCenterNode?.data.label} Network
                            </h5>
                            <p>
                              Click on a node to view detailed information about
                              the connection.
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
                        <>
                          {currentCenterNode && (
                            <SelectedNodeDetails
                              currentCenterNode={currentCenterNode}
                              nodeId={selectedNode}
                              allNodes={initialNodes}
                              onClose={() => setSelectedNode(null)}
                              isMobile={isMobile}
                            />
                          )}
                        </>
                      )}

                      <div className="absolute bottom-4 top-auto lg:bottom-auto lg:top-4 right-4 z-[1]">
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
                              {availableCategories.map((category) => {
                                const metadata = CATEGORY_METADATA[
                                  category
                                ] || {
                                  label: category,
                                  icon: RoundedCircleIcon
                                };

                                return (
                                  <div
                                    key={category}
                                    className="flex justify-between"
                                  >
                                    <Label
                                      htmlFor={category}
                                      className="font-normal text-xs flex items-center gap-2"
                                    >
                                      <metadata.icon color={metadata.color} />
                                      {metadata.label}
                                    </Label>

                                    <Checkbox
                                      id={category}
                                      name={category}
                                      className="size-4"
                                      checked={selectedCategories.includes(
                                        category
                                      )}
                                      onCheckedChange={() =>
                                        toggleCategory(category)
                                      }
                                    />
                                  </div>
                                );
                              })}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      <div className="absolute bottom-5 right-5 hidden lg:flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                          <Button
                            size="icon"
                            className="size-10 rounded-sm"
                            variant="outline"
                            onClick={() => reactFlowInstance.zoomIn()}
                          >
                            <PlusIcon className="size-5" />
                          </Button>
                          <Button
                            size="icon"
                            className="size-10 rounded-sm"
                            variant="outline"
                            onClick={() => reactFlowInstance.zoomOut()}
                          >
                            <MinusIcon className="size-5" />
                          </Button>
                        </div>
                        <Button
                          size="icon"
                          className="size-10 rounded-sm"
                          variant="outline"
                          onClick={() => reactFlowInstance.fitView()}
                        >
                          <MaximizeIcon />
                        </Button>
                      </div>
                    </>
                  );
                }}
              </SpiderGraph>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </SectionContainer>
  );
}

// --- REFACTOR START ---

function NodeDetailsWrapper({
  onClose,
  children
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="absolute top-4 left-4 rounded-lg bg-background border w-full max-w-[300px] z-[2]">
      <div className="p-4">{children}</div>
      <button className="absolute top-4 right-4" onClick={onClose}>
        <XIcon size={20} className="text-muted-foreground" />
      </button>
    </div>
  );
}

const DetailSkeleton = () => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-col gap-3">
      <Skeleton className="size-10 rounded-sm" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>

    <hr className="-mx-4" />

    <div className="flex flex-col gap-3">
      <Skeleton className="h-16 w-full" />
    </div>

    <hr className="-mx-4" />

    <div className="flex justify-between gap-4">
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>

    <hr className="-mx-4" />

    <Skeleton className="h-10 w-full rounded-sm" />
  </div>
);

function PersonNodeDetailsContent({
  currentCenterNode,
  nodeId
}: {
  currentCenterNode: Node<CustomNodeData>;
  nodeId: string;
}) {
  const { data: personData, isLoading } = usePersonById(nodeId);
  const { data: companyPersonData, isLoading: companyPersonLoading } =
    useCompanyPersonById(`${currentCenterNode.id}_${nodeId}`);

  if (isLoading || companyPersonLoading) {
    return (
      <div className="p-4">
        <DetailSkeleton />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div>
        <Avatar className="w-10 h-10 rounded-sm border">
          <AvatarImage
            src={personData?.profilePicture}
            alt={personData?.name || "actor"}
          />
          <AvatarFallback className="rounded-sm bg-body">
            <UserIcon />
          </AvatarFallback>
        </Avatar>

        <h3 className="font-medium mt-3">
          {personData?.name || "Nom inconnu"}
        </h3>
        <span className="text-sm text-muted-foreground">
          {personData?.currentJobPosition || "Position non définie"}
        </span>
      </div>

      <hr className="-mx-4 my-4" />

      <p className="text-sm mt-4">
        {personData?.description || "No description available."}
      </p>

      <hr className="-mx-4 my-4" />

      <LabelValue
        label="Relation type"
        value={companyPersonData?.title || "Non spécifié"}
      />

      <hr className="-mx-4 my-4" />

      <Button className="w-full" variant="outline" asChild>
        <a href={`/actors/${personData?.slug}`}>
          View full profile <ArrowRightIcon />
        </a>
      </Button>
    </div>
  );
}

function CompanyNodeDetailsContent({
  currentCenterNode,
  nodeId
}: {
  currentCenterNode: Node<CustomNodeData>;
  nodeId: string;
}) {
  const { data: companyData, isLoading } = useCompany(nodeId);
  const { data: companyPersonData, isLoading: companyPersonLoading } =
    useCompanyPersonById(`${currentCenterNode.id}_${nodeId}`);

  if (isLoading || companyPersonLoading) {
    return (
      <div className="p-4">
        <DetailSkeleton />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div>
        <Avatar className="w-10 h-10 rounded-sm border">
          <AvatarImage
            src={companyData?.profilePicture}
            alt={companyData?.name || "company"}
          />
          <AvatarFallback className="rounded-sm bg-body">
            <BuildingIcon />
          </AvatarFallback>
        </Avatar>

        <h3 className="font-medium mt-3">
          {companyData?.name || "Nom inconnu"}
        </h3>
      </div>

      <hr className="-mx-4 my-4" />

      <GeneralInfo
        size="sm"
        icon={MapPinIcon}
        label="Location"
        value={companyData?.city + ", " + companyData?.implantation}
      />

      <p className="text-sm mt-4">
        {companyData?.activity || "Activité non définie"}
      </p>

      <hr className="-mx-4 my-4" />

      <h3 className="font-medium">
        Connections with {currentCenterNode.data.name}
      </h3>
      <div className="text-sm mt-4 space-y-4">
        <div className="flex justify-between gap-2">
          <span className="text-muted-foreground flex-1">
            Role of {currentCenterNode.data.name.split(" ")[0]}
          </span>
          <span className="flex-1">
            {companyPersonData?.title || "Non spécifié"}
          </span>
        </div>
      </div>

      <hr className="-mx-4 my-4" />

      <Button className="w-full" variant="outline" asChild>
        <a href={`/explore-directory/${companyData?.slug}`}>
          View Details <ArrowRightIcon />
        </a>
      </Button>
    </div>
  );
}

function PoliticalPartyNodeDetailsContent({
  currentCenterNode,
  nodeId
}: {
  currentCenterNode: Node<CustomNodeData>;
  nodeId: string;
}) {
  const { data: partyData, isLoading } = usePoliticalPartyById(nodeId);
  const { data: partyPersonData, isLoading: partyPersonLoading } =
    usePoliticalPartyPersonById(`${currentCenterNode.id}_${nodeId}`);

  if (isLoading || partyPersonLoading) {
    return (
      <div className="p-4">
        <DetailSkeleton />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div>
        <Avatar className="w-10 h-10 rounded-sm border">
          <AvatarImage
            src={partyData?.profilePicture}
            alt={partyData?.name || "political party"}
          />
          <AvatarFallback className="rounded-sm bg-body">
            <RoundedTriangleIcon />
          </AvatarFallback>
        </Avatar>

        <h3 className="font-medium mt-3">{partyData?.name || "Nom inconnu"}</h3>
      </div>

      <hr className="-mx-4 my-4" />

      <GeneralInfo
        size="sm"
        icon={MapPinIcon}
        label="Location"
        value={
          [partyData?.city, partyData?.implantation]
            .filter(Boolean)
            .join(", ") || "Non spécifié"
        }
      />

      <p className="text-sm mt-4">
        {partyData?.description || "Aucune description disponible."}
      </p>

      <hr className="-mx-4 my-4" />

      <div className="text-sm space-y-2">
        <LabelValue
          label="Members"
          value={String(partyData?.members?.numberOfMembers ?? 0)}
        />
        <LabelValue
          label="Candidates"
          value={String(partyData?.members?.numberOfCandidates ?? 0)}
        />
        <LabelValue
          label="Elected"
          value={String(partyData?.members?.numberOfElected ?? 0)}
        />
      </div>

      <hr className="-mx-4 my-4" />

      <h3 className="font-medium">
        Connections with {currentCenterNode.data.name}
      </h3>
      <div className="text-sm mt-4 space-y-4">
        <div className="flex justify-between gap-2">
          <span className="text-muted-foreground flex-1">Relation type</span>
          <span className="flex-1">
            {partyPersonData?.type || "Non spécifié"}
          </span>
        </div>
      </div>

      <hr className="-mx-4 my-4" />

      {/* <Button className="w-full" variant="outline" asChild>
        <a href={`/political-party/${partyData?.slug}`}>
          View Details <ArrowRightIcon />
        </a>
      </Button> */}
    </div>
  );
}

function SelectedNodeDetails({
  currentCenterNode,
  nodeId,
  allNodes,
  onClose,
  isMobile
}: {
  currentCenterNode: Node<CustomNodeData>;
  nodeId: string;
  allNodes: Node<CustomNodeData>[];
  onClose: () => void;
  isMobile: boolean;
}) {
  const node = allNodes.find((n) => n.id === nodeId);
  if (!node) return null;

  const category = node.data.category;

  let content;
  if (category === "ORGANIZATION") {
    content = (
      <CompanyNodeDetailsContent
        currentCenterNode={currentCenterNode}
        nodeId={nodeId}
      />
    );
  } else if (category === "POLITICAL_PARTY") {
    content = (
      <PoliticalPartyNodeDetailsContent
        currentCenterNode={currentCenterNode}
        nodeId={nodeId}
      />
    );
  } else {
    content = (
      <PersonNodeDetailsContent
        currentCenterNode={currentCenterNode}
        nodeId={nodeId}
      />
    );
  }

  if (isMobile) {
    return (
      <Drawer open={!!nodeId} onOpenChange={(open) => !open && onClose()}>
        <DrawerContent>
          <DrawerHeader className="sr-only">
            <DrawerTitle>Node Details</DrawerTitle>
            <DrawerDescription>
              Detailed information about the selected node
            </DrawerDescription>
          </DrawerHeader>
          <div className="mb-6">{content}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return <NodeDetailsWrapper onClose={onClose}>{content}</NodeDetailsWrapper>;
}
