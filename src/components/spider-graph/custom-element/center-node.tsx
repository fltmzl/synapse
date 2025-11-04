import { Handle, Position } from "@xyflow/react";
import { HotelIcon } from "lucide-react";
import type { Node, NodeProps } from "@xyflow/react";

type CenterNode = Node<{ label: string }, "centerNode">;

export function CenterNode({ data }: NodeProps<CenterNode>) {
  return (
    <div className="border border-primary p-2 pe-4 rounded-sm bg-background">
      <div className="flex gap-2 items-center">
        <div className="p-2 bg-primary/5 w-fit rounded-full text-primary">
          <HotelIcon size={16} />
        </div>
        <span className="text-sm font-medium tracking-tighter">
          {data.label}
        </span>
      </div>
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
}
