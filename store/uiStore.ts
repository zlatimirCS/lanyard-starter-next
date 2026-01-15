import { create } from "zustand";
import { produce } from "immer";

interface ProductSettings {
  ribbonSize: string;
  // length: string;
  // attachment: string;
}

interface Settings {
  lanyard: ProductSettings;
  dangle: ProductSettings;
  wristband: ProductSettings;
}

interface UIStore {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  settings: Settings;
  setRibbonSize: (productId: keyof Settings, size: string) => void;
}

const defaultSettings = {
  lanyard: {
    ribbonSize: "20mm",
  },
  dangle: {
    ribbonSize: "20mm",
  },
  wristband: {
    ribbonSize: "15mm",
  },
};

export const useUIStore = create<UIStore>((set) => ({
  // state
  currentStep: 0,
  settings: defaultSettings,

  // actions
  setCurrentStep: (step: number) => set({ currentStep: step }),
  setRibbonSize: (productId: keyof Settings, size: string) =>
    set(
      produce((state: UIStore) => {
        state.settings[productId].ribbonSize = size;
      })
    ),
}));
