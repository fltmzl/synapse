import { cn } from "@/lib/utils";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { useMemo, useState } from "react";

interface BaseSpiderNodeProps {
  label: string;
  positionAbsoluteY: number;
  selected?: boolean;
  children: React.ReactNode;
  glowHexColor?: string;
}

export default function BaseSpiderNode({
  label,
  positionAbsoluteY,
  selected,
  glowHexColor = "#fa0000",
  children
}: BaseSpiderNodeProps) {
  const [hovered, setHovered] = useState(false);
  const { getNodes } = useReactFlow();

  // Determine if this node is above the center node
  const isAboveCenter = useMemo(() => {
    const nodes = getNodes();
    const centerNode = nodes.find((node) => node.type === "centerNode");

    if (!centerNode) return false;

    const centerY = centerNode.position.y;
    return positionAbsoluteY < centerY;
  }, [positionAbsoluteY, getNodes]);

  return (
    <div className="flex flex-col items-center relative p-1 group">
      {/* Label above if node is above center */}
      {isAboveCenter && (
        <div className="w-max text-sm text-muted-foreground tracking-tighter absolute -top-5 transition-opacity">
          {label}
        </div>
      )}

      <div
        className="relative flex items-center justify-center min-w-4 min-h-4"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* The Shape/Icon */}
        {children}

        {/* Hover/Selected Glow Effect */}
        <div
          className={cn(
            "bg-gray-600 rounded-full w-full h-full scale-170 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition pointer-events-none",
            {
              "opacity-20": hovered || selected
            }
          )}
        />
      </div>

      {/* Label below if node is below or level with center */}
      {!isAboveCenter && (
        <div className="w-max text-sm text-gray-500 tracking-tighter absolute -bottom-5 transition-opacity">
          {label}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        style={{ pointerEvents: "none", opacity: 0 }}
      />

      <Handle
        type="target"
        position={Position.Top}
        style={{ pointerEvents: "none", opacity: 0 }}
      />
    </div>
  );
}
