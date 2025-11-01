import { useEffect } from "react";
import { useReactFlow, useNodes } from "@xyflow/react";

export default function useAutoResizeParent(parentId: string) {
  const { setNodes } = useReactFlow();
  const nodes = useNodes();

  useEffect(() => {
    const childNodes = nodes.filter((node) => node.parentId === parentId);

    if (childNodes.length === 0) return;

    // Hitung bounding box dari semua child nodes
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    childNodes.forEach((child) => {
      const x = child.position.x;
      const y = child.position.y;
      const width = child.measured?.width || 150;
      const height = child.measured?.height || 50;

      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x + width);
      maxY = Math.max(maxY, y + height);
    });

    // Tambah padding
    const padding = 40;
    const newWidth = maxX - minX + padding * 2;
    const newHeight = maxY - minY + padding * 2;

    // Update parent size
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            style: {
              ...node.style,
              width: newWidth,
              height: newHeight,
            },
          };
        }
        return node;
      })
    );
  }, [nodes, parentId, setNodes]);
}
