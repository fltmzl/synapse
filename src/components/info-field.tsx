import React from "react";

type Props = {
  label: string;
  value: string;
};

export default function InfoField({ label, value }: Props) {
  return (
    <div className="space-y-1">
      <h6 className="text-sm text-muted-foreground">{label}</h6>
      <div>{value}</div>
    </div>
  );
}
