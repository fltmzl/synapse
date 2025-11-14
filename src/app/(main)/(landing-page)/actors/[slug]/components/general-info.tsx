import { cn } from "@/lib/utils";
import React, { SVGProps } from "react";

type Props = {
  label: string;
  icon: (props: SVGProps<SVGSVGElement>) => React.JSX.Element;
  value: string;
  size?: "default" | "sm";
};

export default function GeneralInfo({
  icon,
  label,
  size = "default",
  value
}: Props) {
  const Icon = icon;

  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "border rounded-sm min-w-10 lg:min-w-11 aspect-square grid place-content-center text-primary",
          {
            "min-w-8 lg:min-w-8": size === "sm"
          }
        )}
      >
        <Icon
          className={cn("size-5", {
            "size-4": size === "sm"
          })}
        />
      </div>
      <div className="flex lg:flex-col justify-between w-full">
        <div
          className={cn("text-muted-foreground text-base lg:text-sm", {
            "text-xs lg:text-xs": size === "sm"
          })}
        >
          {label}
        </div>
        <div
          className={cn("text-base", {
            "text-sm": size === "sm"
          })}
        >
          {value}
        </div>
      </div>
    </div>
  );
}
