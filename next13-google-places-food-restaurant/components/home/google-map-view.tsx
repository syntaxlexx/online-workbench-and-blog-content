"use client";

import { centerCoordinate } from "@/lib/data";
import { Business } from "@/types";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { FC, useContext, useEffect, useState } from "react";
import { UserLocationContext } from "../providers/user-location-provider";
import Markers from "./markers";
import { SelectedBusinessContext } from "../providers/selected-business-provider";

const mapId = "2b68750b6f0c9457";

interface Props {
  businessList: Business[];
}

const GoogleMapView: FC<Props> = ({ businessList }) => {
  const { location, setLocation } = useContext(UserLocationContext);
  const { selectedBusiness, setSelectedBusiness } = useContext(
    SelectedBusinessContext
  );

  // @ts-ignore
  const defaultCenter = (location ?? centerCoordinate) as google.maps.LatLng;

  const [centerLocation, setCenterLocation] =
    useState<google.maps.LatLng>(defaultCenter);

  useEffect(() => {
    if (selectedBusiness?.geometry?.location) {
      setCenterLocation(selectedBusiness?.geometry?.location);
    } else {
      setCenterLocation(defaultCenter);
    }
  }, [selectedBusiness?.geometry?.location, defaultCenter]);

  const mapContainerStyle = {
    width: "100%",
    height: "70vh",
  };

  return (
    <div>
      <LoadScript
        googleMapsApiKey={String(process.env.NEXT_PUBLIC_GOOGLE_API_KEY)}
        mapIds={[mapId]}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={centerLocation}
          zoom={10}
          options={{
            mapId: mapId,
          }}
        >
          <MarkerF
            position={defaultCenter}
            icon={{
              url: "/map-icon.png",
              scaledSize: {
                width: 35,
                height: 50,
              },
            }}
          />

          {businessList.map(
            (item, i) => i <= 7 && <Markers key={i} business={item} />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapView;
