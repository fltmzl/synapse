"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { ExcelUpload } from "@/components/ui/excel-upload";
import usePersonMutation from "@/mutations/use-person-mutation";
import useCompanyMutation from "@/mutations/use-company-mutation";
import {
  CreateManyPersonFromExcelDto,
  CompanyDataFromExcelDto,
  CompanyPersonRelationsFromExcelDto
} from "@/types/person-relation.type";
import { Upload } from "lucide-react";
import { useState } from "react";
import { parseGroupedExcel } from "../utils";
import { toast } from "sonner";

export function ImportDialog() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const { createManyFromExcelMutation: createPersonsMutation } =
    usePersonMutation();
  const {
    createManyFromExcelMutation: createCompaniesMutation,
    createManyRelationsFromExcelMutation: createRelationsMutation
  } = useCompanyMutation();

  const isLoading =
    createPersonsMutation.isPending ||
    createCompaniesMutation.isPending ||
    createRelationsMutation.isPending;

  const handleImport = async () => {
    if (!file) return;

    try {
      const arrayBuffer = await file.arrayBuffer();

      // Parse Sheet 0 (Persons), Sheet 1 (Companies), Sheet 2 (Relations)
      const resultPerson = parseGroupedExcel(arrayBuffer, 0);
      const resultCompany = parseGroupedExcel(arrayBuffer, 1);
      const resultRelations = parseGroupedExcel(arrayBuffer, 2);

      // Map Person Data
      const mappedResultPerson = resultPerson.map((item) => {
        return {
          ...item,
          general: {
            ...item.general,
            firstName: item.general.first_name,
            lastName: item.general.last_name,
            dateOfBirth: item.general.date_of_birth
          }
        };
      }) as CreateManyPersonFromExcelDto[];

      // Map Company Data
      const mappedResultCompany =
        resultCompany as unknown as CompanyDataFromExcelDto[];

      // Map Relations Data
      const mappedResultRelations =
        resultRelations as unknown as CompanyPersonRelationsFromExcelDto[];

      // Execute Mutations
      // Note: Ideally, we should ensure Persons and Companies are created BEFORE Relations.
      // However, since we are using IDs (which we set manually or derive), as long as the Documents exist when we try to create relations (or even if they don't yet, provided we just reference IDs), it might be fine for Firestore.
      // But for Neo4j sync which happens in the backend service, it might check for existence.
      // Safest approach is to await Persons and Companies, THEN do Relations.

      await Promise.all([
        createPersonsMutation.mutateAsync(mappedResultPerson),
        createCompaniesMutation.mutateAsync(mappedResultCompany)
      ]);

      await createRelationsMutation.mutateAsync(mappedResultRelations);

      setOpen(false);
      setFile(null);
      toast.success("Persons, Companies, and Relations imported successfully");
    } catch (error) {
      console.error("Import failed:", error);
      toast.error("Failed to import data");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Upload className="mr-2 size-4" />
          Import from Excel
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Import Persons</DialogTitle>
          <DialogDescription>
            Upload an Excel file to import persons. Supported formats: .xlsx,
            .xls
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 p-4">
          <ExcelUpload value={file} onChange={setFile} disabled={isLoading} />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button onClick={handleImport} disabled={!file || isLoading}>
            {isLoading ? "Importing..." : "Import"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
