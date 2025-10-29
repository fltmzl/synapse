import React from "react";
import Header from "../header";

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
