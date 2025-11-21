import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ExternalLink,
  Globe,
  MailIcon,
  MapPin,
  PhoneIcon
} from "lucide-react";
import Link from "next/link";

export default function ContactCard() {
  return (
    <Card className="rounded-[12px] gap-0 py-0 w-full lg:min-w-[836px]">
      <CardHeader className="lg:py-5 lg:px-6 p-5">
        <CardTitle className="text-xl leading-[110%] tracking-[-0.01em]  font-medium">
          Contact
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 min-w-full border-t">
        <div className="pb-6 flex gap-6 lg:gap-0 lg:justify-between  flex-col lg:flex-row">
          <div className="flex items-center gap-3 h-max">
            <div className="h-10 w-10 p-[10px] border rounded-[6px]">
              <PhoneIcon strokeWidth={1.5} className="size-5 text-primary" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm leading-[140%] tracking-[-0.01em] text-muted-foreground">
                Phone number
              </span>
              <span className="text-base leading-[150%] tracking-[-0.01em] ">
                +596 596 50 00 00{" "}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 p-[10px] border rounded-[6px]">
              <MailIcon strokeWidth={1.5} className="size-5 text-primary" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm leading-[140%] tracking-[-0.01em] text-muted-foreground">
                Email
              </span>
              <span className="text-base leading-[150%] tracking-[-0.01em] ">
                contact@gbh.fr{" "}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 p-[10px] border rounded-[6px]">
              <Globe strokeWidth={1.5} className="size-5 text-primary" />
            </div>
            <div className="flex flex-col gap-1 h-full">
              <span className="text-sm leading-[140%] tracking-[-0.01em] text-muted-foreground">
                Website
              </span>
              <Link
                href="https://www.gbh.fr/"
                target="_blank"
                className="text-base flex items-center gap-1 leading-[150%] tracking-[-0.01em] hover:text-primary"
              >
                https://www.gbh.fr/
                <ExternalLink className="size-[18px] text-primary" />
              </Link>
            </div>
          </div>
        </div>
        <hr />
        <div className="space-y-3 pt-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-end lg:gap-0 lg:justify-between gap-4">
            <div className="flex gap-2 items-center">
              <div className="h-10 w-10 p-[10px] border rounded-[6px]">
                <MapPin strokeWidth={1.5} className="size-5 text-primary" />
              </div>
              <div className="w-full">
                <span className="text-sm leading-[140%] tracking-[-0.01em] text-muted-foreground">
                  Address
                </span>
                <div className="flex justify-between">
                  <span className="text-base leading-[150%] tracking-[-0.01em] ">
                    Zone de la Lézarde, 97232 Le Lamentin, Martinique, France
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              className="font-normal px-3 py-[10px] text-sm leading-[140%] tracking-[-0.01em]"
            >
              <MapPin className="size-5 text-muted-foreground" />
              Localiser{" "}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
