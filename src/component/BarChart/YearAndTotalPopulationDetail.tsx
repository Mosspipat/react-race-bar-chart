import { useContext } from "react";
import { BarChartValueContext } from "../../context/BarChartValueContextProvider";

const YearAndTotalPopulationDetail = ({
  totalPopulation,
}: {
  totalPopulation: number;
}) => {
  const { currentYear } = useContext(BarChartValueContext);

  return (
    <div className="absolute right-0 bottom-0 flex flex-col items-end p-2  text-slate-500">
      <h1 className="text-9xl font-bold">{currentYear}</h1>
      <p className=" font-semibold  text-5xl">
        <span className=" mr-2">Total:</span>
        {totalPopulation.toLocaleString("en-US")}
      </p>
    </div>
  );
};

export default YearAndTotalPopulationDetail;
