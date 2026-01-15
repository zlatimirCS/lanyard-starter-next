import React, { useState } from "react";
import { printColoursOptions } from "@/utils/data/printColoursOptions";
import Image from "next/image";
import { useUIStore } from "@/store/uiStore";

function ColourPicker() {
  const [isActive, setIsActive] = useState(false);
  const settings = useUIStore((state) => state.settings);
  const setColour = useUIStore((state) => state.setColour);
  const changePrintColour = (colourHex: string) => {
    // Function to handle colour selection
    console.log(`Selected colour: ${colourHex}`);
    if (settings.pickedProduct) {
      setColour(
        settings.pickedProduct as keyof typeof settings.build,
        colourHex
      );
    }
  };
  return (
    <div className="w-[302px] p-[16px] rounded-[8px] border border-gray-300 flex flex-col gap-4">
      <p className="text-gray-900 text-[16px] font-normal leading-[140%]">
        Colour
      </p>
      <p className="text-gray-500 text-[14px] font-normal leading-[140%]">
        Our suggested best printed colours:
      </p>
      <div className="grid grid-cols-2 gap-2">
        {printColoursOptions.map((colour) => (
          <div
            key={colour.hex}
            className="flex items-center justify-center py-[12px] px-[10px] border border-gray-300 rounded-[8px] cursor-pointer"
            style={{ backgroundColor: colour.hex }}
            onClick={() => changePrintColour(colour.hex)}
          >
            <p
              className="text-[16px] font-normal leading-[100%] text-center"
              style={{ color: colour.labelColour }}
            >
              {colour.name}
            </p>
          </div>
        ))}
      </div>
      {/*additional colors*/}
      <div className="flex flex-col gap-2 mt-5">
        <div
          className="flex items-center justify-between cursor-pointer gap-2 text-gray-900 text-[16px] font-normal leading-[140%]"
          onClick={() => setIsActive((prev) => !prev)}
        >
          Custom colour (additional charge)
          <Image
            src="/assets/icons/arrow-down.svg"
            alt="chevron"
            width={16}
            height={16}
            className={`transition-transform duration-300 ${
              isActive ? "rotate-0" : "rotate-180"
            }`}
          />
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 flex flex-col gap-2 ${
            isActive ? "max-h-[200px]" : "max-h-0"
          }`}
        >
          <p className="text-gray-500 text-[14px] font-normal leading-[140%]">
            Please choose closest colour above and then provide your custom
            instructions below to receive a final proof.
          </p>
          <div className="border border-gray-300 rounded-[8px] bg-white py-[12px] px-[16px]">
            <p className="text-gray-400 text-[16px] font-normal leading-[100%]">
              For example a Pantone Reference or CMYK code
            </p>
          </div>
        </div>
      </div>
      {/*additional colors*/}
    </div>
  );
}

export default ColourPicker;
