"use client";

import { FC, useState } from "react";
import { categories as categoryList } from "@/lib/data";
import { Category } from "@/types";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  onCategoryChange: (category: string) => void;
}

const CategoriesList: FC<Props> = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState<Category[]>(categoryList);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  return (
    <div>
      <h2 className="font-bold">Select Food Type</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {categoryList.map((item) => (
          <div
            className={cn(
              "flex flex-col justify-center items-center bg-gray-100 p-2 m-2 rounded-lg grayscale hover:grayscale-0 cursor-pointer",
              {
                "grayscale-0": selectedCategory === item,
              }
            )}
            key={item.name}
            onClick={() => {
              setSelectedCategory(item);
              onCategoryChange(item.name);
            }}
          >
            <Image src={item.icon} width={40} height={40} alt="icon" />
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
