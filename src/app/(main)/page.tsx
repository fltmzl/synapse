import { redirect } from "next/navigation";
import React from "react";

export default function Home() {
  return redirect("/auth/login");

  return (
    <div>
      <div>Home</div>
      <div></div>
    </div>
  );
}
