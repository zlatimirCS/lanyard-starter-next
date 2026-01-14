import { create } from "zustand";

interface UIStore {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  animatedSteps: number[];
  setAnimatedSteps: (steps: number[]) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  // state
  currentStep: 3,
  animatedSteps: [],

  // actions
  setCurrentStep: (step: number) => set({ currentStep: step }),
  setAnimatedSteps: (steps: number[]) => set({ animatedSteps: steps }),
}));
