import { ArrowRightBoldIcon } from "@/icons/arrow-right-bold-icon";
import { BuildingIcon } from "@/icons/building-icon";
import { FacebookFillIcon } from "@/icons/facebook-fill-icon";
import { InstagramIconFlat } from "@/icons/instagram-icon-flat";
import { LinkedinIconFlat } from "@/icons/linkedin-icon-flat";
import { MapPin, User } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export function CompanyCardSkeleton() {
  return (
    <article className="border rounded-[12px] flex flex-col justify-between hover:shadow-sm transition-all w-full h-full">
      <div className="flex items-center gap-4 py-6 px-5 lg:px-6 border-b">
        <Skeleton className="w-16 h-16 rounded-full" />
        <Skeleton className="h-7 w-3/4" />
      </div>

      <div className="py-6 px-5 lg:px-6 space-y-4 ">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-start gap-5">
            <div className="flex gap-2 items-center min-w-[108px]">
              <Skeleton className="size-5 rounded" />
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-5 w-24" />
          </div>
        ))}
      </div>

      <div className=" rounded-b-xl flex items-center justify-between border-t px-6 py-4 bg-[var(--body)]">
        <div className="flex items-center gap-4">
          <Skeleton className="size-5 rounded" />
          <Skeleton className="size-5 rounded" />
          <Skeleton className="size-5 rounded" />
        </div>
        <Skeleton className="h-5 w-24" />
      </div>
    </article>
  );
}

type Props = {
  slug: string;
  name: string;
  category: string;
  territory: string;
  authorizedRepresentative: string;
  socials?: {
    facebook?: string | null;
    instagram?: string | null;
    linkedin?: string | null;
  };
};

export default function CompanyCard({
  slug,
  name,
  category,
  territory,
  authorizedRepresentative,
  socials
}: Props) {
  return (
    <article className="border rounded-[12px] flex flex-col justify-between hover:shadow-sm transition-all w-full h-full">
      <div className="flex items-center gap-4 py-6 px-5 lg:px-6 border-b">
        <div className="flex items-center justify-center w-16 h-16 bg-[#EEF6FF] rounded-full">
          <BuildingIcon className="text-primary size-8 mx-4 "></BuildingIcon>
        </div>

        <div className="flex flex-col">
          <span
            className="font-medium text-xl text-foreground leading-[130%] tracking-[-0.02em] line-clamp-2"
            title={name}
          >
            {name}
          </span>
        </div>
      </div>

      <div className="py-6 px-5 lg:px-6 space-y-4 ">
        <div className="flex items-start gap-5">
          <div className="flex gap-2 items-center min-w-[108px]">
            <BuildingIcon className="size-5 text-muted-foreground"></BuildingIcon>
            <span className="text-muted-foreground leading-[150%] text-base tracking-[-0.01em]">
              Catégorie
            </span>
          </div>
          <span className="leading-[150%] text-base tracking-[-0.01em] font-medium">
            {category || "-"}
          </span>
        </div>

        <div className="flex items-start gap-5">
          <div className="flex  gap-2 items-center min-w-[108px]">
            <MapPin
              strokeWidth={1.5}
              className="size-5 text-muted-foreground/80"
            ></MapPin>
            <span className="text-muted-foreground leading-[150%] text-base tracking-[-0.01em]">
              Territoire
            </span>
          </div>
          <span className=" leading-[150%] text-base tracking-[-0.01em] font-medium">
            {territory || "-"}
          </span>
        </div>

        <div className="flex items-start gap-5">
          <div className="flex  gap-2 items-center min-w-[108px]">
            <User
              strokeWidth={1}
              className="size-5 text-muted-foreground/80"
            ></User>
            <span className="text-muted-foreground leading-[150%] text-base tracking-[-0.01em]">
              PIC
            </span>
          </div>
          <span className=" leading-[150%] text-base tracking-[-0.01em] font-medium">
            {authorizedRepresentative || "-"}
          </span>
        </div>
      </div>

      <div className=" rounded-b-xl flex items-center justify-between border-t px-6 py-4 bg-[var(--body)]">
        <div className="flex items-center gap-4 text-muted-foreground">
          {socials?.facebook && (
            <Link href={socials?.facebook}>
              <FacebookFillIcon className="ri-facebook-fill text-xl"></FacebookFillIcon>
            </Link>
          )}
          {socials?.instagram && (
            <Link href={socials?.instagram}>
              <InstagramIconFlat className="ri-instagram-line text-xl"></InstagramIconFlat>
            </Link>
          )}
          {socials?.linkedin && (
            <Link href={socials?.linkedin}>
              <LinkedinIconFlat className="ri-linkedin-box-line text-xl"></LinkedinIconFlat>
            </Link>
          )}
        </div>

        <Link
          href={`/explore-directory/${slug}`}
          className="flex items-center gap-[6px]"
        >
          <span className="text-primary text-sm font-medium leading-5 tracking-[-0.01em] ">
            View detail
          </span>
          <ArrowRightBoldIcon className="inline size-5 text-primary" />
        </Link>
      </div>
    </article>
  );
}
