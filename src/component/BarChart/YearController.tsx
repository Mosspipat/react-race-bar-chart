import { useContext } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import YearGrid from "./LinearGauge/YearGrid";
import { BarChartValueContext } from "../../context/BarChartValueContextProvider";

const YearController = () => {
  const { isPlayGauge, setIsPlayGauge } = useContext(BarChartValueContext);

  const sizeIcon = 16;

  const onToggle = () => {
    setIsPlayGauge((prev) => !prev);
  };

  const IconPlayerRender = () => {
    switch (isPlayGauge) {
      case true:
        return <FaPause size={sizeIcon} />;
      case false:
        return <FaPlay size={sizeIcon} />;
    }
  };

  return (
    <div className="flex gap-6  items-center    ">
      <button
        className="rounded-full w-10 h-10 bg-slate-800 flex justify-center items-center focus:outline-none  hover:outline-none hover:border-none active:border-none border-none"
        onClick={onToggle}
      >
        <div className="">{IconPlayerRender()}</div>
      </button>
      <YearGrid />
    </div>
  );
};

export default YearController;
