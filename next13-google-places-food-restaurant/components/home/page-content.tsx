"use client";

import { FC, useContext, useEffect, useState } from "react";
import CategoriesList from "./categories-list";
import RangeSelect from "./range-select";
import SelectRating from "./select-rating";
import GoogleMapView from "./google-map-view";
import { getGooglePlace } from "@/lib/map";
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE, categories } from "@/lib/data";
import { UserLocationContext } from "../providers/user-location-provider";
import { Business } from "@/types";
import BusinessList from "./business-list";

interface Props {}

const PageContent: FC<Props> = ({}) => {
  const [category, setCategory] = useState<string>(categories[0].name);
  const [radius, setRadius] = useState<number>(1000);
  const [businessList, setBusinessList] = useState<Business[]>([]);
  const { location, setLocation } = useContext(UserLocationContext);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const results = await getGooglePlace({
        category,
        radius,
        lat: location?.lat ?? DEFAULT_LATITUDE,
        lng: location?.lng ?? DEFAULT_LONGITUDE,
      });
      setLoading(false);
      console.log("results", results);
      console.log("results.data.product.results", results.data.product.results);
      setBusinessList(results.data.product.results);
    };

    fetchResults();
  }, [category, radius, location?.lat, location?.lng]);

  return (
    <div className="grid md:grid-cols-4 h-screen">
      <div className="p-3">
        <CategoriesList onCategoryChange={setCategory} />
        <RangeSelect onRadiusChange={setRadius} />
        <SelectRating />
      </div>
      <div className="md:col-span-3">
        <div className="relative">
          <GoogleMapView businessList={businessList}/>
          <div className="relative md:absolute w-[90%] md:w-[71%]ml-6 md:ml-10 bottom-36 md:bottom-3">
            <BusinessList businessList={businessList} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageContent;
