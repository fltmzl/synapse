import { Button } from "@/components/ui/button";
import React from "react";

export default function ListToolbar() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm">
        Action 1
      </Button>
      <Button variant="outline" size="sm">
        Action 2
      </Button>
      <Button variant="destructive" size="sm">
        Delete Selected
      </Button>
    </div>
  );
}
