export type Plan = "individual-plan";

export type PricingPlan = {
  label: string;
  value: Plan;
  description: string;
  price?: string;
  billingPeriod?: "month" | "year" | "one-time-payment";
  priceId?: string;
  link?: string;
};

const individualPlanId = process.env
  .NEXT_PUBLIC_STRIPE_PRICE_ID_INDIVIDUAL as string;

export const PRICING_PLANS: PricingPlan[] = [
  {
    label: "Individual",
    value: "individual-plan",
    description: "One time payment + Lifetime access",
    price: "$299 AUD",
    billingPeriod: "one-time-payment",
    priceId: individualPlanId
  }
];

export const PRICING_PLANS_LABEL = {
  [individualPlanId]: "Individual Plan (Lifetime Access)",
  superadmin: "Superadmin"
};
