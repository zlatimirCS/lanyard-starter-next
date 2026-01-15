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
  loadSettingsFromCookies: () => void;
}

// read default settings from cookies function
function getDefaultSettingsFromCookies(): Settings | null {
  const match = document.cookie.match(
    new RegExp("(^| )productSettings=([^;]+)")
  );
  if (match) {
    try {
      console.log("Cookie found:", match[2]);
      return JSON.parse(decodeURIComponent(match[2]));
    } catch {
      return null;
    }
  }
  return null;
}

const defaultSettings = {
  lanyard: {
    ribbonSize: "",
  },
  dangle: {
    ribbonSize: "",
  },
  wristband: {
    ribbonSize: "",
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
  loadSettingsFromCookies: () => {
    if (typeof document !== "undefined") {
      const cookieSettings = getDefaultSettingsFromCookies();
      if (cookieSettings) {
        set({ settings: cookieSettings });
      }
    }
  },
}));
