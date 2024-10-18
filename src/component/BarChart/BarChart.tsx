import { useContext, useEffect, useMemo, useRef } from "react";
import { CountryPopulation } from "../../data/population";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import YearAndTotalPopulation from "./YearAndTotalPopulation";
import { LinearGaugeContext } from "../../context/LinearGaugeProvider";
import CountryAmountGraph from "./CountryAmountGraph";

const PopulationBarScale = () => {
  const { TopAmountPopulation } = useContext(LinearGaugeContext);
  console.log("🚀: ~ TopAmountPopulation:", TopAmountPopulation);
  const barRef = useRef(null);

  const GridLineRender = (numberScale: number) => {
    // i want to get width barRef
    const width = barRef.current?.getBoundingClientRect().width;
    // console.log("🚀: ~ width:", width);

    return (
      <div className="flex items-center gap-2 flex-1 bg-green-500">
        <p className="text-white font-bold">{numberScale}</p>
      </div>
    );
  };

  return (
    <div ref={barRef} className="flex items-center gap-2 bg-red-500 w-full">
      {GridLineRender(0)}
      {GridLineRender(300)}
      {/* {NextBarRender(600)}
      {NextBarRender(900)}
      {NextBarRender(1200)} */}
    </div>
  );
};

const BarChart = ({ countryData }: { countryData: CountryPopulation[] }) => {
  const { setTopAmountPopulation } = useContext(LinearGaugeContext);
  // Sort countryData by amount in ascending order
  const sortedCountryData = useMemo(() => {
    return [...countryData].sort((a, b) => b.amount - a.amount);
  }, [countryData]);

  useEffect(() => {
    setTopAmountPopulation(sortedCountryData[0].amount);
  }, [setTopAmountPopulation, sortedCountryData]);

  const totalPopulation = useMemo(() => {
    const total = sortedCountryData.reduce(
      (acc, cur) => (acc += cur.amount),
      0
    );
    return total;
  }, [sortedCountryData]);

  return (
    <div className="relative flex flex-col gap-2">
      <div className="grid grid-cols-10">
        <div></div>
        <div className="col-span-9 flex gap-2 text-black bg-blue-600">
          <PopulationBarScale />
        </div>
      </div>
      {sortedCountryData.map((country) => {
        return (
          <CountryAmountGraph key={country.countryName} country={country} />
        );
      })}
      <YearAndTotalPopulation totalPopulation={totalPopulation} />
    </div>
  );
};

export default BarChart;
