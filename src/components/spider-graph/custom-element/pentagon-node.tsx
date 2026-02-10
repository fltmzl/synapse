import type { Node, NodeProps } from "@xyflow/react";
import BaseSpiderNode from "./base-spider-node";
import PentagonIcon from "./nodes/icons/pentagon-icon";

type PentagonNode = Node<{ label: string }, "pentagonNode">;

export default function PentagonNode({
  data,
  positionAbsoluteY,
  selected
}: NodeProps<PentagonNode>) {
  return (
    <BaseSpiderNode
      label={data.label}
      positionAbsoluteY={positionAbsoluteY}
      selected={selected}
    >
      <PentagonIcon />
    </BaseSpiderNode>
  );
}
