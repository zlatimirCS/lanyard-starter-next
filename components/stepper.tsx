"use client";
import { useEffect, useState } from "react";
import { useUIStore } from "@/store/uiStore";
import Button from "./Button";
import Image from "next/image";

const steps = ["Product", "Fittings", "Colour", "Logo", "Proof"];

function Stepper() {
  const currentStep = useUIStore((state) => state.currentStep);
  const setCurrentStep = useUIStore((state) => state.setCurrentStep);
  const [animatedSteps, setAnimatedSteps] = useState<number[]>([]);

  useEffect(() => {
    // Animate steps as they become completed
    const timer = setTimeout(() => {
      setAnimatedSteps(Array.from({ length: currentStep + 1 }, (_, i) => i));
    }, 100);
    return () => clearTimeout(timer);
  }, [currentStep, setAnimatedSteps]);

  return (
    <div className="bg-background-secondary">
      <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-between gap-[20px] py-[24px]">
        <div>
          <Button
            variant="transparent"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            size="fit"
            className="py-[8px] px-[12px] flex items-center gap-2"
          >
            <Image
              src="/assets/icons/arrow-left-dark.svg"
              alt="Prev"
              width={16}
              height={16}
            />
            Previous
          </Button>
        </div>
        {/* Circles and Lines Row */}
        <div className="flex-1 min-h-[40px] max-w-[400px]">
          <div className="flex items-center px-[24px]">
            {steps.map((step, index) => {
              const isCompleted = index + 1 < currentStep;
              const isActive = index + 1 === currentStep;
              // const isPending = index + 1 > currentStep;
              const isAnimated = animatedSteps.includes(index + 1);

              return (
                <div
                  key={step}
                  className="flex items-center flex-1 last:flex-none"
                >
                  {/* Circle */}
                  <div className="flex flex-col items-center relative z-10">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-500 relative ${
                        isCompleted
                          ? "bg-blue-70 border border-blue-70"
                          : isActive
                          ? "bg-white border border-blue-70"
                          : "bg-white border border-neutral-gray-30"
                      }`}
                    >
                      {/*absolute place for text label*/}
                      <div className="absolute top-4 w-max text-center">
                        <span
                          className={`text-[14px] text-neutral-gray-60 font-normal leading-[140%]`}
                        >
                          {step}
                        </span>
                      </div>
                      {/* Checkmark for completed steps */}
                      {isCompleted && (
                        <svg
                          className={`w-[10px] h-[10px] text-white transition-all duration-300 ${
                            isAnimated
                              ? "scale-100 opacity-100"
                              : "scale-0 opacity-0"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}

                      {/* Dot for active step */}
                      {isActive && (
                        <div className="w-[4px] h-[4px] bg-blue-70 rounded-full" />
                      )}

                      {/* Empty for pending steps */}
                      {/* {isPending && (
                        <div className="w-[4px] h-[4px] bg-gray-400 rounded-full" />
                      )} */}
                    </div>
                  </div>

                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 transition-all duration-500 ${
                        isCompleted ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* Circles and Lines Row */}
        <div>
          <Button
            variant="primary"
            onClick={() => setCurrentStep(Math.min(6, currentStep + 1))}
            size="fit"
            className="py-[8px] px-[12px] flex items-center gap-2"
          >
            Next
            <Image
              src="/assets/icons/arrow-right-light.svg"
              alt="Next"
              width={16}
              height={16}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Stepper;
