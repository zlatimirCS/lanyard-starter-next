"use client";
import { useEffect } from "react";
import { useUIStore } from "@/store/uiStore";

const steps = ["Product", "Fittings", "Colour", "Logo", "Proof"];

function Stepper() {
  const currentStep = useUIStore((state) => state.currentStep);
  const animatedSteps = useUIStore((state) => state.animatedSteps);
  const setAnimatedSteps = useUIStore((state) => state.setAnimatedSteps);

  useEffect(() => {
    // Animate steps as they become completed
    const timer = setTimeout(() => {
      setAnimatedSteps(Array.from({ length: currentStep + 1 }, (_, i) => i));
    }, 100);
    return () => clearTimeout(timer);
  }, [currentStep, setAnimatedSteps]);

  return (
    <div className="bg-white border-b border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Circles and Lines Row */}
        <div className="flex items-center">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;
            const isPending = index > currentStep;
            const isAnimated = animatedSteps.includes(index);

            return (
              <div
                key={step}
                className="flex items-center flex-1 last:flex-none"
              >
                {/* Circle */}
                <div className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isCompleted
                        ? "bg-blue-600 scale-100"
                        : isActive
                        ? "bg-white border-2 border-blue-600 scale-110"
                        : "bg-gray-200 border-2 border-gray-300"
                    }`}
                  >
                    {/* Checkmark for completed steps */}
                    {isCompleted && (
                      <svg
                        className={`w-6 h-6 text-white transition-all duration-300 ${
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
                      <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" />
                    )}

                    {/* Empty for pending steps */}
                    {isPending && (
                      <div className="w-3 h-3 bg-gray-400 rounded-full" />
                    )}
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

        {/* Text Labels Row - matching the circle positions */}
        <div className="flex mt-3">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div
                key={step}
                className="flex items-center flex-1 last:flex-none"
              >
                {/* Text Label - centered in same width as circle */}
                <div className="w-10 text-center">
                  <span
                    className={`text-sm font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-blue-600"
                        : isCompleted
                        ? "text-gray-700"
                        : "text-gray-400"
                    }`}
                  >
                    {step}
                  </span>
                </div>

                {/* Spacer matching the line width */}
                {index < steps.length - 1 && <div className="flex-1 mx-2" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Stepper;
