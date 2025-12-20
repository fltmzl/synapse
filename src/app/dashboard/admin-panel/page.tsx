"use client";

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminPanelPage() {
  const router = useRouter();

  router.push("/dashboard/admin-panel/article");

  return (
    <>
      <DashboardHeader
        title="Admin Panel"
        description="Manage your admin settings and configurations"
        actions={
          <>
            <Button variant="outline" size="sm">
              Settings
            </Button>
            <Button size="sm">
              <Plus className="size-4 mr-2" />
              New Item
            </Button>
          </>
        }
      />
      {/* <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="h-full">
          <SimpleEditor />
        </div>
      </div> */}
    </>
  );
}
