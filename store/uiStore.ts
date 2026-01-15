import { create } from "zustand";
import { produce } from "immer";

interface ProductSettings {
  ribbonSize: string;
  active: boolean;
  id: string;
  fitting: string;
  colour: string;
  logo: string;
  // length: string;
  // attachment: string;
}

interface Settings {
  pickedProduct: string;
  activeStep: number;
  build: {
    lanyard: ProductSettings;
    dangle: ProductSettings;
    wristband: ProductSettings;
  };
}

interface UIStore {
  // currentStep: number;
  // setCurrentStep: (step: number) => void;
  settings: Settings;
  setActiveStep: (step: number) => void;
  setRibbonSize: (productId: keyof Settings["build"], size: string) => void;
  setPickActiveProduct: (productId: keyof Settings["build"]) => void;
  setFitting: (productId: keyof Settings["build"], fitting: string) => void;
  setColour: (productId: keyof Settings["build"], colour: string) => void;
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
  activeStep: 0,
  build: {
    lanyard: {
      id: "lanyard",
      ribbonSize: "",
      fitting: "",
      colour: "",
      logo: "",
      active: false,
    },
    dangle: {
      id: "dangle",
      ribbonSize: "",
      fitting: "",
      colour: "",
      logo: "",
      active: false,
    },
    wristband: {
      id: "wristband",
      ribbonSize: "",
      fitting: "",
      colour: "",
      logo: "",
      active: false,
    },
  },
};

export const useUIStore = create<UIStore>((set) => ({
  // state
  settings: defaultSettings,

  // actions
  setActiveStep: (step: number) =>
    set(
      produce((state: UIStore) => {
        state.settings.activeStep = step;
      })
    ),
  setRibbonSize: (productId: keyof Settings["build"], size: string) =>
    set(
      produce((state: UIStore) => {
        state.settings.build[productId].ribbonSize = size;
      })
    ),
  setPickActiveProduct: (productId: keyof Settings["build"]) =>
    set(
      produce((state: UIStore) => {
        state.settings.pickedProduct = productId;
        state.settings.build[productId].active = true;
        // Deactivate other products
        (
          Object.keys(state.settings.build) as (keyof Settings["build"])[]
        ).forEach((key) => {
          if (key !== productId) {
            state.settings.build[key].active = false;
          }
        });
      })
    ),
  setFitting: (productId: keyof Settings["build"], fitting: string) =>
    set(
      produce((state: UIStore) => {
        state.settings.build[productId].fitting = fitting;
      })
    ),
  setColour: (productId: keyof Settings["build"], colour: string) =>
    set(
      produce((state: UIStore) => {
        state.settings.build[productId].colour = colour;
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
