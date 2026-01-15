"use client";

import { products } from "@/utils/data/products";
import Image from "next/image";
import { useState } from "react";
import Button from "../Button";
import Select from "react-select";

function ChooseProduct() {
  // const [selectedSizes, setSelectedSizes] = useState<{
  //   [key: string]: string | null;
  // }>({});
  // console.log("selectedSizes", selectedSizes);

  const handleChange = (
    selectedOption: { value: string; label: string } | null,
    productId: string
  ) => {
    console.log("Selected option:", selectedOption);
    console.log("Product ID:", productId);
  };

  return (
    <div className="max-w-[954px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[27px]">
      {products.map((product, index) => (
        <div
          className={`box min-h-[522px] ${
            index === 2
              ? "md:col-span-2 md:justify-self-center md:w-1/2 lg:col-span-1 lg:w-full"
              : ""
          } p-4 bg-white border border-gray-300 rounded-[8px] flex flex-col gap-4 min-w-[240px]`}
          key={product.id}
        >
          <div className="w-full h-[250px] relative">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-4 flex-1 justify-between">
            <div className="flex flex-col gap-2">
              <h2 className="text-gray-900 text-[24px] font-semibold leading-[120%] tracking-[-0.48px]">
                {product.name}
              </h2>
              <p className="text-gray-900 text-[16px] font-semibold leading-[140%] tracking-[-0.32px]">
                {product.description}
              </p>
            </div>
            {product?.sizes && (
              <div className="flex flex-col gap-2">
                <p className="text-gray-500 text-[14px] font-normal leading-[140%]">
                  Choose ribbon size:
                </p>
                <Select
                  options={product?.sizes || []}
                  instanceId="choose-product-select"
                  onChange={(option) => handleChange(option, product.id)}
                />
              </div>
            )}
          </div>
          <Button
            variant="primary"
            size="full"
            className="p-[12px]"
            onClick={() => {}}
          >
            <span>Create</span>
          </Button>
        </div>
      ))}
    </div>
  );
}

export default ChooseProduct;
