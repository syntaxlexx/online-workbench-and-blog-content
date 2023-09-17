"use client";

import { Business } from "@/types";
import { Star } from "lucide-react";
import Image from "next/image";
import { FC, useContext, useEffect, useState } from "react";
import queryString from "query-string";
import { UserLocationContext } from "../providers/user-location-provider";
import { calculateDistance } from "@/lib/map";
import { formatNumber } from "@acelords/js-utils";

interface Props {
  business: Business;
  showDirection?: boolean;
}

const BusinessItem: FC<Props> = ({ business, showDirection = false }) => {
  const photoRef = business.photos ? business?.photos[0]?.photo_reference : "";
  const { location } = useContext(UserLocationContext);
  const [distance, setDistance] = useState<number | null>(null);

  const imageUrl = queryString.stringifyUrl({
    url: `https://maps.googleapis.com/maps/api/place/photo`,
    query: {
      maxwidth: 400,
      photoreference: photoRef,
      key: String(process.env.NEXT_PUBLIC_GOOGLE_API_KEY),
    },
  });

  // https://www.google.com/maps/dir/?api=1&destination=-1.2577273%2C36.8115696&origin=-1.2550144%2C36.814848&travelmode=driving
  const onDirectionClick = () => {
    const url = queryString.stringifyUrl({
      url: "https://www.google.com/maps/dir/",
      query: {
        api: 1,
        origin: `${location?.lat},${location?.lng}`,
        destination: `${business.geometry?.location?.lat},${business.geometry?.location?.lng}`,
        travelmode: "driving",
      },
    });

    window.open(url);
  };

  useEffect(() => {
    setDistance(
      calculateDistance({
        lat1: business.geometry?.location?.lat,
        lng1: business.geometry?.location?.lng,
        lat2: location?.lat,
        lng2: location?.lng,
      })
    );
  }, [location]);

  return (
    <div className="w-[180px] h-full p-2 rounded-lg bg-white">
      <Image
        src={imageUrl}
        alt={business.name ?? "business"}
        width={180}
        height={80}
        className="rounded-lg object-cover h-[90px]"
      />
      <h2 className="text-[13px] font-bold mt-1">{business.name}</h2>
      <h3 className="text-[10px] text-gray-400 line-clamp-2">
        {business.formatted_address}
      </h3>
      <div className="flex gap-1 items-center">
        <Star className="fill-amber-500 text-amber-400 w-4 h-4" />
        <h4 className="text-[10px] font-bold">{business.rating}</h4>
      </div>

      {showDirection && (
        <div className="border-t-[1px] p-1 mt-1">
          <h4 className="text-[10px] text-[#0075ff] flex justify-between items-center">
            Dist: {formatNumber(distance, true)} km
            <span
              className="border-[1px] p-1 rounded-full border-blue-500 hover:bg-blue-500 hover:text-white transition"
              onClick={onDirectionClick}
            >
              Get Directions
            </span>
          </h4>
        </div>
      )}
    </div>
  );
};

export default BusinessItem;
