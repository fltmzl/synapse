import React from "react";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="max-w-6xl mx-auto my-12 px-6 lg:min-h-dvh grid place-content-center">
      <div className="grid lg:grid-cols-2 gap-10">{children}</div>
    </div>
  );
}
