import React from "react";

type Props = {
  label: string;
  value: string;
};

export default function LabelValue({ label, value }: Props) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}
