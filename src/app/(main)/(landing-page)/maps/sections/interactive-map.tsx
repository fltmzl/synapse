"use client";

import SelectSingleItem from "@/components/select-single-item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SelectTrigger } from "@/components/ui/select";
import { companies } from "@/data/company-map-data";
import useIsClient from "@/hooks/use-is-client";
import { ArrowRightIcon } from "@/icons/arrow-right-icon";
import { BuildingIcon } from "@/icons/building-icon";
import { PlusIcon } from "@/icons/plus-icon";
import { DivIcon, Icon, LatLngExpression } from "leaflet";
import { GlobeIcon, MaximizeIcon, MinusIcon } from "lucide-react";
import Image from "next/image";
import { parseAsFloat, parseAsString, useQueryState } from "nuqs";
import { useCallback, useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents
} from "react-leaflet";
import SearchFilterCompany from "../components/search-filter-company";

export default function InteractiveMap() {
  const isClient = useIsClient();

  if (!isClient || typeof window === "undefined") return null;

  return (
    <>
      <Card className="p-0 h-full mb-4 lg:hidden">
        <div className="p-4">
          <SearchFilterCompany />
        </div>
      </Card>

      <MapContainer
        center={[16.24, -61.55]}
        zoom={6}
        scrollWheelZoom={false}
        className="h-[700px] lg:h-full relative z-[1] rounded-md"
        zoomControl={false}
      >
        <MapMain />
      </MapContainer>
    </>
  );
}

function MapMain() {
  const [region, setRegion] = useQueryState(
    "region",
    parseAsString.withDefault("Guadeloupe")
  );
  const [latitudeQuery] = useQueryState("latitude", parseAsFloat);
  const [longitudeQuery] = useQueryState("longitude", parseAsFloat);

  console.log({
    latitudeQuery,
    longitudeQuery
  });

  const [zoomLevel, setZoomLevel] = useState(0);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    zoom() {
      setZoomLevel(map.getZoom());
    }
  });

  useEffect(() => {
    if (!latitudeQuery || !longitudeQuery) return;

    map.setView([latitudeQuery, longitudeQuery], 6);
  }, [latitudeQuery, longitudeQuery]);

  const generateMarkerIcon = useCallback(
    ({ label }: { label: string }): DivIcon => {
      const customDivIcon = new DivIcon({
        html: ReactDOMServer.renderToString(
          <MarkerLabel label={label} zoomLevel={zoomLevel} />
        ),
        className: "" // kosongkan agar Leaflet tidak menambahkan style default
      });

      return customDivIcon;
    },
    [zoomLevel]
  );

  const markers = companies.map((company) => ({
    ...company,
    position: [company.latitude, company.longitude] as LatLngExpression
  }));

  const markersIcon = markers.map((marker) =>
    generateMarkerIcon({ label: marker.name })
  );

  const regions = [
    { label: "Guadeloupe", value: "Guadeloupe" },
    { label: "Martinique", value: "Martinique" },
    { label: "Guyane", value: "Guyane" },
    { label: "Reunion", value: "Reunion" },
    { label: "Mayotte", value: "Mayotte" },
    { label: "New Caledonia", value: "New Caledonia" }
  ];

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        className="relative"
        zIndex={2}
      />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          icon={markersIcon[index]}
        >
          <Popup className="custom-popup">
            <MarkerPopup {...marker} />
          </Popup>
        </Marker>
      ))}
      <div className="absolute left-4 bottom-4 z-[1000]">
        <SelectSingleItem
          listItems={regions}
          selected={region}
          onChange={setRegion}
          align="start"
          customSelectTrigger={() => (
            <Button asChild>
              <SelectTrigger withIcon={false}>
                <GlobeIcon className="text-white" />
                Region
              </SelectTrigger>
            </Button>
          )}
        />
      </div>
      <div className="absolute right-4 bottom-0 z-[1000] flex flex-col gap-1">
        <Button
          size="icon-lg"
          className="rounded-sm"
          onClick={() => map.zoomIn()}
          variant="outline"
        >
          <PlusIcon className="size-5" />
        </Button>
        <Button
          size="icon-lg"
          className="rounded-sm"
          onClick={() => map.zoomOut()}
          variant="outline"
        >
          <MinusIcon className="size-5" />
        </Button>
        <Button
          size="icon-lg"
          className="rounded-sm mt-6"
          onClick={() => {}}
          variant="outline"
        >
          <MaximizeIcon className="size-5" />
        </Button>

        <div className="p-4 rounded-md"></div>
      </div>
    </>
  );
}

function MarkerLabel({
  label,
  zoomLevel
}: {
  label: string;
  zoomLevel: number;
}) {
  return (
    <div className="flex items-center w-60">
      <Image
        className="size-12"
        src="/assets/icon/map-pin-point.svg"
        alt="marker"
        width={50}
        height={50}
      />

      {zoomLevel >= 8 && (
        <div>
          <div className="font-sans tracking-tight leading-[100%] text-xl font-black text-primary text-outline-stroke">
            {label}
          </div>
        </div>
      )}
    </div>
  );
}

function MarkerPopup({
  description,
  link,
  location,
  name,
  image
}: {
  image?: string;
  name: string;
  description: string;
  location: string;
  link: string;
}) {
  return (
    <Card className="p-4 gap-3 max-w-[270px]">
      <div className="flex items-start gap-3 justify-between">
        <Avatar className="w-11 h-11 rounded-sm">
          <AvatarImage src={image} alt={"actor"} />
          <AvatarFallback className="rounded-sm text-primary border bg-transparent">
            <BuildingIcon />
          </AvatarFallback>
        </Avatar>

        <Button
          size="sm"
          className="gap-2 py-1.5 pl-3 pr-2 text-xs font-normal rounded-sm"
        >
          Détail <ArrowRightIcon strokeWidth={2} className="-translate-y-0.5" />
        </Button>
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-medium">{name}</h3>
        <span className="text-sm text-muted-foreground">
          {description} · {location}
        </span>
      </div>
    </Card>
  );
}
