import { useUIStore } from "@/store/uiStore";
import Image from "next/image";

function RibbonCanvas() {
  const settings = useUIStore((state) => state.settings);
  const pickedProduct = settings.pickedProduct;
  const ribbonColour =
    pickedProduct && pickedProduct in settings.build
      ? (settings.build[pickedProduct as keyof typeof settings.build]
          .colour as string)
      : "#FFFFFF";
  return (
    <div>
      <p className="text-gray-900 text-[14px] font-normal leading-[140%] mb-[5px]">
        20mm Ribbon
      </p>
      <div className="w-fit flex gap-5 justify-between">
        <div
          className="h-[500px] w-[90px] relative"
          style={{ backgroundColor: ribbonColour }}
        >
          {/* <Image
            src="/assets/icons/ribbon-placeholder.svg"
            alt="ribbon"
            fill
            className="object-cover"
          /> */}
        </div>
        <div className="h-[500px] w-[50px] relative">
          <Image
            src="/assets/icons/measure.svg"
            alt="Measurement"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default RibbonCanvas;
