import { app } from "@/firebase/config";
import {
  getCurrentUserPayments,
  getCurrentUserSubscriptions,
  getStripePayments
} from "@invertase/firestore-stripe-payments";
import { useCallback } from "react";
import useRole from "./use-role";
import { PRICING_PLANS_LABEL } from "@/constants/pricing-plan.constant";

export default function useSubscribe() {
  const { isClientUser, isSuperadmin, isRegularUser } = useRole();
  const payments = getStripePayments(app, {
    productsCollection: "products",
    customersCollection: "customers"
  });

  const getIsUserSubscribed = useCallback(async () => {
    if (isClientUser || isSuperadmin) return true;

    const subscriptions = await getCurrentUserPayments(payments, {
      status: "succeeded"
    });

    return subscriptions.length > 0;
  }, [payments]);

  const getSubsribePlan = useCallback(async () => {
    if (isClientUser) return PRICING_PLANS_LABEL["client_user"];
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
