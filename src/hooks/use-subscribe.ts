import { PRICING_PLANS_LABEL } from "@/constants/pricing-plan.constant";
import { app } from "@/firebase/config";
import {
  getCurrentUserPayments,
  getStripePayments
} from "@invertase/firestore-stripe-payments";
import { useCallback } from "react";
import useRole from "./use-role";

export default function useSubscribe() {
  const { isSuperadmin, isRegularUser } = useRole();
  const payments = getStripePayments(app, {
    productsCollection: "products",
    customersCollection: "customers"
  });

  const getIsUserSubscribed = useCallback(async () => {
    if (isSuperadmin) return true;

    const subscriptions = await getCurrentUserPayments(payments, {
      status: "succeeded"
    });

    return subscriptions.length > 0;
  }, [payments]);

  const getSubsribePlan = useCallback(async () => {
    if (isSuperadmin) return PRICING_PLANS_LABEL["superadmin"];

    const subscriptions = await getCurrentUserPayments(payments, {
      status: "succeeded" // Optional: filter by status
    });

    const priceId = subscriptions[0].prices[0].price;

    return PRICING_PLANS_LABEL[priceId];
  }, [payments]);

  return {
    payments,
    getIsUserSubscribed,
    getSubsribePlan
  };
}
