"use client";

import { FC, useState } from "react";

interface Props {}

const SelectRating: FC<Props> = ({}) => {
  const [selectedRating, setSelectedRating] = useState<number[]>([]);

  const onSelectRating = (isChecked: boolean, value: number) => {
    if (isChecked) {
      setSelectedRating([...selectedRating, value]);
    } else {
      setSelectedRating(selectedRating.filter((n) => n !== value));
    }
  };

  return (
    <div className="mt-5">
      <h2 className="font-bold">Select Rating</h2>

      <div>
        {Array(5)
          .fill(0)
          .map((item, i) => (
            <div
              key={i}
              className="text-yellow-500 flex items-center justify-between w-full"
            >
              <div className="flex gap-1 items-center">
                {Array(i + 1)
                  .fill(0)
                  .map((item2, j) => (
                    <span key={`${i}-${j}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 fill-amber-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    </span>
                  ))}
              </div>
              <input
                type="checkbox"
                onChange={(e) => onSelectRating(e.target.checked, i + 1)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SelectRating;
