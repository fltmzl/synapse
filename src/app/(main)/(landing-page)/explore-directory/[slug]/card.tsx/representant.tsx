import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import useCompanyBySlug from "@/queries/use-company-by-slug";
import { Skeleton } from "@/components/ui/skeleton";

export default function RepresentantCard() {
  const params = useParams();
  const slug = params?.slug as string;
  const { data: item, isLoading } = useCompanyBySlug(slug);

  if (isLoading) {
    return (
      <Card className="rounded-[12px] gap-0 py-0 ">
        <CardHeader className="px-5 py-6 lg:p-6 border-b">
          <Skeleton className="h-7 w-32" />
        </CardHeader>
        <CardContent className="flex flex-col px-5 py-6 lg:p-6 ">
          <div className="flex flex-row gap-3 items-center border-b pb-4">
            <Skeleton className="h-15 w-15 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
          <div className="space-y-2 pt-4">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-5 w-32" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-5 w-32" />
              </div>
            </div>
            <div className="space-y-2 mt-4">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-2/3" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!item) return null;

  const rep = item.authorizedRepresentative;

  return (
    <Card className="rounded-[12px] gap-0 py-0 ">
      <CardHeader className="px-5 py-6 lg:p-6 border-b">
        <CardTitle className="text-xl font-medium">Représentant</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col px-5 py-6 lg:p-6 ">
        <Link href={`/actors/${rep?.slug}`}>
          <div className="flex flex-row gap-3 items-center border-b pb-4">
            <div className="w-15 h-15 relative rounded-full overflow-hidden">
              <Avatar className="h-15 w-15">
                <AvatarImage
                  className="rounded-full"
                  src={rep?.profilePicture || "/images/default-avatar.png"}
                  alt={rep?.name || "Representative"}
                />
                <AvatarFallback className="bg-muted-foreground/20 font-medium">
                  <div className="w-15 h-15 bg-muted rounded-full grid place-content-center">
                    {(rep?.name || "R")
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <div className="flex gap-1 items-center">
                <h3 className="leading-[140%] tracking-[-0.01em] text-lg">
                  {rep?.name || "N/A"}
                </h3>

                <ArrowUpRight
                  strokeWidth={1.5}
                  className="size-[18px] text-primary"
                />
              </div>
              <p className="text-base leading-[150%] tracking-[-0.01em] text-muted-foreground">
                {rep?.currentJobPosition || "N/A"}
              </p>
            </div>
          </div>
        </Link>
        <div className="space-y-2 pt-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Mail strokeWidth={1} className="size-4 text-primary" />
              <span className="text-base leading-[150%] tracking-[-0.01em]">
                {rep?.email || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone strokeWidth={1} className="size-4 text-primary" />
              <span className="text-base leading-[150%] tracking-[-0.01em]">
                {rep?.phoneNumber || "N/A"}
              </span>
            </div>
          </div>
          <p className="text-base leading-[150%] tracking-[-0.01em] mt-4">
            {rep?.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
