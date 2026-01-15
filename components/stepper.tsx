"use client";

import { useMemo } from "react";
import { useUIStore } from "@/store/uiStore";
import Button from "./Button";
import Image from "next/image";

const Stepper = () => {
  const steps = useMemo(
    () => ["Product", "Fittings", "Colour", "Logo", "Proof"],
    []
  );

  const settings = useUIStore((state) => state.settings);
  const activeStep = settings.activeStep;
  const setActiveStep = useUIStore((state) => state.setActiveStep);

  // const isFirstStep = currentStep === 0;
  // const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="bg-background-secondary">
      <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-between gap-5 py-6">
        {/* Previous */}
        <Button
          variant="transparent"
          size="fit"
          // disabled={isFirstStep}
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          className="py-2 px-3 flex items-center gap-2"
        >
          <Image
            src="/assets/icons/arrow-left-dark.svg"
            alt="Previous"
            width={16}
            height={16}
          />
          Previous
        </Button>

        {/* Stepper */}
        <div className="flex-1 max-w-[420px]">
          <div className="flex items-center px-6">
            {steps.map((step, index) => {
              const isCompleted = index < activeStep;
              const isActive = index === activeStep;

              return (
                <div
                  key={step}
                  className="flex items-center flex-1 last:flex-none"
                >
                  {/* Circle */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div
                      className={`
                        w-5 h-5 rounded-full flex items-center justify-center
                        transition-all duration-700 ease-out
                        ${
                          isCompleted
                            ? "bg-blue-70 border border-blue-70 scale-110"
                            : isActive
                            ? "bg-white border border-blue-70"
                            : "bg-white border border-neutral-gray-30"
                        }
                      `}
                    >
                      {/* Completed check */}
                      {isCompleted && (
                        <svg
                          className="w-[10px] h-[10px] text-white transition-transform duration-300 scale-100"
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

                      {/* Active pulse */}
                      {isActive && (
                        <div className="relative">
                          <div className="w-[4px] h-[4px] bg-blue-70 rounded-full z-10" />
                          <div className="absolute inset-0 rounded-full bg-blue-70 opacity-40 animate-ping" />
                        </div>
                      )}
                    </div>

                    {/* Label */}
                    <span
                      className={`
                        absolute top-6 text-[14px] whitespace-nowrap
                        transition-all duration-300
                        ${
                          isActive
                            ? "text-blue-70 font-medium opacity-100"
                            : "text-neutral-gray-60 opacity-70"
                        }
                      `}
                    >
                      {step}
                    </span>
                  </div>

                  {/* Line */}
                  {index < steps.length - 1 && (
                    <div className="relative h-0.5 flex-1 bg-gray-300 overflow-hidden">
                      <div
                        className={`
                          absolute inset-0 bg-blue-600
                          transition-transform duration-500 origin-left
                          ${isCompleted ? "scale-x-100" : "scale-x-0"}
                        `}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Next */}
        <Button
          variant="primary"
          size="fit"
          // disabled={isLastStep}
          onClick={() => setActiveStep(Math.min(steps.length, activeStep + 1))}
          className="py-2 px-3 flex items-center gap-2"
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
  );
};

export default Stepper;
