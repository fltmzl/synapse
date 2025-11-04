import { notFound } from "next/navigation";
import { directory } from "@/data/directory-data";
import { DirectoryItem } from "@/types/directory.type";
import DetailDirectorySection from "./sections/detail-page";
import AdministrationSimilars from "./sections/similars";

export default async function DirectoryDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const item: DirectoryItem | undefined = directory.find(
    (i) => i.slug === slug
  );

  if (!item) return notFound();

  return (
    <>
      <DetailDirectorySection item={item} />
      <AdministrationSimilars />
    </>
  );
}
