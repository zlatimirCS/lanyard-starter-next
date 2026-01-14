"use client";
import ChooseProduct from "../builder/chooseProduct";
import dynamic from "next/dynamic";
import { useUIStore } from "@/store/uiStore";

const ChooseFittings = dynamic(() => import("../builder/chooseFittings"), {
  ssr: false,
});

function HomePageComponent() {
  const currentStep = useUIStore((state) => state.currentStep);
  const routeSteps = () => {
    switch (currentStep) {
      case 0:
        return <ChooseProduct />;
      case 1:
        return <ChooseFittings />;
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
