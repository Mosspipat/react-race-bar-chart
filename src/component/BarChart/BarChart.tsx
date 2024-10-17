import { useMemo } from "react";
import { CountryPopulation } from "../../data/population";
import YearAndTotalPopulation from "./YearAndTotalPopulation";

const PopulationBarScale = () => {
  return (
    <div className="flex items-center gap-2">
      <p>Population</p>
      <div className="w-4 h-4 rounded-sm bg-red-500" />
    </div>
  );
};

const BarChart = ({ countryData }: { countryData: CountryPopulation[] }) => {
  const totalPopulation = useMemo(() => {
    const total = countryData.reduce((acc, cur) => {
      return (acc += cur.amount);
    }, 0);
    return total;
  }, [countryData]);

  return (
    <div className="relative flex flex-col bg-white gap-2">
      <div className="grid grid-cols-10">
        <div></div>
        <div className="col-span-9 flex gap-2 text-black ">
          <PopulationBarScale />
        </div>
      </div>
      {countryData.map((countryData) => {
        return (
          <div className="grid grid-cols-10 ">
            <div className=" text-black text-right mr-2 bg-slate-400">
              {countryData.countryName}
            </div>
            <div className="col-span-9 flex gap-2 text-black ">
              <div
                style={{ width: `${countryData?.amount}px`, zIndex: 0 }}
                className="flex h-full bg-slate-400 z-10"
              />
              <h3 className="	" style={{ zIndex: 100 }}>
                {countryData?.amount}
              </h3>
            </div>
          </div>
        );
      })}
      <YearAndTotalPopulation year={2022} totalPopulation={totalPopulation} />
    </div>
  );
};

export default BarChart;
