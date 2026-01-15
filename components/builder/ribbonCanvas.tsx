import Image from "next/image";

function RibbonCanvas() {
  return (
    <div>
      <p className="text-gray-900 text-[14px] font-normal leading-[140%] mb-[5px]">
        20mm Ribbon
      </p>
      <div className="w-fit flex gap-5 justify-between">
        <div className="h-[500px] w-[90px] relative">
          <Image
            src="/assets/icons/ribbon-placeholder.svg"
            alt="ribbon"
            fill
            className="object-cover"
          />
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
