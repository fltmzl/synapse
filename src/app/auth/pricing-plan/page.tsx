"use client";

import BrandLogo from "@/components/brand-logo";
import PricingPlanCard from "@/components/card/pricing-plan-card";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="max-w-6xl mx-auto my-12 px-6 xl:px-0 lg:min-h-dvh grid place-content-center relative">
      <div className="flex flex-col items-start gap-6 lg:gap-12 mb-10 lg:mb-8">
        <Button
          size="icon"
          variant="outline"
          className="size-10 rounded-sm absolute top-0 left-5 xl:-left-21"
        >
          <XIcon />
        </Button>

        <div className="mt-20 lg:mt-0">
          <BrandLogo />
        </div>

        <div className="lg:max-w-1/2">
          <h1 className="text-xl lg:text-3xl font-medium">
            Choisissez votre offre
          </h1>
          <p className="mt-4">
            To continue using Synapse, please select a subscription plan that
            best fits your needs and unlock full access.
          </p>
        </div>
      </div>

      <main className="grid lg:grid-cols-3 gap-4">
        <PricingPlanCard
          plan="basic"
          title="Basic Plan"
          description="For individuals getting started with Synapse"
          price="$29"
          subscriptionPeriod="month"
          features={[
            "Personality profiles (core information)",
            "Search and view directory (10 profiles/month)",
            "Access to news feed (selected articles)",
            "Email support"
          ]}
        />
        <PricingPlanCard
          plan="professional"
          title="Professional plan"
          description="For professionals & organizations gaining insights"
          price="$99"
          subscriptionPeriod="month"
          features={[
            "Personality & company profiles (detailed)",
            "Directory access (up to 250 profiles/month)",
            "Advanced search & filters (by territory, category, people)",
            "Access to reports & legal news",
            "Downloadable dashboards (up to 10 per month)"
          ]}
        />
        <PricingPlanCard
          plan="enterprise"
          title="Enterprise"
          description="Enterprises unlock the full Synapse experience."
          price="$299"
          subscriptionPeriod="month"
          features={[
            "Unlimited access to all personality & company data",
            "Full directory & network connections",
            "Advanced analytics & visual dashboards (unlimited)",
            "Legal news, media insights & economic reports (all included)",
            "Customizable export (CSV, PDF, API access)"
          ]}
        />
      </main>
    </div>
  );
}
