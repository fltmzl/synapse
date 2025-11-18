"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BuildingIcon } from "@/icons/building-icon";
import { MapPinIcon } from "@/icons/map-pin-icon";
import { ChevronRightIcon } from "lucide-react";
import { parseAsFloat, useQueryState } from "nuqs";

type Props = {
  image?: string;
  name: string;
  description: string;
  location: string;
  link: string;
  latitude: number;
  longitude: number;
};

export default function CompanyItem({
  description,
  link,
  location,
  name,
  image,
  latitude,
  longitude
}: Props) {
  const [latitudeQuery, setLatitudeQuery] = useQueryState(
    "latitude",
    parseAsFloat
  );
  const [longitudeQuery, setLongitudeQuery] = useQueryState(
    "longitude",
    parseAsFloat
  );

  return (
    <div className="p-4 flex gap-3 items-start justify-between">
      <div>
        <Avatar className="w-11 h-11 rounded-sm">
          <AvatarImage src={image} alt={"actor"} />
          <AvatarFallback className="rounded-sm text-primary border bg-transparent">
            <BuildingIcon />
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="space-y-1 flex-1">
        <h3 className="text-base font-medium">{name}</h3>
        <div className="text-muted-foreground text-sm">{description}</div>
        <div className="flex gap-1">
          <MapPinIcon className="text-primary" />
          <div className="text-muted-foreground text-sm">{location}</div>
        </div>
      </div>
      <div className="self-center">
        <button
          onClick={() => {
            setLatitudeQuery(latitude);
            setLongitudeQuery(longitude);
          }}
        >
          <ChevronRightIcon size={16} className="text-primary" />
        </button>
      </div>
    </div>
  );
}
