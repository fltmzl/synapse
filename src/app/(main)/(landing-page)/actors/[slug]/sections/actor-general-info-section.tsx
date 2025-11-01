import SectionContainer from "@/components/container/section-container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FbIconFlat } from "@/icons/fb-icon-flat";
import { IdIcon } from "@/icons/id-icon";
import { InstagramIconFlat } from "@/icons/instagram-icon-flat";
import { LinkedinIconFlat } from "@/icons/linkedin-icon-flat";
import { MailIcon } from "@/icons/mail-icon";
import { MapPinIcon } from "@/icons/map-pin-icon";
import { PhoneIcon } from "@/icons/phone-icon";
import { WhatsappIcon } from "@/icons/whatsapp-icon";
import { XTwitterIcon } from "@/icons/x-twitter-icon";
import GeneralInfo from "../components/general-info";

export default function ActorGeneralInfoSection() {
  const socialMediaLinks = [
    {
      id: "wa",
      icon: WhatsappIcon,
      link: "#"
    },
    {
      id: "twitter",
      icon: XTwitterIcon,
      link: "#"
    },
    {
      id: "facebook",
      icon: FbIconFlat,
      link: "#"
    },
    {
      id: "instagram",
      icon: InstagramIconFlat,
      link: "#"
    },
    {
      id: "linkedin",
      icon: LinkedinIconFlat,
      link: "#"
    }
  ];

  const generalInfomations = [
    {
      id: "phone",
      icon: PhoneIcon,
      label: "Phone number",
      value: "0696438493"
    },
    {
      id: "contact",
      icon: MailIcon,
      label: "Contact",
      value: "im@synapse.com"
    },
    {
      id: "teritory",
      icon: MapPinIcon,
      label: "Territoire",
      value: "Martinique, France"
    },
    {
      id: "idNumber",
      icon: IdIcon,
      label: "ID Number",
      value: "#A00001"
    }
  ];

  return (
    <SectionContainer className="rounded-2lg">
      <div className="py-8 px-11 lg:py-6 lg:px-6 flex flex-col lg:flex-row lg:justify-between items-center lg:items-start gap-6">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <Avatar className="w-[100px] h-[100px]">
            <AvatarImage
              src={"http://placehold.jpw/100x100.png"}
              alt={"actor"}
            />
            <AvatarFallback>
              <span className="text-5xl">I</span>
            </AvatarFallback>
          </Avatar>
          <div className="text-center lg:text-start">
            <h1 className="font-medium text-2xl lg:text-3xl mb-1">
              Isabelle Marie Fontaine
            </h1>
            <p className="space-x-1 lg:text-lg">
              <span>Economique</span>
              <span>•</span>
              <span>Politique</span>
            </p>
          </div>
        </div>

        <div className="space-x-2">
          {socialMediaLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Button
                key={link.id}
                size="icon"
                variant="outline"
                className="rounded-full text-foreground/70"
              >
                <Icon className="size-4.5" />
              </Button>
            );
          })}
        </div>
      </div>
      <hr />
      <div className="py-6 px-4 lg:py-8 lg:px-8 grid lg:grid-cols-4 gap-6 lg:gap-20">
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
