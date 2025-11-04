import {
  getStraightPath,
  useInternalNode,
  type Edge,
  type EdgeProps
} from "@xyflow/react";
import { getEdgeParams } from "../utils/initialElements";

type CustomEdge = Edge<{ value: number }, "custom">;

function FloatingEdge({
  id,
  source,
  target,
  markerEnd,
  style
}: EdgeProps<CustomEdge>) {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);

  const [edgePath] = getStraightPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty
  });

  return (
    <path
      id={id}
      className="stroke-blue-700"
      d={edgePath}
      markerEnd={markerEnd}
      style={style}
    />
  );
}

export default FloatingEdge;
