import RibbonCanvas from "./ribbonCanvas";
import Fittings from "./fittings";

function ChooseFittings() {
  return (
    <div className="max-w-[954px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[27px]">
      <RibbonCanvas />
      <Fittings />
    </div>
  );
}

export default ChooseFittings;
