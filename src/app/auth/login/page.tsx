import BrandLogo from "@/components/brand-logo";
import { Card, CardTitle } from "@/components/ui/card";
import { CircleCheckIcon } from "@/icons/circle-check-icon";
import LoginForm from "./form/login-form";

export default function LoginPage() {
  return (
    <div className="max-w-6xl mx-auto my-12 px-6 lg:min-h-dvh grid place-content-center">
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="flex flex-col items-start gap-6 lg:gap-12">
          <div>
            <BrandLogo />
          </div>

          <div>
            <h1 className="text-xl lg:text-3xl font-medium">
              Bienvenu sur Synapse
            </h1>
            <p className="mt-4">
              Synapse makes complex information simple. With AI search,
              interactive maps, and detailed company or personality profiles,
              you can discover insights faster and easier than ever.
            </p>
            <ul className="mt-4 lg:mt-6 space-y-3">
              <li className="flex gap-2 lg:gap-4 items-center">
                <CircleCheckIcon className="min-w-5 h-5 text-primary" />
                <span>Explore data with AI assistance</span>
              </li>
              <li className="flex gap-2 lg:gap-4 items-center">
                <CircleCheckIcon className="min-w-5 h-5 text-primary" />
                <span>
                  Access reports, media, and legal insights in one place
                </span>
              </li>
              <li className="flex gap-2 lg:gap-4 items-center">
                <CircleCheckIcon className="min-w-5 h-5 text-primary" />
                <span>Connect networks of people and organizations</span>
              </li>
              <li className="flex gap-2 lg:gap-4 items-center">
                <CircleCheckIcon className="min-w-5 h-5 text-primary" />
                <span>Downloadable reports & visual dashboards</span>
              </li>
            </ul>
            <p className="mt-6">Let&apos;s begin</p>
          </div>
        </div>

        <main>
          <Card className="py-8 lg:py-12 px-6 lg:px-10">
            <CardTitle className="text-xl lg:text-2xl text-center tracking-tight font-medium">
              Connectez vous à votre compte
            </CardTitle>
            <div>
              <LoginForm />
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
