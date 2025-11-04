// "use client";

// import SpiderGraph from "@/components/spider-graph/spider-graph";
// import { initialElements } from "@/components/spider-graph/utils/initialElements";
// import useIsClient from "@/hooks/use-is-client";
// import { Node } from "@xyflow/react";
// import React from "react";

// export default function NetworkConnectionSection() {
//   const isClient = useIsClient();

//   if (!isClient) return null;

//   const { nodes: initialNodes, edges: initialEdges } = initialElements();

//   return (
//     <SpiderGraph initialEdges={initialEdges} initialNodes={initialNodes} />
//   );
// }
