import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BuildingIcon } from "@/icons/building-icon";
import { CalendarDue } from "@/icons/calendar-due-icon";
import { CoinIcon } from "@/icons/coins-icon";
import { FacebookFillIcon } from "@/icons/facebook-fill-icon";
import { IdBadgeIcon } from "@/icons/id-badge-icon";
import { IdIcon } from "@/icons/id-number-icon";
import { InstagramIcon } from "@/icons/instagram-icon";
import { InstagramIconFlat } from "@/icons/instagram-icon-flat";
import { LinkedinIconFlat } from "@/icons/linkedin-icon-flat";
import { Map2Icon } from "@/icons/map-2-icon";
import { TwitterIcon } from "@/icons/twitter-icon";
import { UsersIcon } from "@/icons/users-icon";
import { WaIcon } from "@/icons/wa-icon";
import { WhatsappOutlineIcon } from "@/icons/whatsapp-outline-icon";
import { Company } from "@/types/company.type";
import { DirectoryItem } from "@/types/directory.type";
import { Settings, Users } from "lucide-react";
import Link from "next/link";

export default function DetailInformation() {
  return (
    <Card className="lg:col-span-1 rounded-[12px] pt-0 h-max py-0 b">
      <CardContent className=" flex flex-col items-center text-center px-0">
        <div className="gap-6 items-center flex flex-col py-8 px-5 lg:p-8 border-b w-full ">
          <div className="flex items-center justify-center w-20 h-20 bg-[#EEF6FF] rounded-full mb-0">
            <BuildingIcon className="text-primary size-10 mx-4 "></BuildingIcon>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-medium leading-[110%] tracking-[-0.02em]">
              Groupe Bernard Hayot
            </h2>

            <div className="flex flex-wrap justify-center gap-2">
              <span className="border bg-muted py-1 px-3 rounded-sm text-sm leading-[110%] tracking-[-0.01em] text-muted-foreground">
                Retail
              </span>
              <span className="border bg-muted py-1 px-3 rounded-sm text-sm leading-[110%] tracking-[-0.01em] text-muted-foreground">
                Distribution
              </span>
              <span className="border bg-muted py-1 px-3 rounded-sm text-sm leading-[110%] tracking-[-0.01em] text-muted-foreground">
                Automotive
              </span>
            </div>
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
                <CalendarDue strokeWidth={1} className="size-5 text-primary" />
              </div>
              <span className="text-muted-foreground text-base leading-[150%] tracking-[-0.01em]">
                Création
              </span>
            </div>
            <span className=" text-base leading-[150%] tracking-[-0.01em]">
              1960
            </span>
          </div>
          <div className="flex items-center justify-between ">
            <div className="flex gap-2 items-center">
              <div className="h-10 w-10 p-[10px] border rounded-[6px]">
                <Users className="size-5 text-primary" />
              </div>
              <span className=" text-muted-foreground text-base leading-[150%] tracking-[-0.01em]">
                Salariés
              </span>
            </div>
            <span className="text-right text-base leading-[150%] tracking-[-0.01em]">
              {">"}18,000
            </span>
          </div>
          <div className="flex items-center justify-between ">
            <div className="flex gap-2 items-center">
              <div className="h-10 w-10 p-[10px] border rounded-[6px]">
                <CoinIcon className="size-5 text-primary" />
              </div>
              <span className="text-muted-foreground text-base leading-[150%] tracking-[-0.01em]">
                Chiffre d&apos;affaires
              </span>
            </div>
            <div>
              <span className=" text-base leading-[150%] tracking-[-0.01em]">
                4,0 Mds €
              </span>
              <span className="text-sm text-muted-foreground"> (2024) </span>
            </div>
          </div>
          <div className="flex items-center justify-between ">
            <div className="flex gap-2 items-center">
              <div className="h-10 w-10 p-[10px] border rounded-[6px]">
                <Map2Icon strokeWidth={1.5} className="size-5 text-primary" />
              </div>
              <span className="text-muted-foreground text-base leading-[150%] tracking-[-0.01em]">
                Implantation
              </span>
            </div>
            <span className=" text-base leading-[150%] tracking-[-0.01em] text-end">
              Le Lamentin, Martinique, French Overseas
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
              #A00001
            </span>
          </div>
          <div className="flex items-center justify-between ">
            <div className="flex gap-2 items-center">
              <div className="h-10 w-10 p-[10px] border rounded-[6px]">
                <Settings strokeWidth={1.5} className="size-5 text-primary" />
              </div>
              <span className="text-muted-foreground text-base leading-[150%] tracking-[-0.01em]">
                Domaine d&apos;activité
              </span>
            </div>
            <span className=" text-base leading-[150%] tracking-[-0.01em]">
              Agroalimentaire
            </span>
          </div>
          <div className="flex items-center justify-between ">
            <div className="flex gap-2 items-center">
              <div className="h-10 w-10 p-[10px] border rounded-[6px]">
                <IdBadgeIcon
                  strokeWidth={1.5}
                  className="size-5 text-primary"
                />
              </div>
              <span className="text-muted-foreground text-base leading-[150%] tracking-[-0.01em]">
                Code NAF
              </span>
            </div>
            <span className=" text-base leading-[150%] tracking-[-0.01em]">
              4639B
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
