import React from "react";
import Header from "../header";
import Footer from "../footer";
import { ProtectedRoute } from "@/providers/protected-route";

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <ProtectedRoute>
      <Header />
      {children}
      <Footer />
    </ProtectedRoute>
  );
}
