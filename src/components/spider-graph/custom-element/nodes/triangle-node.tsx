import { cn } from "@/lib/utils";
import { Divide } from "lucide-react";
import * as React from "react";
import RoundedTriangleIcon from "./icons/rounded-triangle-icon";

type Props = {
  color?: string;
};

export default function TriangleNode({ color = "bg-gray-600" }: Props) {
  return <RoundedTriangleIcon />;
}
