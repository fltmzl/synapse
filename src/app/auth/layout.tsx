import { GuestRoute } from "@/providers/guest-route";
import React from "react";

export default function AuthMiddlewareLayout({
  children
}: React.PropsWithChildren) {
  return <GuestRoute>{children}</GuestRoute>;
}
