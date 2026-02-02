import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "next/navigation";
import useCompanyBySlug from "@/queries/use-company-by-slug";

import { Skeleton } from "@/components/ui/skeleton";

export default function DescriptionCard() {
  const params = useParams();
  const slug = params?.slug as string;
  const { data: item, isLoading } = useCompanyBySlug(slug);

  if (isLoading) {
    return (
      <Card className="rounded-[12px] pt-0 py-0 gap-0">
        <CardHeader className="px-5 py-6 lg:p-6 border-b ">
          <Skeleton className="h-7 w-32" />
        </CardHeader>
        <CardContent className="px-5 py-6 lg:p-6 space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </CardContent>
      </Card>
    );
  }

  if (!item) return null;
  return (
    <Card className="rounded-[12px] pt-0 py-0 gap-0">
      <CardHeader className="px-5 py-6 lg:p-6 border-b ">
        <CardTitle className="text-xl font-medium leading-[150%] tracking-[-0.01em]">
          Descriptif
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 py-6 lg:p-6">
        <p
          className="text-base leading-[150%] tracking-[-0.01em] text-muted-foreground"
          dangerouslySetInnerHTML={{
            __html: item.description || "No description available"
          }}
        />
      </CardContent>
    </Card>
  );
}
