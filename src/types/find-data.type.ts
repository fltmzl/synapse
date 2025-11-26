import { LucideIcon } from "lucide-react";

export type SourceItem = {
  name: string;
  icon: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export type InfoOption = {
  id: string;
  title: string;
  desc: string;
  href: string;
}
