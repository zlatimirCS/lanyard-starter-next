import RibbonCanvas from "./ribbonCanvas";
import ColourPicker from "./colourPicker";

function ChooseColour() {
  return (
    <div className="max-w-[954px] mx-auto flex justify-center items-start gap-[27px] xl:gap-[250px]">
      <RibbonCanvas />
      <ColourPicker />
    </div>
  );
}

export default ChooseColour;
