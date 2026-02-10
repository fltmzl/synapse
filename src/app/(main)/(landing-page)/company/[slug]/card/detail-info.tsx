import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BuildingIcon } from "@/icons/building-icon";
import { CalendarDue } from "@/icons/calendar-due-icon";
import { CoinIcon } from "@/icons/coins-icon";
import { FacebookFillIcon } from "@/icons/facebook-fill-icon";
import { IdBadgeIcon } from "@/icons/id-badge-icon";
import { IdIcon } from "@/icons/id-number-icon";
import { InstagramIconFlat } from "@/icons/instagram-icon-flat";
import { LinkedinIconFlat } from "@/icons/linkedin-icon-flat";
import { Map2Icon } from "@/icons/map-2-icon";
import { TwitterIcon } from "@/icons/twitter-icon";
import { UsersIcon } from "@/icons/users-icon";
import { WaIcon } from "@/icons/wa-icon";
import { WhatsappOutlineIcon } from "@/icons/whatsapp-outline-icon";
import { CompanyWithDetails } from "@/types/person-relation.type";
import { Settings, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface DetailInformationProps {
  company: CompanyWithDetails;
}

export default function DetailInformation({ company }: DetailInformationProps) {
  const establishmentYear = company.establishmentDate
    ? new Date(
        typeof company.establishmentDate === "number"
          ? company.establishmentDate
          : company.establishmentDate.toMillis()
      ).getFullYear()
    : "N/A";

  const turnover = company.economicalNumbers?.turnover
    ? `${company.economicalNumbers.turnover} Mds €`
    : "N/A";

  const employeeCount = company.economicalNumbers?.number_of_employees
    ? `${company.economicalNumbers.number_of_employees}`
    : "N/A";

  return (
    <Card className="lg:col-span-1 rounded-[12px] pt-0 h-max py-0 b">
      <CardContent className=" flex flex-col items-center text-center px-0">
        <div className="gap-6 items-center flex flex-col py-8 px-5 lg:p-8 border-b w-full ">
          <div className="flex items-center justify-center w-20 h-20 bg-[#EEF6FF] rounded-full mb-0">
            {company.profilePicture ? (
              <Image
                src={company.profilePicture}
                alt={company.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <BuildingIcon className="text-primary size-10 mx-4 " />
            )}
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-medium leading-[110%] tracking-[-0.02em]">
              {company.name}
            </h2>

            <div className="flex flex-wrap justify-center gap-2">
              <span className="border bg-muted py-1 px-3 rounded-sm text-sm leading-[110%] tracking-[-0.01em] text-muted-foreground">
                {company?.category?.name || "Uncategorized"}
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-2">
            {company.socials?.whatsapp && (
              <Link
                href={company.socials.whatsapp}
                target="_blank"
                className="flex items-center justify-center"
              >
                <Button variant="outline" size="icon" className="rounded-[6px]">
                  <WhatsappOutlineIcon className="text-muted-foreground size-[18px] text-lg" />
                </Button>
              </Link>
            )}
            {company.socials?.twitter && (
              <Link
                href={company.socials.twitter}
                target="_blank"
                className="flex items-center justify-center"
              >
                <Button variant="outline" size="icon" className="rounded-[6px]">
                  <TwitterIcon className="text-muted-foreground size-[18px] text-lg" />
                </Button>
              </Link>
            )}
            {company.socials?.facebook && (
              <Link
                href={company.socials.facebook}
                target="_blank"
                className="flex items-center justify-center"
              >
                <Button variant="outline" size="icon" className="rounded-[6px]">
                  <FacebookFillIcon className="text-muted-foreground size-[18px] text-lg" />
                </Button>
              </Link>
            )}
            {company.socials?.instagram && (
              <Link
                href={company.socials.instagram}
                target="_blank"
                className="flex items-center justify-center"
              >
                <Button variant="outline" size="icon" className="rounded-[6px]">
                  <InstagramIconFlat className="text-muted-foreground size-[18px] text-lg" />
                </Button>
              </Link>
            )}
            {company.socials?.linkedin && (
              <Link
                href={company.socials.linkedin}
                target="_blank"
                className="flex items-center justify-center"
              >
                <Button variant="outline" size="icon" className="rounded-[6px]">
                  <LinkedinIconFlat className="text-muted-foreground size-[18px] text-lg" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="space-y-4 lg:space-y-6 w-full text-left text-sm px-5 py-6 lg:p-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 lg:justify-between ">
            <div className="flex gap-2 items-center">
              <div className="h-10 w-10 p-[10px] border rounded-[6px]">
                <CalendarDue strokeWidth={1} className="size-5 text-primary" />
              </div>
              <span className="text-muted-foreground text-base leading-[150%] tracking-[-0.01em]">
                Création
              </span>
            </div>
            <span className=" text-base leading-[150%] tracking-[-0.01em]">
              {establishmentYear}
            </span>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 lg:justify-between ">
            <div className="flex gap-2 items-center">
              <div className="h-10 w-10 p-[10px] border rounded-[6px]">
                <Users className="size-5 text-primary" />
              </div>
              <span className=" text-muted-foreground text-base leading-[150%] tracking-[-0.01em]">
                Salariés
              </span>
            </div>
            <span className="lg:text-right text-base leading-[150%] tracking-[-0.01em]">
              {employeeCount}
            </span>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 lg:justify-between ">
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
                {turnover}
              </span>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 lg:justify-between ">
            <div className="Trial Details flex gap-2 items-center">
              <div className="h-10 w-10 p-[10px] border rounded-[6px]">
                <Map2Icon strokeWidth={1.5} className="size-5 text-primary" />
              </div>
              <span className="text-muted-foreground text-base leading-[150%] tracking-[-0.01em]">
                Implantation
              </span>
            </div>
            <span className=" text-base leading-[150%] tracking-[-0.01em] lg:text-end">
              {company.implantation || company.address || "N/A"}
            </span>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 lg:justify-between ">
            <div className="flex gap-2 items-center">
              <div className="h-10 w-10 p-[10px] border rounded-[6px]">
                <IdIcon strokeWidth={1.5} className="size-5 text-primary" />
              </div>
              <span className="text-muted-foreground text-base leading-[150%] tracking-[-0.01em]">
                ID number
              </span>
            </div>
            <span className=" text-base leading-[150%] tracking-[-0.01em]">
              {company.code || company.idNumber || "N/A"}
            </span>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 lg:justify-between ">
            <div className="flex gap-2 items-center">
              <div className="h-10 w-10 p-[10px] border rounded-[6px]">
                <Settings strokeWidth={1.5} className="size-5 text-primary" />
              </div>
              <span className="text-muted-foreground text-base leading-[150%] tracking-[-0.01em]">
                Domaine d&apos;activité
              </span>
            </div>
            <span className=" text-base leading-[150%] tracking-[-0.01em] text-right">
              {company.activity || "N/A"}
            </span>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 lg:justify-between ">
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
              {company.nafCode || "N/A"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
