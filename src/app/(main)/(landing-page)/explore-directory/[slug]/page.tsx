import { notFound } from "next/navigation";
import DetailDirectorySection from "./sections/detail-page";
import AdministrationSimilars from "./sections/similars";
import { Suspense } from "react";
import { CompanyService } from "@/services/company.api";

export default async function DirectoryDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Suspense fallback={null}>
      <DetailDirectorySection slug={slug} />
      <AdministrationSimilars />
    </Suspense>
  );
}
