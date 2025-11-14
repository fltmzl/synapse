import BrandLogo from "@/components/brand-logo";
import { CopyrightYear } from "@/components/copyright-year";
import { Button } from "@/components/ui/button";
import { FbIcon } from "@/icons/fb-icon";
import { FbIconFlat } from "@/icons/fb-icon-flat";
import { InstagramIconFlat } from "@/icons/instagram-icon-flat";
import { LinkedinIconFlat } from "@/icons/linkedin-icon-flat";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-[#122255]">
      <footer className="w-full max-w-7xl mx-auto text-[#94A3B8] py-12 lg:py-20 px-6">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-10 pb-10 border-b border-border/10">
          <div>
            <div className="flex justify-start mb-8 lg:mb-10">
              <BrandLogo type="white" />
            </div>

            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <PhoneIcon size={20} />
                <span>+596 696 43 84 93</span>
              </li>
              <li className="flex items-center gap-2">
                <MailIcon size={20} />
                <span>contact@synapse-intelligence.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPinIcon size={20} />
                <span>101 rue de Sèvres, 75006 Paris</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col lg:flex-row lg:justify-between gap-10 max-w-6/12">
            <div>
              <h4 className="text-white mb-4 text-sm lg:text-base">Menu</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/news">Actualité</Link>
                </li>
                <li>
                  <Link href="/database">Base de données</Link>
                </li>
                <li>
                  <Link href="/actors">Acteurs</Link>
                </li>
                <li>
                  <Link href="/explore-directory">Structure</Link>
                </li>
                <li>
                  <Link href="/business-corner">Le coin des affaires</Link>
                </li>
              </ul>
            </div>

            <div className="lg:basis-7/12">
              <h4 className="text-white mb-4 text-sm lg:text-base">
                Categories
              </h4>

              <div className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-20">
                <ul className="space-y-4">
                  <li>
                    <Link href="/#publications">Publications</Link>
                  </li>
                  <li>
                    <Link href="/database">Données</Link>
                  </li>
                  <li>
                    <Link href="/news#content-media">Contenu média</Link>
                  </li>
                  <li>
                    <Link href="/actors">Cartographie</Link>
                  </li>
                </ul>
                <ul className="space-y-4">
                  <li>
                    <Link href="/">Opportunités</Link>
                  </li>
                  <li>
                    <Link href="/#service-complementaires">Requête</Link>
                  </li>
                  <li>
                    <Link href="/#business-corner-news">
                      Projections économiques
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between gap-8 items-start lg:items-center pt-10">
          <CopyrightYear />

          <ul className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            <li>
              <Link
                href="/legal/privacy-policy"
                className="text-[#94A3B8] hover:text-[#CBD5E1] transition hover:underline"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/legal/terms-of-service"
                className="text-[#94A3B8] hover:text-[#CBD5E1] transition hover:underline"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="/legal/cookie-policy"
                className="text-[#94A3B8] hover:text-[#CBD5E1] transition hover:underline"
              >
                Cookie policy
              </Link>
            </li>
          </ul>

          <div className="flex gap-4">
            <Link
              href="/"
              className="border-[0.5px] rounded-full inline-block p-2 border-border/20"
            >
              <FbIconFlat className="text-xl text-white" />
            </Link>
            <Link
              href="/"
              className="border-[0.5px] rounded-full inline-block p-2 border-border/20"
            >
              <InstagramIconFlat className="text-xl text-white" />
            </Link>
            <Link
              href="/"
              className="border-[0.5px] rounded-full inline-block p-2 border-border/20"
            >
              <LinkedinIconFlat className="text-xl text-white" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
