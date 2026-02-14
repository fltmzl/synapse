import type { Node, NodeProps } from "@xyflow/react";
import BaseSpiderNode from "./base-spider-node";

type CircleRedNode = Node<{ label: string }, "circleRedNode">;

export default function CircleRedNode({
  data,
  positionAbsoluteY,
  selected
}: NodeProps<CircleRedNode>) {
  return (
    <BaseSpiderNode
      label={data.label}
      positionAbsoluteY={positionAbsoluteY}
      selected={selected}
    >
      <div className="bg-red-500 w-4 h-4 rounded-full border-[1.2px] border-white shadow-sm shadow-black/35" />
    </BaseSpiderNode>
  );
}
