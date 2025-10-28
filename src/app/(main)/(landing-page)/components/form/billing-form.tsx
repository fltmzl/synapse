import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { EditIcon } from "@/icons/edit-icon";
import Image from "next/image";
import React from "react";

export default function BillingForm() {
  return (
    <div className="space-y-6">
      {/* Subscription */}
      <div>
        <h3 className="font-medium mb-2">Offre</h3>
        <Card className="p-4 rounded-sm">
          <CardContent className="px-0">
            <div className="flex justify-between items-center">
              <CardTitle className="font-medium">Monthly Plan</CardTitle>
              <button className="text-primary text-sm">Upgrade plan</button>
            </div>
            <div className="flex flex-col lg:flex-row gap-1 lg:gap-2 mt-2 [&>p]:text-sm">
              <p>
                <span className="font-medium text-foreground/80">$29</span>
                /month
              </p>
              <p className="hidden lg:block">•</p>
              <p>Next payment: Dec 20th, 2025</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="font-medium mb-2">Information</h3>
        <Card className="p-4 rounded-sm">
          <CardContent className="px-0">
            <div className="flex justify-between items-center">
              <CardTitle className="font-medium">Johnathan M. Carter</CardTitle>
              <button className="text-xl text-muted-foreground">
                <EditIcon />
              </button>
            </div>
            <div className="flex flex-col lg:flex-row gap-1 lg:gap-2 mt-2 [&>p]:text-sm">
              <p>
                1234 Sunset Boulevard, Apt. 12B, Los Angeles, California, 90053{" "}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="font-medium mb-2">Moyen de paiement</h3>
        <Card className="p-4 rounded-sm">
          <CardContent className="px-0">
            <div className="flex justify-between items-center">
              <CardTitle className="font-medium">Johnathan M. Carter</CardTitle>
              <button className="text-xl text-muted-foreground">
                <EditIcon />
              </button>
            </div>
            <div className="flex flex-col lg:flex-row gap-1 lg:gap-2 mt-2 [&>p]:text-sm">
              <p>
                1234 Sunset Boulevard, Apt. 12B, Los Angeles, California, 90053{" "}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="font-medium mb-2">Moyen de paiement</h3>
        <Card className="p-4 rounded-sm">
          <CardContent className="px-0 flex justify-between items-center">
            <div className="flex gap-2 items-center [&>p]:text-sm">
              <Image
                src="/assets/icon/visa-payment-icon.svg"
                width={40}
                height={20}
                alt="payment-icon"
              />
              <p>Visa • • • • 1234</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-1 lg:gap-2 mt-2 [&>p]:text-xs">
              <p className="text-foreground">Expires 08/2027</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
