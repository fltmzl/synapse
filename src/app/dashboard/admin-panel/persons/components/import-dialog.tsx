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
import usePoliticalPartyMutation from "@/mutations/use-political-party-mutation";
import useAssociationMutation from "@/mutations/use-association-mutation";
import useEducationMutation from "@/mutations/use-education-mutation";
import {
  CreateManyPersonFromExcelDto,
  CompanyDataFromExcelDto,
  CompanyPersonRelationsFromExcelDto,
  PoliticalPartyDataFromExcelDto,
  PoliticalPartyPersonRelationsFromExcelDto,
  AssociationDataFromExcelDto,
  AssociationPersonRelationsFromExcelDto,
  EducationDataFromExcelDto,
  EducationPersonRelationsFromExcelDto
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
  const {
    createManyFromExcelMutation: createPoliticalPartiesMutation,
    createManyRelationsFromExcelMutation: createPoliticalPartyRelationsMutation
  } = usePoliticalPartyMutation();
  const {
    createManyFromExcelMutation: createAssociationsMutation,
    createManyRelationsFromExcelMutation: createAssociationRelationsMutation
  } = useAssociationMutation();
  const {
    createManyFromExcelMutation: createEducationsMutation,
    createManyRelationsFromExcelMutation: createEducationRelationsMutation
  } = useEducationMutation();

  const isLoading =
    createPersonsMutation.isPending ||
    createCompaniesMutation.isPending ||
    createRelationsMutation.isPending ||
    createPoliticalPartiesMutation.isPending ||
    createPoliticalPartyRelationsMutation.isPending ||
    createAssociationsMutation.isPending ||
    createAssociationRelationsMutation.isPending ||
    createEducationsMutation.isPending ||
    createEducationRelationsMutation.isPending;

  const handleImport = async () => {
    if (!file) return;

    try {
      const arrayBuffer = await file.arrayBuffer();

      // Parse all sheets
      const resultPerson = parseGroupedExcel(arrayBuffer, 0);
      const resultCompany = parseGroupedExcel(arrayBuffer, 1);
      const resultPersonCompanyRelations = parseGroupedExcel(arrayBuffer, 2);
      const resultPoliticalParties = parseGroupedExcel(arrayBuffer, 3);
      const resultPersonPoliticalPartyRelations = parseGroupedExcel(
        arrayBuffer,
        4
      );
      const resultAssociations = parseGroupedExcel(arrayBuffer, 5);
      const resultPersonAssociationRelations = parseGroupedExcel(
        arrayBuffer,
        6
      );
      const resultEducations = parseGroupedExcel(arrayBuffer, 7);
      const resultPersonEducationRelations = parseGroupedExcel(arrayBuffer, 8);

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
      const mappedResultPersonCompanyRelations =
        resultPersonCompanyRelations as unknown as CompanyPersonRelationsFromExcelDto[];

      // Map Political Parties
      const mappedResultPoliticalParties =
        resultPoliticalParties as unknown as PoliticalPartyDataFromExcelDto[];

      // Map Political Party Relations
      const mappedResultPersonPoliticalPartyRelations =
        resultPersonPoliticalPartyRelations as unknown as PoliticalPartyPersonRelationsFromExcelDto[];

      // Map Associations
      const mappedResultAssociations =
        resultAssociations as unknown as AssociationDataFromExcelDto[];

      // Map Association Relations
      const mappedResultPersonAssociationRelations =
        resultPersonAssociationRelations as unknown as AssociationPersonRelationsFromExcelDto[];

      // Map Educations
      const mappedResultEducations =
        resultEducations as unknown as EducationDataFromExcelDto[];

      // Map Education Relations
      const mappedResultPersonEducationRelations =
        resultPersonEducationRelations as unknown as EducationPersonRelationsFromExcelDto[];

      // Execute Entity Mutations (Persons, Companies, Political Parties, Associations, Educations)
      await Promise.all([
        createPersonsMutation.mutateAsync(mappedResultPerson),
        createCompaniesMutation.mutateAsync(mappedResultCompany),
        createPoliticalPartiesMutation.mutateAsync(
          mappedResultPoliticalParties
        ),
        createAssociationsMutation.mutateAsync(mappedResultAssociations),
        createEducationsMutation.mutateAsync(mappedResultEducations)
      ]);

      // Execute Relation Mutations
      await Promise.all([
        createRelationsMutation.mutateAsync(mappedResultPersonCompanyRelations),
        createPoliticalPartyRelationsMutation.mutateAsync(
          mappedResultPersonPoliticalPartyRelations
        ),
        createAssociationRelationsMutation.mutateAsync(
          mappedResultPersonAssociationRelations
        ),
        createEducationRelationsMutation.mutateAsync(
          mappedResultPersonEducationRelations
        )
      ]);

      setOpen(false);
      setFile(null);
      toast.success("All data imported successfully");
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
