"use client";

import GeneralInfo from "@/app/(main)/(landing-page)/actors/[slug]/components/general-info";
import SectionContainer from "@/components/container/section-container";
import DiamondIcon from "@/components/spider-graph/custom-element/nodes/icons/diamond-icon";
import HexagonIcon from "@/components/spider-graph/custom-element/nodes/icons/hexagon-icon";
import PentagonIcon from "@/components/spider-graph/custom-element/nodes/icons/pentagon-icon";
import RoundedCircleIcon from "@/components/spider-graph/custom-element/nodes/icons/rounded-circle-icon";
import RoundedTriangleIcon from "@/components/spider-graph/custom-element/nodes/icons/rounded-triangle-icon";
import SpiderGraph from "@/components/spider-graph/spider-graph";
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
import useSpiderGraph from "@/queries/use-spider-graph";
import { ExpandIcon, MaximizeIcon, MinusIcon, XIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function NetworkConnectionSection() {
  const isClient = useIsClient();
  const { slug } = useParams();
  const { isOpen, openModal, setIsOpen } = useModal();
  const [search, setSearch] = useState("");
  const { data, isLoading } = useSpiderGraph("person", slug as string);

  const smallGraphData = useMemo(
    () => ({
      nodes: data?.nodes ? [...data.nodes] : [],
      edges: data?.edges ? [...data.edges] : []
    }),
    [data]
  );

  const initialEdges = smallGraphData.edges;
  const initialNodes = smallGraphData.nodes;

  // const dialogGraphData = useMemo(
  //   () => ({
  //     nodes: data?.nodes ? JSON.parse(JSON.stringify(data.nodes)) : [],
  //     edges: data?.edges ? JSON.parse(JSON.stringify(data.edges)) : []
  //   }),
  //   [data]
  // );

  if (!isClient || isLoading) return null;

  // const { nodes: initialNodes, edges: initialEdges } = initialElements();

  // const initialEdges = data?.edges;
  // const initialNodes = data?.nodes;

  // const { nodes: initialNodes, edges: initialEdges } =
  //   mapCompanyPersonsToReactFlow({
  //     company: {
  //       id: "company_tokopedia",
  //       industry: "E-commerce",
  //       name: "Tokopedia"
  //     },
  //     persons: [
  //       {
  //         id: "person_andre",
  //         name: "Andre Wijaya",
  //         relation: "WORKS_AT",
  //         role: "Software Engineer"
  //       }
  //     ]
  //   });

  console.log({ initialNodes, initialEdges });

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
          <SpiderGraph
            initialEdges={initialEdges}
            initialNodes={initialNodes}
            // initialEdges={smallGraphData.edges}
            // initialNodes={smallGraphData.nodes}
          >
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
          <DialogContent showCloseButton={false} className="lg:max-w-7xl">
            <div className="h-[700px]">
              <SpiderGraph
                initialEdges={initialEdges}
                initialNodes={initialNodes}
                // initialEdges={smallGraphData.edges}
                // initialNodes={smallGraphData.nodes}
                classNames={{
                  container: "h-full lg:h-full"
                }}
              >
                {({
                  isInfoShowed,
                  setIsInfoShowed,
                  selectedNode,
                  setSelectedNode,
                  reactFlowInstance
                }) => (
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
                            Explore Isabelle’s Network
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
                      <div className="absolute top-4 left-4 rounded-lg bg-background border w-full max-w-[300px] z-[2]">
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

                            <h3 className="font-medium mt-3">
                              Caribbean Business Council
                            </h3>
                            <span className="text-sm text-muted-foreground">
                              Business Organization
                            </span>
                          </div>

                          <button
                            className="absolute top-4 right-4"
                            onClick={() => setSelectedNode(null)}
                          >
                            <XIcon
                              size={20}
                              className="text-muted-foreground"
                            />
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
                            Regional business council supporting economic
                            cooperation among Caribbean territories.
                          </p>
                        </div>

                        <hr />

                        <div className="p-4">
                          <h3 className="font-medium">
                            Connections with Isabelle
                          </h3>

                          <div className="text-sm mt-4 space-y-4">
                            <div className="flex justify-between gap-2">
                              <span className="text-muted-foreground">
                                Relation type
                              </span>
                              <span>Affiliation</span>
                            </div>
                            <div className="flex justify-between gap-2">
                              <span className="text-muted-foreground">
                                Role
                              </span>
                              <span>Consultant</span>
                            </div>
                            <div className="flex justify-between gap-2">
                              <span className="text-muted-foreground">
                                Period
                              </span>
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
                            <div className="flex justify-between">
                              <Label
                                htmlFor="person"
                                className="font-normal text-xs"
                              >
                                <RoundedCircleIcon />
                                Person
                              </Label>
                              <Checkbox
                                id="person"
                                name="person"
                                className="size-4"
                              />
                            </div>

                            <div className="flex justify-between">
                              <Label
                                htmlFor="organization"
                                className="font-normal text-xs"
                              >
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
                              <Label
                                htmlFor="government"
                                className="font-normal text-xs"
                              >
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
                              <Label
                                htmlFor="party"
                                className="font-normal text-xs"
                              >
                                <RoundedTriangleIcon />
                                Party
                              </Label>
                              <Checkbox
                                id="party"
                                name="party"
                                className="size-4"
                              />
                            </div>

                            <div className="flex justify-between">
                              <Label
                                htmlFor="education"
                                className="font-normal text-xs"
                              >
                                <HexagonIcon />
                                Education
                              </Label>
                              <Checkbox
                                id="education"
                                name="education"
                                className="size-4"
                              />
                            </div>

                            <div className="flex justify-between">
                              <Label
                                htmlFor="association"
                                className="font-normal text-xs"
                              >
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
                              <Label
                                htmlFor="media"
                                className="font-normal text-xs"
                              >
                                <RoundedCircleIcon color="#8C31F4" />
                                Media
                              </Label>
                              <Checkbox
                                id="media"
                                name="media"
                                className="size-4"
                              />
                            </div>
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
                )}
              </SpiderGraph>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </SectionContainer>
  );
}
