"use client";

import SectionContainer from "@/components/container/section-container";
import NoResult from "@/components/no-result";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FbIconFlat } from "@/icons/fb-icon-flat";
import { IdIcon } from "@/icons/id-icon";
import { InstagramIconFlat } from "@/icons/instagram-icon-flat";
import { LinkedinIconFlat } from "@/icons/linkedin-icon-flat";
import { MailIcon } from "@/icons/mail-icon";
import { MapPinIcon } from "@/icons/map-pin-icon";
import { PhoneIcon } from "@/icons/phone-icon";
import { WhatsappIcon } from "@/icons/whatsapp-icon";
import { XTwitterIcon } from "@/icons/x-twitter-icon";
import usePerson from "@/queries/use-person";
import Link from "next/link";
import { useParams } from "next/navigation";
import GeneralInfo from "../components/general-info";

export default function ActorGeneralInfoSection() {
  const { slug } = useParams();
  const { data: person, isLoading } = usePerson(slug as string);

  if (isLoading) {
    return (
      <SectionContainer className="rounded-2lg">
        <div className="py-8 px-11 lg:py-6 lg:px-6 flex flex-col lg:flex-row lg:justify-between items-center lg:items-start gap-6">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <Skeleton className="w-[100px] h-[100px] rounded-full" />
            <div className="flex flex-col items-center lg:items-start gap-2">
              <Skeleton className="h-8 w-48 lg:w-64" />
              <Skeleton className="h-5 w-32 lg:w-40" />
            </div>
          </div>

          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="size-10 rounded-full" />
            ))}
          </div>
        </div>
        <hr />
        <div className="py-6 px-4 lg:py-8 lg:px-8 flex flex-col lg:flex-row gap-6 lg:gap-20">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    );
  }

  if (!person) {
    return (
      <SectionContainer>
        <NoResult
          title="Actor not found"
          description="The actor you are looking for does not exist."
        />
      </SectionContainer>
    );
  }

  const socialMediaLinks = [
    {
      id: "wa",
      icon: WhatsappIcon,
      link: person.socials?.whatsapp
        ? `https://wa.me/${person.socials?.whatsapp}`
        : ""
    },
    {
      id: "twitter",
      icon: XTwitterIcon,
      link: person.socials?.twitter
    },
    {
      id: "facebook",
      icon: FbIconFlat,
      link: person.socials?.facebook
    },
    {
      id: "instagram",
      icon: InstagramIconFlat,
      link: person.socials?.instagram
    },
    {
      id: "linkedin",
      icon: LinkedinIconFlat,
      link: person.socials?.linkedin
    }
  ].filter((link) => link.link); // Only show links that exist

  const generalInfomations = [
    {
      id: "phone",
      icon: PhoneIcon,
      label: "Phone number",
      value: person.phoneNumber || "N/A"
    },
    {
      id: "contact",
      icon: MailIcon,
      label: "Contact",
      value: person.email || "N/A"
    },
    {
      id: "teritory",
      icon: MapPinIcon,
      label: "Territoire",
      value: person.territory?.name || "N/A"
    },
    {
      id: "idNumber",
      icon: IdIcon,
      label: "ID Number",
      value: person.idNumber || "N/A"
    }
  ];

  return (
    <SectionContainer className="rounded-2lg">
      <div className="py-8 px-11 lg:py-6 lg:px-6 flex flex-col lg:flex-row lg:justify-between items-center lg:items-start gap-6">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <Avatar className="w-[100px] h-[100px]">
            <AvatarImage src={person.profilePicture} alt={person.name} />
            <AvatarFallback>
              <span className="text-5xl">{person.name[0]}</span>
            </AvatarFallback>
          </Avatar>
          <div className="text-center lg:text-start">
            <h1 className="font-medium text-2xl lg:text-3xl mb-1">
              {person.name}
            </h1>
            <p className="space-x-1 lg:text-lg">
              <span>{person.category?.name || "Uncategorized"}</span>
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {socialMediaLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Button
                key={link.id}
                size="icon"
                variant="outline"
                className="rounded-full text-foreground/70"
                asChild
              >
                <Link
                  href={link.link!}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="size-4.5" />
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
      <hr />
      <div className="py-6 px-4 lg:py-8 lg:px-8 flex flex-col lg:flex-row gap-6 lg:gap-20">
        {generalInfomations.map((info) => (
          <GeneralInfo
            key={info.id}
            icon={info.icon}
            label={info.label}
            value={info.value}
          />
        ))}
      </div>
    </SectionContainer>
  );
}
