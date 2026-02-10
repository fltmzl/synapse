import type { Node, NodeProps } from "@xyflow/react";
import BaseSpiderNode from "./base-spider-node";
import HexagonIcon from "./nodes/icons/hexagon-icon";

type HexagonNode = Node<{ label: string }, "hexagonNode">;

export default function HexagonNode({
  data,
  positionAbsoluteY,
  selected
}: NodeProps<HexagonNode>) {
  return (
    <BaseSpiderNode
      label={data.label}
      positionAbsoluteY={positionAbsoluteY}
      selected={selected}
    >
      <HexagonIcon />
    </BaseSpiderNode>
  );
}
