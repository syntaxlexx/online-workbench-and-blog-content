"use client";

import { Business } from "@/types";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import { FC, useContext, useRef } from "react";
import SkeletonLoading from "../skeleton-loading";
import BusinessItem from "./business-item";
import { SelectedBusinessContext } from "../providers/selected-business-provider";

interface Props {
  businessList: Business[];
  loading?: boolean;
}

const BusinessList: FC<Props> = ({ businessList, loading = false }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { selectedBusiness, setSelectedBusiness } = useContext(
    SelectedBusinessContext
  );

  const slideLeft = (element: HTMLDivElement | null) => {
    if (!element) return;
    element.scrollLeft -= 500;
  };

  const slideRight = (element: HTMLDivElement | null) => {
    if (!element) return;
    element.scrollLeft += 500;
  };

  return (
    <div>
      <div
        className="absolute left-0 top-[35%] bg-gray-300 cursor-pointer p-1 rounded-full text-white opacity-75 hover:opacity-100 transition"
        onClick={() => slideLeft(elementRef.current)}
      >
        <ChevronLeftCircle className="w-8 h-8 " />
      </div>

      <div
        className="flex overflow-x-auto gap-4 scrollbar-hide scroll-smooth"
        ref={elementRef}
      >
        {loading &&
          Array(5)
            .fill(0)
            .map((item, k) => (
              <div key={k} className="flex-shrink-0 min-h-[177px]">
                <SkeletonLoading />
              </div>
            ))}

        {!loading &&
          businessList.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 min-h-[177px] cursor-pointer"
              onClick={() => {
                if (setSelectedBusiness) setSelectedBusiness(item);
              }}
            >
              <BusinessItem business={item}></BusinessItem>
            </div>
          ))}
      </div>

      <div
        className="absolute right-0 top-[35%] bg-gray-300 cursor-pointer p-1 rounded-full text-white opacity-75 hover:opacity-100 transition"
        onClick={() => slideRight(elementRef.current)}
      >
        <ChevronRightCircle className="w-8 h-8 " />
      </div>
    </div>
  );
};

export default BusinessList;
