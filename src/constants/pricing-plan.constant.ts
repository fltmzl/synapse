export type Plan =
  | "monthly-plan"
  | "annual-plan"
  | "individual-plan"
  | "company-plan";

export type PricingPlan = {
  label: string;
  value: Plan;
  description: string;
  price?: string;
  billingPeriod?: "month" | "year" | "one-time-payment";
  priceId?: string;
  link?: string;
};

const monthlyPlanPriceId = process.env
  .NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY as string;
const annualPlanPriceId = process.env
  .NEXT_PUBLIC_STRIPE_PRICE_ID_ANNUALLY as string;
const individualPlanId = process.env
  .NEXT_PUBLIC_STRIPE_PRICE_ID_INDIVIDUAL as string;

export const PRICING_PLANS: PricingPlan[] = [
  // {
  //   label: "Monthly",
  //   value: "monthly-plan",
  //   description: "Unlimited access (within fair use)",
  //   price: "$29 AUD",
  //   billingPeriod: "month",
  //   priceId: monthlyPlanPriceId,
  //   link: "https://buy.stripe.com/5kQ00l8MR3Op9FS9mw4Rq00"
  // },
  // {
  //   label: "Annual",
  //   value: "annual-plan",
  //   description: "2 months free (save $38)",
  //   price: "$199 AUD",
  //   billingPeriod: "year",
  //   priceId: annualPlanPriceId,
  //   link: "https://buy.stripe.com/00w8wR5AF1Gh5pC9mw4Rq01"
  // },
  {
    label: "Individual",
    value: "individual-plan",
    description: "One time payment + Lifetime access",
    price: "$299 AUD",
    billingPeriod: "one-time-payment",
    priceId: individualPlanId
  },
  {
    label: "For teams & companies",
    value: "company-plan",
    description:
      "The scalable way to activate employee voices and build your company’s reputation"
  }
];

export const PRICING_PLANS_LABEL = {
  [annualPlanPriceId]: "Annual Plan",
  [monthlyPlanPriceId]: "Monthly Plan",
  [individualPlanId]: "Individual Plan (Lifetime Access)",
  client_user: "Company Plan",
  superadmin: "Superadmin"
};
