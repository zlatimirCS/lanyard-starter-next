import { fittingsOptions } from "@/utils/data/fittingsOptions";
import CustomCheckbox from "../customCheckbox";
import Image from "next/image";
import { useUIStore } from "@/store/uiStore";

function Fittings() {
  const settings = useUIStore((state) => state.settings);
  const setFitting = useUIStore((state) => state.setFitting);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`Checkbox is now: ${event.target.value}`);
    const selectedFittingId = event.target.value;
    const productId = settings.pickedProduct;

    // Toggle: if clicking the same fitting, uncheck it
    const currentFitting =
      settings.build[productId as keyof typeof settings.build].fitting;
    const newFitting =
      currentFitting === selectedFittingId ? "" : selectedFittingId;

    console.log(`Selected fitting ${newFitting} for product ${productId}`);
    setFitting(productId as keyof typeof settings.build, newFitting);
  };
  console.log("Settings in Fittings component:", settings);
  return (
    <div className="w-[302px] p-[16px] rounded-[8px] border border-gray-300 flex flex-col gap-4">
      <p className="text-gray-900 text-[16px] font-normal leading-[140%]">
        Lanyard fittings
      </p>
      <p className="text-gray-500 text-[14px] font-normal leading-[140%]">
        Choose clip:
      </p>
      <div className="flex flex-col gap-4">
        {fittingsOptions[
          settings?.pickedProduct as keyof typeof fittingsOptions
        ].map((fitting) => (
          <div key={fitting.id} className="flex items-start gap-2">
            <CustomCheckbox
              onChange={handleChange}
              value={fitting.id}
              checked={
                settings.build[
                  settings.pickedProduct as keyof typeof settings.build
                ].fitting === fitting.id
              }
            />
            <div className="flex-1 flex flex-col gap-[2px] mt-[-3px]">
              <p className="text-gray-900 text-[16px] font-normal leading-[140%]">
                {fitting.name}
              </p>
              <p className="text-gray-500 text-[16px] font-normal leading-[140%]">
                {fitting.description}
              </p>
            </div>
            <div className="relative w-[50px] h-[50px] bg-gray-300">
              {fitting.imageUrl && (
                <Image
                  src={fitting.imageUrl}
                  alt={fitting.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Fittings;
