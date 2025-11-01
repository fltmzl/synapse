import { notFound } from "next/navigation";
import { directory } from "@/data/directory-data";
import { DirectoryItem } from "@/types/directory.type";
import DetailDirectorySection from "./sections/detail-page";
import AdministrationSimilars from "./sections/similars";


export default function DirectoryDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const item: DirectoryItem | undefined = directory.find(
    (i) => i.slug === params.slug
  );

  if (!item) return notFound();

  return (
    <>
      <DetailDirectorySection item={item} />
      <AdministrationSimilars  />
    </>
  );
}
