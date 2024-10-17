import { useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import LinearGauge from "./LinearGauge/LinearGauge";

const YearGauge = () => {
  const [isPlay, setIsPlay] = useState<boolean>(false);

  const sizeIcon = 16;

  const onToggle = () => {
    console.log("toggle");
    setIsPlay((prev) => !prev);
  };

  const IconPlayerRender = () => {
    switch (isPlay) {
      case true:
        return <FaPause size={sizeIcon} />;
      case false:
        return <FaPlay size={sizeIcon} />;
    }
  };

  return (
    <div className="flex gap-2 bg-red-500 items-center ">
      <button
        className="rounded-full w-10 h-10 bg-slate-800 flex justify-center items-center focus:outline-none  hover:outline-none hover:border-none active:border-none border-none"
        onClick={onToggle}
      >
        <div className="">{IconPlayerRender()}</div>
      </button>
      <LinearGauge />
    </div>
  );
};

export default YearGauge;
