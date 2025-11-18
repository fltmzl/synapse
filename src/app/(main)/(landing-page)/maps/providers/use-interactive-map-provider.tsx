"use client";

import { LatLngExpression, type Map } from "leaflet";
import React, { createContext, useContext, useState, useCallback } from "react";
import { useMapEvents } from "react-leaflet";

type InteractiveMapContextType = {
  zoomLevel: number;
  map: Map | null;
  goToMarker: (latLng: LatLngExpression) => void;
};

const InteractiveMapContext = createContext<InteractiveMapContextType>({
  zoomLevel: 0,
  map: null,
  goToMarker: () => {}
});

export const useInteractiveMap = () => useContext(InteractiveMapContext);

export const InteractiveMapProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [zoomLevel, setZoomLevel] = useState(0);
  const [mapInstance, setMapInstance] = useState<Map | null>(null);

  // Register map events only once
  useMapEvents({
    click(mapEvent) {
      mapEvent.target.locate();
    },
    zoom(mapEvent) {
      setZoomLevel(mapEvent.target.getZoom());
    },
    load(mapEvent) {
      setMapInstance(mapEvent.target);
      setZoomLevel(mapEvent.target.getZoom());
    }
  });

  const goToMarker = useCallback(
    (latLng: LatLngExpression) => {
      if (!mapInstance) return;
      mapInstance.setView(latLng, mapInstance.getZoom());
    },
    [mapInstance]
  );

  return (
    <InteractiveMapContext.Provider
      value={{
        zoomLevel,
        map: mapInstance,
        goToMarker
      }}
    >
      {children}
    </InteractiveMapContext.Provider>
  );
};
