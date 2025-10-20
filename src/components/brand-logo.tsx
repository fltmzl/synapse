import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  type?: "default" | "white";
};

export default function BrandLogo({ type = "default" }: Props) {
  return (
    <Link href="/" className="flex justify-center text-3xl font-bold">
      {/* <Image
        src={
          type === "default"
            ? "/assets/logo/brand.svg"
            : "/assets/logo/brand-white.svg"
        }
        alt="brandiie"
        width={100}
        height={24}
        priority
      /> */}
      {type === "default" ? (
        <span className="text-foreground">Synapse</span>
      ) : (
        <span className="text-white">Synapse</span>
      )}
    </Link>
  );
}
