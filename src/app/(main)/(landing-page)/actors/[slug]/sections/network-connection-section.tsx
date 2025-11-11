"use client";

import SectionContainer from "@/components/container/section-container";
import SpiderGraph from "@/components/spider-graph/spider-graph";
import { initialElements } from "@/components/spider-graph/utils/initialElements";
import { Badge } from "@/components/ui/badge";
import useIsClient from "@/hooks/use-is-client";
import { Node } from "@xyflow/react";
import React from "react";

export default function NetworkConnectionSection() {
  const isClient = useIsClient();

  if (!isClient) return null;

  const { nodes: initialNodes, edges: initialEdges } = initialElements();

  return (
    <SectionContainer className="rounded-2lg">
      <div className="p-5 lg:px-6 border-b flex justify-between">
        <h2 className="text-xl font-medium">Cartographie</h2>

        <div className="flex gap-2 items-center">
          <span className="text-sm text-muted-foreground">Soutien</span>
          <Badge>FORT</Badge>
        </div>
      </div>

      <div className="p-4">
        <SpiderGraph initialEdges={initialEdges} initialNodes={initialNodes} />
      </div>
    </SectionContainer>
  );
}
