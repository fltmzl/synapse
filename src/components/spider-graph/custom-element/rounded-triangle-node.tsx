import type { Node, NodeProps } from "@xyflow/react";
import BaseSpiderNode from "./base-spider-node";
import RoundedTriangleIcon from "./nodes/icons/rounded-triangle-icon";

type RoundedTriangleNode = Node<{ label: string }, "roundedTriangleNode">;

export default function RoundedTriangleNode({
  data,
  positionAbsoluteY,
  selected
}: NodeProps<RoundedTriangleNode>) {
  return (
    <BaseSpiderNode
      label={data.label}
      positionAbsoluteY={positionAbsoluteY}
      selected={selected}
    >
      <RoundedTriangleIcon />
    </BaseSpiderNode>
  );
}
