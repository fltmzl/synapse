import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BuildingIcon } from "@/icons/building-icon";
import { FacebookFillIcon } from "@/icons/facebook-fill-icon";
import { IdIcon } from "@/icons/id-number-icon";
import { InstagramIcon } from "@/icons/instagram-icon";
import { InstagramIconFlat } from "@/icons/instagram-icon-flat";
import { LinkedinIconFlat } from "@/icons/linkedin-icon-flat";
import { Map2Icon } from "@/icons/map-2-icon";
import { TwitterIcon } from "@/icons/twitter-icon";
import { UsersIcon } from "@/icons/users-icon";
import { WaIcon } from "@/icons/wa-icon";
import { WhatsappOutlineIcon } from "@/icons/whatsapp-outline-icon";
import { DirectoryItem } from "@/types/directory.type";
import { IdCard, IdCardIcon, Map, MapIcon, MapPin } from "lucide-react";
import Link from "next/link";

export default function DetailInformation({ item }: { item: DirectoryItem }) {
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
            <span className="border bg-muted py-1 px-3 rounded-sm text-sm leading-[110%] tracking-[-0.01em] text-muted-foreground">
              {item.category}
            </span>
            <span className="border bg-muted py-1 px-3 rounded-sm text-sm leading-[110%] tracking-[-0.01em] text-muted-foreground">
              {item.territory}
            </span>
          </div>

          <div className="flex justify-center gap-2">
            <Link href="#" className="flex items-center justify-center">
              <Button variant="outline" size="icon" className="rounded-[6px]">
                <WhatsappOutlineIcon className="text-muted-foreground size-[18px] text-lg" />
              </Button>
            </Link>
            <Link href="#" className="flex items-center justify-center">
              <Button variant="outline" size="icon" className="rounded-[6px]">
                <TwitterIcon className="text-muted-foreground size-[18px] text-lg" />
              </Button>
            </Link>
            <Link href="#" className="flex items-center justify-center">
              <Button variant="outline" size="icon" className="rounded-[6px]">
                <FacebookFillIcon className="text-muted-foreground size-[18px] text-lg" />
              </Button>
            </Link>
            <Link href="#" className="flex items-center justify-center">
              <Button variant="outline" size="icon" className="rounded-[6px]">
                <InstagramIconFlat className="text-muted-foreground size-[18px] text-lg" />
              </Button>
            </Link>
            <Link href="#" className="flex items-center justify-center">
              <Button variant="outline" size="icon" className="rounded-[6px]">
                <LinkedinIconFlat className="text-muted-foreground size-[18px] text-lg" />
              </Button>
            </Link>
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
              {item.territory}
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
              {item.address}
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
              {item.year}
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
              {item.id}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
