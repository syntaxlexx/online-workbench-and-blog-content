"use client";

import { FC, useState } from "react";

interface Props {
  onRadiusChange: (radius: number) => void;
}

const RangeSelect: FC<Props> = ({ onRadiusChange }) => {
  const [radius, setRadius] = useState<number>(10);

  return (
    <div className="mt-5">
      <h2 className="font-bold px-2">Select Radius (in Meters)</h2>
      <input
        type="range"
        className="h-2 w-full bg-gray-200 rounded-lg appearance-none cursor-pointer"
        min={0}
        max={100}
        step={10}
        defaultValue={radius}
        onChange={(e) => {
          setRadius(Number(e.target.value));
          onRadiusChange(Number(e.target.value));
        }}
      />
      <label className="text-gray-500 text-[15px]">{radius}m</label>
    </div>
  );
};

export default RangeSelect;
