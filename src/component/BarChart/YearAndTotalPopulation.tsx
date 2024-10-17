import { useContext } from "react";
import { LinearGaugeContext } from "../../context/LinearGaugeProvider";

const YearAndTotalPopulation = ({
  totalPopulation,
}: {
  totalPopulation: number;
}) => {
  const { currentYear } = useContext(LinearGaugeContext);

  return (
    <div className="absolute right-0 bottom-0 flex flex-col items-end p-2  text-slate-500">
      <h1 className=" font-bold">{currentYear}</h1>
      <p className=" font-semibold  text-2xl">
        <span className=" mr-2">Total:</span>
        {totalPopulation}
      </p>
    </div>
  );
};

export default YearAndTotalPopulation;
