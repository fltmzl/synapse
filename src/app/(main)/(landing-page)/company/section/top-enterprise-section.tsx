"use client";

import { DataTable } from "@/components/data-table/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import { topEnterprises } from "@/data/top-enterprise-data";
import { Enterprise } from "@/types/enterprise.type";
import { ColumnDef } from "@tanstack/react-table";

export default function TopEnterpriseSection() {
  const data = topEnterprises;

  // add selection
  const columns: ColumnDef<Enterprise>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      )
    },
    {
      accessorKey: "structure.name",
      header: "Structure",
      enableSorting: false
    },
    {
      accessorKey: "name",
      header: "Nom",
      enableSorting: false
    },
    {
      accessorKey: "region",
      header: "Représentant",
      enableSorting: false
    },
    {
      accessorKey: "regionCode",
      header: "Region",
      enableSorting: false
    },
    {
      accessorKey: "representant",
      header: "Représentant",
      enableSorting: false
    },
    {
      accessorKey: "affiliation",
      header: "Affiliation",
      enableSorting: false
    },
    {
      accessorKey: "numberOfEmployees",
      header: "Number of Emp.",
      enableSorting: false,
      cell: ({ getValue }) => <span>{getValue<number>()}</span>
    },
    {
      accessorKey: "creationYear",
      header: "Date de création",
      enableSorting: false,
      cell: ({ getValue }) => <span>{getValue<number>()}</span>
    }
  ];

  return (
    <section className="bg-background py-12 lg:py-20 px-6 lg:px-0">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl lg:text-[2.5rem] font-medium">
            Top enterprise
          </h2>
          <p>
            Explorez parmi les{" "}
            <span className="text-primary font-medium">1,430</span> entreprises
            répertoriées
          </p>
        </div>

        <div>
          <DataTable
            searchPlaceholder="Search by name..."
            data={data || []}
            columns={columns as ColumnDef<Enterprise>[]}
            headerAction={() => <></>}
            isLoading={false}
            toolbarComponent={() => <></>}
          />
        </div>
      </div>
    </section>
  );
}
