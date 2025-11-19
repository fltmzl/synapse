import {
  BaseEdge,
  EdgeLabelRenderer,
  getStraightPath,
  useInternalNode,
  type Edge,
  type EdgeProps
} from "@xyflow/react";
import { getEdgeParams } from "../utils/initialElements";
import { useMemo, type CSSProperties } from "react";

type CustomEdge = Edge<{ value: number }, "custom">;

type EdgePosition =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export default function CustomEdge({
  id,
  source,
  target,
  style = {},
  label,
  markerEnd
}: EdgeProps<CustomEdge>) {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);

  // Deteksi posisi edge relatif terhadap center node
  const edgePosition: EdgePosition = useMemo(() => {
    if (!sourceNode || !targetNode) return "left";
    if (
      !sourceNode.measured.width ||
      !targetNode.measured.height ||
      !sourceNode.measured.height ||
      !targetNode.measured.width
    )
      return "left";

    // Asumsikan sourceNode adalah center node
    const centerX =
      sourceNode.internals.positionAbsolute.x + sourceNode.measured.width / 2;
    const centerY =
      sourceNode.internals.positionAbsolute.y + sourceNode.measured.height / 2;

    const targetCenterX =
      targetNode.internals.positionAbsolute.x + targetNode.measured.width / 2;
    const targetCenterY =
      targetNode.internals.positionAbsolute.y + targetNode.measured.height / 2;

    const deltaX = targetCenterX - centerX;
    const deltaY = targetCenterY - centerY;

    // Hitung angle untuk menentukan quadrant
    const angleInDegrees = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    // Normalize angle to 0-360
    const normalizedAngle = (angleInDegrees + 360) % 360;

    // Tentukan posisi berdasarkan angle
    // 0° = right, 90° = bottom, 180° = left, 270° = top
    if (normalizedAngle >= 337.5 || normalizedAngle < 22.5) {
      return "right";
    } else if (normalizedAngle >= 22.5 && normalizedAngle < 67.5) {
      return "bottom-right";
    } else if (normalizedAngle >= 67.5 && normalizedAngle < 112.5) {
      return "bottom";
    } else if (normalizedAngle >= 112.5 && normalizedAngle < 157.5) {
      return "bottom-left";
    } else if (normalizedAngle >= 157.5 && normalizedAngle < 202.5) {
      return "left";
    } else if (normalizedAngle >= 202.5 && normalizedAngle < 247.5) {
      return "top-left";
    } else if (normalizedAngle >= 247.5 && normalizedAngle < 292.5) {
      return "top";
    } else {
      return "top-right";
    }
  }, [sourceNode, targetNode]);

  // Tambahkan offset pada source edge (start point)
  const sourceOffset = 15; // jarak dari edge source node ke circle
  const circleRadius = 3; // radius lingkaran biru
  const edgeAngle = Math.atan2(ty - sy, tx - sx);

  // Posisi circle (sebelum offset)
  const circleCx = sx + Math.cos(edgeAngle) * sourceOffset;
  const circleCy = sy + Math.sin(edgeAngle) * sourceOffset;

  // Posisi start edge (setelah circle)
  const offsetSx = sx + Math.cos(edgeAngle) * (sourceOffset + circleRadius);
  const offsetSy = sy + Math.sin(edgeAngle) * (sourceOffset + circleRadius);

  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX: offsetSx,
    sourceY: offsetSy,
    targetX: tx,
    targetY: ty
  });

  // Gunakan tx, ty, sx, sy untuk angle
  let angle = Math.atan2(ty - sy, tx - sx) * (180 / Math.PI);

  // Balik teks jika sudut membuat teks terbalik
  if (angle > 90 || angle < -90) {
    angle += 180;
  }

  if (!sourceNode || !targetNode) {
    return null;
  }

  // Hitung offset berdasarkan posisi edge
  const getOffset = () => {
    const baseOffset = 20;

    switch (edgePosition) {
      case "top":
      case "bottom":
        return { x: 0, y: edgePosition === "top" ? -baseOffset : baseOffset };
      case "left":
      case "right":
        return { x: edgePosition === "left" ? -baseOffset : baseOffset, y: 0 };
      case "top-left":
        return { x: -baseOffset * 0.7, y: -baseOffset * 0.7 };
      case "top-right":
        return { x: baseOffset * 0.7, y: -baseOffset * 0.7 };
      case "bottom-left":
        return { x: -baseOffset * 0.7, y: baseOffset * 0.7 };
      case "bottom-right":
        return { x: baseOffset * 0.7, y: baseOffset * 0.7 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getOffset();

  const getDynamicPosition = (edgePosition: EdgePosition): CSSProperties => {
    switch (edgePosition) {
      case "left":
        return {
          top: -15
        };
      case "right":
        return {
          top: -15
        };
      default:
        return {
          top: "auto"
        };
    }
  };

  const defaultStyle: CSSProperties = {
    position: "absolute",
    transform: `translate(-60%, -50%) translate(${labelX + offset.x}px,${
      labelY + offset.y
    }px) rotate(${angle}deg)`,
    color: "rgba(36, 71, 213, 0.5)",
    pointerEvents: "all",
    whiteSpace: "nowrap"
  };

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: "rgba(36, 71, 213, 1)",
          strokeWidth: 1,
          ...style
        }}
      />

      {/* Circle di start edge */}
      <circle
        cx={circleCx}
        cy={circleCy}
        r={circleRadius}
        opacity={style.opacity}
        fill="rgba(36, 71, 213, 1)"
        stroke="white"
        strokeWidth={1}
      />

      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              ...defaultStyle,
              ...getDynamicPosition(edgePosition),
              opacity: style.opacity
            }}
            className="nodrag nopan text-[11px] bg-body"
          >
            {label}
            {/* Debug: tampilkan posisi */}
            {/*<span className="ml-2 text-[8px]">({edgePosition})</span>*/}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
