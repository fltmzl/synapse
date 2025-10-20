import React from "react";

export default function SimpleErrorMessage({ message }: { message: string }) {
  return (
    <div className={"text-destructive text-xs font-medium"}>{message}</div>
  );
}
