"use client";
import ChooseFittings from "../builder/chooseFittings";
import ChooseProduct from "../builder/chooseProduct";
import { useUIStore } from "@/store/uiStore";

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
