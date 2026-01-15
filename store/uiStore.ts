import { create } from "zustand";
import { produce } from "immer";

interface ProductSettings {
  ribbonSize: string;
  active: boolean;
  id: string;
  // length: string;
  // attachment: string;
}

interface Settings {
  pickedProduct: string;
  settings: {
    lanyard: ProductSettings;
    dangle: ProductSettings;
    wristband: ProductSettings;
  };
}

interface UIStore {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  settings: Settings;
  setRibbonSize: (productId: keyof Settings["settings"], size: string) => void;
  setPickActiveProduct: (productId: keyof Settings["settings"]) => void;
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
  pickedProduct: "",
  settings: {
    lanyard: {
      id: "lanyard",
      ribbonSize: "",
      active: false,
    },
    dangle: {
      id: "dangle",
      ribbonSize: "",
      active: false,
    },
    wristband: {
      id: "wristband",
      ribbonSize: "",
      active: false,
    },
  },
};

export const useUIStore = create<UIStore>((set) => ({
  // state
  currentStep: 0,
  settings: defaultSettings,

  // actions
  setCurrentStep: (step: number) => set({ currentStep: step }),
  setRibbonSize: (productId: keyof Settings["settings"], size: string) =>
    set(
      produce((state: UIStore) => {
        state.settings.settings[productId].ribbonSize = size;
      })
    ),
  setPickActiveProduct: (productId: keyof Settings["settings"]) =>
    set(
      produce((state: UIStore) => {
        state.settings.pickedProduct = productId;
        state.settings.settings[productId].active = true;
        // Deactivate other products
        (
          Object.keys(state.settings.settings) as (keyof Settings["settings"])[]
        ).forEach((key) => {
          if (key !== productId) {
            state.settings.settings[key].active = false;
          }
        });
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
