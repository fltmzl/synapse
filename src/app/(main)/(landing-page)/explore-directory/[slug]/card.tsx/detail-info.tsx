import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BuildingIcon } from "@/icons/building-icon";
import { FacebookFillIcon } from "@/icons/facebook-fill-icon";
import { IdIcon } from "@/icons/id-number-icon";
import { InstagramIconFlat } from "@/icons/instagram-icon-flat";
import { LinkedinIconFlat } from "@/icons/linkedin-icon-flat";
import { Map2Icon } from "@/icons/map-2-icon";
import { TwitterIcon } from "@/icons/twitter-icon";
import { UsersIcon } from "@/icons/users-icon";
import { WhatsappOutlineIcon } from "@/icons/whatsapp-outline-icon";
import { useParams } from "next/navigation";
import useCompanyBySlug from "@/queries/use-company-by-slug";
import { MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function DetailInformation() {
  const params = useParams();
  const slug = params?.slug as string;
  const { data: item, isLoading } = useCompanyBySlug(slug);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getYear = (date: number | any) => {
    if (!date) return "N/A";
    if (typeof date === "number") return new Date(date).getFullYear();
    if (date.toMillis) return new Date(date.toMillis()).getFullYear();
    return "N/A";
  };

  if (isLoading) {
    return (
      <Card className="lg:col-span-1 rounded-[12px] pt-0 h-max py-0">
        <CardContent className="flex flex-col items-center text-center px-0">
          <div className="gap-6 items-center flex flex-col py-8 px-5 lg:p-8 w-full">
            <Skeleton className="w-20 h-20 rounded-full" />
            <Skeleton className="h-8 w-48" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-10 rounded-[6px]" />
              ))}
            </div>
          </div>
          <div className="space-y-6 w-full text-left px-5 py-6 lg:p-6 border-t">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center justify-between ">
                <div className="flex gap-2 items-center">
                  <Skeleton className="h-10 w-10 rounded-[6px]" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <Skeleton className="h-5 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!item) return null;

  const formationYear = getYear(item.establishmentDate);

  return (
    <Card className="lg:col-span-1 rounded-[12px] pt-0 h-max py-0">
      <CardContent className=" flex flex-col items-center text-center px-0">
        <div className="gap-6 items-center flex flex-col py-8 px-5 lg:p-8 ">
          <div className="flex items-center justify-center w-20 h-20 bg-[#EEF6FF] rounded-full mb-0">
            <BuildingIcon className="text-primary size-10 mx-4 "></BuildingIcon>
          </div>

          <h2 className="text-2xl font-medium leading-[110%] tracking-[-0.02em]">
            {item.name}
          </h2>

          <div className="flex flex-wrap justify-center gap-2">
            {item.category && (
              <span className="border bg-muted py-1 px-3 rounded-sm text-sm leading-[110%] tracking-[-0.01em] text-muted-foreground">
                {item.category.name}
              </span>
            )}
            {item.territory && (
              <span className="border bg-muted py-1 px-3 rounded-sm text-sm leading-[110%] tracking-[-0.01em] text-muted-foreground">
                {item.territory.name}
              </span>
            )}
          </div>

          <div className="flex justify-center gap-2">
            {item.socials?.whatsapp && (
              <Link
                href={`https://wa.me/${item.socials?.whatsapp}`}
                className="flex items-center justify-center"
              >
                <Button variant="outline" size="icon" className="rounded-[6px]">
                  <WhatsappOutlineIcon className="text-muted-foreground size-[18px] text-lg" />
                </Button>
              </Link>
            )}
            {item.socials?.twitter && (
              <Link
                href={item.socials?.twitter}
                className="flex items-center justify-center"
              >
                <Button variant="outline" size="icon" className="rounded-[6px]">
                  <TwitterIcon className="text-muted-foreground size-[18px] text-lg" />
                </Button>
              </Link>
            )}

            {item.socials?.facebook && (
              <Link
                href={item.socials?.facebook}
                className="flex items-center justify-center"
              >
                <Button variant="outline" size="icon" className="rounded-[6px]">
                  <FacebookFillIcon className="text-muted-foreground size-[18px] text-lg" />
                </Button>
              </Link>
            )}
            {item.socials?.instagram && (
              <Link
                href={item.socials?.instagram}
                className="flex items-center justify-center"
              >
                <Button variant="outline" size="icon" className="rounded-[6px]">
                  <InstagramIconFlat className="text-muted-foreground size-[18px] text-lg" />
                </Button>
              </Link>
            )}
            {item.socials?.linkedin && (
              <Link
                href={item.socials?.linkedin}
                className="flex items-center justify-center"
              >
                <Button variant="outline" size="icon" className="rounded-[6px]">
                  <LinkedinIconFlat className="text-muted-foreground size-[18px] text-lg" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="space-y-6 w-full text-left text-sm px-5 py-6 lg:p-6">
          <div className="flex items-center justify-between ">
            <div className="flex gap-2 items-center">
              <div className="h-10 w-10 p-[10px] border rounded-[6px]">
                <MapPin strokeWidth={1.5} className="size-5 text-primary" />
              </div>
              <span className="text-muted-foreground text-base leading-[150%] tracking-[-0.01em]">
                Territoire
              </span>
            </div>
            <span className=" text-base leading-[150%] tracking-[-0.01em]">
              {item.territory?.name || "N/A"}
            </span>
          </div>
          <div className="flex items-center justify-between ">
            <div className="flex gap-2 items-center">
              <div className="h-10 w-10 p-[10px] border rounded-[6px]">
                <Map2Icon className="size-5 text-primary" />
              </div>
              <span className=" text-muted-foreground text-base leading-[150%] tracking-[-0.01em]">
                Adresse
              </span>
            </div>
            <span className="text-right text-base leading-[150%] tracking-[-0.01em]">
              {item.address || "N/A"}
            </span>
          </div>
          <div className="flex items-center justify-between ">
            <div className="flex gap-2 items-center">
              <div className="h-10 w-10 p-[10px] border rounded-[6px]">
                <UsersIcon className="size-5 text-primary" />
              </div>
              <span className="text-muted-foreground text-base leading-[150%] tracking-[-0.01em]">
                Date de création
              </span>
            </div>
            <span className=" text-base leading-[150%] tracking-[-0.01em]">
              {formationYear}
            </span>
          </div>
          <div className="flex items-center justify-between ">
            <div className="flex gap-2 items-center">
              <div className="h-10 w-10 p-[10px] border rounded-[6px]">
                <IdIcon strokeWidth={1.5} className="size-5 text-primary" />
              </div>
              <span className="text-muted-foreground text-base leading-[150%] tracking-[-0.01em]">
                ID number
              </span>
            </div>
            <span className=" text-base leading-[150%] tracking-[-0.01em]">
              {item.idNumber || "N/A"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
