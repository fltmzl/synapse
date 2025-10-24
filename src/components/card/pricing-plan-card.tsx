import { CircleCheckIcon } from "@/icons/circle-check-icon";
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

type Props = {
  title: string;
  description: string;
  features: string[];
  price: string;
  subscriptionPeriod: "month" | "year" | "one-time-payment";
  plan: "basic" | "professional" | "enterprise";
};

export default function PricingPlanCard({
  description,
  features,
  price,
  subscriptionPeriod,
  title,
  plan
}: Props) {
  const getPricingButton = () => {
    switch (plan) {
      case "basic":
        return (
          <Button size="lg" variant="outline" className="w-full">
            Get basic
          </Button>
        );
      case "professional":
        return (
          <Button size="lg" variant="default" className="w-full">
            Get professional
          </Button>
        );
      case "enterprise":
        return (
          <Button
            size="lg"
            variant="default"
            className="w-full bg-background text-foreground invert-100"
          >
            Get enterprise
          </Button>
        );
    }
  };

  return (
    <Card className="p-6 w-full">
      <CardHeader className="p-0 gap-2">
        <CardTitle className="lg:text-xl">{title}</CardTitle>
        <CardDescription className="mt-0">{description}</CardDescription>
      </CardHeader>

      <div className="flex items-end">
        <h3 className="text-3xl text-primary font-medium">
          {price}
          <span className="text-base tracking-normal font-normal text-muted-foreground">
            {" "}
            / {subscriptionPeriod}
          </span>
        </h3>
      </div>

      <div>{getPricingButton()}</div>

      <div>
        <h4 className="text-lg font-medium mb-4">Feature</h4>

        <FeatureList items={features} />
      </div>
    </Card>
  );
}

type FeatureListProps = {
  items: string[];
};

function FeatureList({ items }: FeatureListProps) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-2 items-start text-sm">
          <CircleCheckIcon className="min-w-4 h-4 text-primary mt-0.5" />
          <span className="">{item}</span>
        </li>
      ))}
    </ul>
  );
}
