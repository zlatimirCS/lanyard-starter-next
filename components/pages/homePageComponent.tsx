"use client";
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
  const currentStep = useUIStore((state) => state.currentStep);
  const routeSteps = () => {
    switch (currentStep) {
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
  return (
    <>
      <div>{routeSteps()}</div>
    </>
  );
}

export default HomePageComponent;
