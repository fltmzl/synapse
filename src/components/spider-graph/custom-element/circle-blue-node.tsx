import { cn } from "@/lib/utils";
import type { Node, NodeProps } from "@xyflow/react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { useMemo, useState } from "react";

type CircleBlueNode = Node<{ label: string }, "circleBlueNode">;

export default function CircleBlueNode({
  data,
  id,
  positionAbsoluteY,
  selected
}: NodeProps<CircleBlueNode>) {
  const [hovered, setHovered] = useState(false);
  const { getNodes } = useReactFlow();

  // Cek apakah node ini berada di atas center node
  const isAboveCenter = useMemo(() => {
    const centerNode = getNodes().find((node) => node.type === "centerNode");

    if (!centerNode) return false;

    // Gunakan positionAbsoluteY yang otomatis update saat drag
    const centerY = centerNode.position.y;

    return positionAbsoluteY < centerY;
  }, [positionAbsoluteY, getNodes]);

  return (
    <div className="flex flex-col items-center relative p-1">
      {/* Label di atas jika node di atas center */}
      {isAboveCenter && (
        <div className="w-max text-sm text-muted-foreground tracking-tighter absolute -top-5">
          {data.label}
        </div>
      )}

      <div
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="bg-secondary w-4 h-4 rounded-full border-[1.2px] border-white shadow-sm shadow-black/35"></div>

        <div
          className={cn(
            "bg-secondary rounded-full w-4 h-4 scale-170 absolute top-0 opacity-0 transition",
            {
              "opacity-20": hovered || selected
            }
          )}
        ></div>
      </div>

      {/* <HexagonNode /> */}

      {/* Label di bawah jika node di bawah atau sejajar dengan center */}
      {!isAboveCenter && (
        <div className="w-max text-sm text-gray-500 tracking-tighter absolute -bottom-5">
          {data.label}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          pointerEvents: "none",
          opacity: 0
        }}
      />

      <Handle
        type="target"
        position={Position.Top}
        style={{
          pointerEvents: "none",
          opacity: 0
        }}
      />
    </div>
  );
}

function HexagonNode() {
  return (
    <div className="relative flex items-center justify-center rotate-90">
      {/* bayangan */}
      <div className="absolute top-1 w-4 h-4 bg-black/20 rounded-full blur-sm scale-90" />

      <div
        className="absolute w-4.5 h-4.5 bg-white"
        style={{
          clipPath:
            "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)"
        }}
      />

      {/* bentuk hexagon */}
      <div
        className="w-4 h-4 bg-red-600 shadow-md "
        style={{
          clipPath:
            "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)"
        }}
      ></div>
    </div>
  );
}
