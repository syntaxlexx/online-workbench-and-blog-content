"use client";

import { centerCoordinate } from "@/lib/data";
import { Business } from "@/types";
import { MarkerF, OverlayView } from "@react-google-maps/api";
import { FC, useContext } from "react";
import BusinessItem from "./business-item";
import { SelectedBusinessContext } from "../providers/selected-business-provider";

interface Props {
  business: Business;
}

const Markers: FC<Props> = ({ business }) => {
  const { selectedBusiness, setSelectedBusiness } = useContext(
    SelectedBusinessContext
  );

  return (
    <MarkerF
      position={business.geometry?.location || centerCoordinate}
      icon={{
        url: "/map-circle.png",
        scaledSize: {
          width: 10,
          height: 10,
        },
      }}
      onClick={() => {
        if (setSelectedBusiness) setSelectedBusiness(business);
      }}
    >
      {selectedBusiness?.place_id == business.place_id && (
        <OverlayView
          position={business.geometry?.location || centerCoordinate}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div className="ml-[-90px] mt-[-170px]">
            <BusinessItem business={business} showDirection={true} />
          </div>
        </OverlayView>
      )}
    </MarkerF>
  );
};

export default Markers;
