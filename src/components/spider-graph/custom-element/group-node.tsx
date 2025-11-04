import { type Node, type NodeProps } from "@xyflow/react";

type GroupNode = Node<{ label: string }, "groupNode">;

export function GroupNode({
  data,
  width,
  height,
  selected
}: NodeProps<GroupNode>) {
  return (
    <div
      style={{ width, height }}
      className="border relative bg-primary/5 border-primary/30 p-4 rounded-md"
    >
      <div className="absolute right-0 -bottom-7 rounded-2xs bg-secondary/80 py-1 px-2 text-white text-xs">
        {data.label}
        {/* <div>{selected ? "selected" : "unselected"}</div> */}
      </div>
    </div>
  );
}
