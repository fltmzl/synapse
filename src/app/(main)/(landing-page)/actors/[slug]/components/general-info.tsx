import React, { SVGProps } from "react";

type Props = {
  label: string;
  icon: (props: SVGProps<SVGSVGElement>) => React.JSX.Element;
  value: string;
};

export default function GeneralInfo({ icon, label, value }: Props) {
  const Icon = icon;

  return (
    <div className="flex items-center gap-3">
      <div className="border rounded-sm min-w-10 lg:min-w-11 aspect-square grid place-content-center text-primary">
        <Icon className="size-5" />
      </div>
      <div className="flex lg:flex-col justify-between w-full">
        <div className="text-muted-foreground text-base lg:text-sm">
          {label}
        </div>
        <div className="text-base">{value}</div>
      </div>
    </div>
  );
}
