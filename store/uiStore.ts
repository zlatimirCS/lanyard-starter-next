import { create } from "zustand";

interface UIStore {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  // state
  currentStep: 1,

  // actions
  setCurrentStep: (step: number) => set({ currentStep: step }),
}));
