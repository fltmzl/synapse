"use client";

import { GovernmentLineIcon } from "@/icons/goverment-line-icon";
import Image from "next/image";
import { useState } from "react";

type Props = {
  image: string;
  name: string;
};

export default function PoliticalInfo({ image, name }: Props) {
  const [isError, setIsError] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <div className="border rounded-sm w-10 aspect-square grid place-content-center text-primary">
        {image && !isError ? (
          <Image
            src={image}
            alt={name}
            width={24}
            height={24}
            onError={() => setIsError(true)}
            className="object-contain"
          />
        ) : (
          <GovernmentLineIcon className="size-6" />
        )}
      </div>
      <div>
        <span>{name}</span>
      </div>
    </div>
  );
}
