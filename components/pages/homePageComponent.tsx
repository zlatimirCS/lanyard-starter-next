"use client";
import React, { useEffect } from "react";
import ChooseProduct from "../builder/chooseProduct";
import dynamic from "next/dynamic";
import { useUIStore } from "@/store/uiStore";

const ChooseFittings = dynamic(() => import("../builder/chooseFittings"), {
  ssr: false,
});

const ChooseColour = dynamic(() => import("../builder/choouseColour"), {
  ssr: false,
});

const ChooseLogo = dynamic(() => import("../builder/chooseLogo"), {
  ssr: false,
});

const Proof = dynamic(() => import("../builder/proof"), { ssr: false });

function HomePageComponent() {
  // const currentStep = useUIStore((state) => state.currentStep);
  const settings = useUIStore((state) => state.settings);
  const activeStep = settings.activeStep;
  const loadSettingsFromCookies = useUIStore((s) => s.loadSettingsFromCookies);

  // Load settings from cookies on mount
  useEffect(() => {
    loadSettingsFromCookies();
  }, [loadSettingsFromCookies]);

  // Save settings to cookies whenever they change
  useEffect(() => {
    console.log("settings in useEffect:", settings);
    const saveSettingsToCookies = (settingsToSave: typeof settings) => {
      document.cookie = `productSettings=${encodeURIComponent(
        JSON.stringify(settingsToSave)
      )}; path=/; max-age=${60 * 60 * 24 * 30}`; // Expires in 30 days
    };

    saveSettingsToCookies(settings);
  }, [settings]);
  const routeSteps = () => {
    switch (activeStep) {
      case 0:
        return <ChooseProduct />;
      case 1:
        return <ChooseFittings />;
      case 2:
        return <ChooseColour />;
      case 3:
        return <ChooseLogo />;
      case 4:
        return <Proof />;
      default:
        return <></>;
    }
  };
  return routeSteps();
}

export default HomePageComponent;
