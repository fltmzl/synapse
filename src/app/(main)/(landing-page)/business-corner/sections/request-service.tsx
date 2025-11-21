import BusinessForm from "@/components/business-form";
import { ArrowUpRightIcon } from "@/icons/arrow-up-right";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import Link from "next/link";

export default function RequestService() {
  return (
    <section className="bg-background">
      <div className="w-full max-w-7xl mx-auto px-6 py-12 lg:py-25">
        <div className="flex lg:flex-row flex-col gap-6 lg:gap-16">
          <div className="flex-1 min-h-full justify-between flex flex-col">
            <div className="text-left pb-8 lg:pb-16">
              <h1 className="text-3xl lg:text-[40px] font-medium tracking-[-0.02em] leading-[110%] mb-4 lg:w-[391px]">
                Prestations complémentaires
              </h1>
              <p className="text-muted-foreground text-base leading[150px] tracking-[-0.01em] lg:w-[391px]">
                Je souhaite un chiffrage pour la réalisation d&lsquo;une
                prestation complémentaire ou spécifique par Synapse
              </p>
            </div>
            <div className="flex flex-col gap-8">
              <h1 className="text-2xl lg:text-3xl font-medium leading-[110%] tracking-[-0.02em]">
                Contact
              </h1>

              <div className="flex flex-col gap-5">
                <Link
                  href="tel:+33123456789"
                  className="flex items-start gap-4   hover:text-primary transition-colors"
                >
                  <div className="h-10 w-10 p-[10px] border rounded-[6px] flex items-center justify-center">
                    <PhoneCall
                      strokeWidth={1.5}
                      className="size-5 text-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-base leading-[150%] tracking-[-0.01em] text-muted-foreground">
                      Phone number
                    </span>
                    <div className="flex gap-1 items-center">
                      <span className="text-lg leading-[140%] tracking-[-0.01em]">
                        +33 1 23 45 67 89
                      </span>
                      <ArrowUpRightIcon className="size-5 text-primary" />
                    </div>
                  </div>
                </Link>

                <Link
                  href="mailto:contact@synapse.fr"
                  className="flex items-start gap-4   hover:text-primary transition-colors"
                >
                  <div className="h-10 w-10 p-[10px] border rounded-[6px] flex items-center justify-center">
                    <Mail strokeWidth={1.5} className="size-5 text-primary" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-base leading-[150%] tracking-[-0.01em] text-muted-foreground">
                      Email
                    </span>
                    <div className="flex gap-1 items-center">
                      <span className="text-lg leading-[140%] tracking-[-0.01em]">
                        contact@synapse.fr
                      </span>
                      <ArrowUpRightIcon className="size-5 text-primary" />
                    </div>
                  </div>
                </Link>

                <Link
                  href="https://maps.google.com?q=123+Avenue+de+la+République,+Paris,+France"
                  target="_blank"
                  className="flex items-start gap-4  hover:text-primary transition-colors"
                >
                  <div className="h-10 w-10 p-[10px] border rounded-[6px] flex items-center justify-center">
                    <MapPin strokeWidth={1.5} className="size-5 text-primary" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-base leading-[150%] tracking-[-0.01em] text-muted-foreground">
                      Location
                    </span>
                    <div className="flex gap-1 items-center">
                      <span className="text-lg leading-[140%] tracking-[-0.01em]">
                        123 Avenue de la République, Paris, France
                      </span>
                      <ArrowUpRightIcon className="size-5 text-primary" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-1 p-6 border rounded-[12px] bg-background flex flex-col gap-6 h-full">
            <BusinessForm />
          </div>
        </div>
      </div>
    </section>
  );
}
