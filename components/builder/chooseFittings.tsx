import RibbonCanvas from "./ribbonCanvas";
import Fittings from "./fittings";

function ChooseFittings() {
  return (
    <div className="max-w-[954px] mx-auto flex justify-center gap-[27px] xl:gap-[250px]">
      <RibbonCanvas />
      <Fittings />
    </div>
  );
}

export default ChooseFittings;
