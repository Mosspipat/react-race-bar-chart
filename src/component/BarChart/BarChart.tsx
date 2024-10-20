import { useContext, useEffect, useMemo, useRef } from "react";
import { CountryPopulation } from "../../data/population";

import { BarChartValueContext } from "../../context/BarChartValueContextProvider";
import CountryBar from "./CountryBar";

import GridLineXAxis from "../D3/GridLineXAxis";
import YearAndTotalPopulationDetail from "./YearAndTotalPopulationDetail";
import { BarChartContext } from "../../context/BarChartContextProvider";

const BarChart = ({ countryData }: { countryData: CountryPopulation[] }) => {
  const { setTopAmountPopulation, setBottomAmountPopulation } =
    useContext(BarChartValueContext);

  const { setSizeBarChartRace } = useContext(BarChartContext);

  // Sort countryData by amount in ascending order
  const sortedCountryData = useMemo(() => {
    return [...countryData].sort((a, b) => b?.amount - a?.amount);
  }, [countryData]);

  useEffect(() => {
    setTopAmountPopulation(sortedCountryData[0]?.amount);
    setBottomAmountPopulation(
      sortedCountryData[sortedCountryData.length - 1]?.amount
    );
  }, [setTopAmountPopulation, setBottomAmountPopulation, sortedCountryData]);

  const totalPopulation = useMemo(() => {
    const total = sortedCountryData.reduce(
      (acc, cur) => (acc += cur?.amount),
      0
    );
    return total;
  }, [sortedCountryData]);

  const raceBarChartRef = useRef<HTMLDivElement | null>(null);
  const parentPopulationBarRef = useRef<HTMLDivElement | null>(null);

  console.log({ raceBarChartRef, parentPopulationBarRef });

  useEffect(() => {
    if (raceBarChartRef) {
      setSizeBarChartRace({
        width:
          parentPopulationBarRef.current?.getBoundingClientRect().width || 0,
        height: raceBarChartRef.current?.getBoundingClientRect().height || 0,
      });
    }
  }, [
    raceBarChartRef.current?.getBoundingClientRect().height,
    parentPopulationBarRef.current?.getBoundingClientRect().width,
    setSizeBarChartRace,
  ]);

  return (
    <div ref={raceBarChartRef} className="relative flex flex-col gap-2 ">
      {/* grid scale */}
      <div className="grid grid-cols-10 ">
        <div></div>
        <div
          ref={parentPopulationBarRef}
          className=" relative col-span-9 flex gap-2 text-black "
        >
          {/* <PopulationBarScale /> */}
          <GridLineXAxis ref={parentPopulationBarRef} />
        </div>
      </div>
      {/*  */}
      {sortedCountryData.map((country) => {
        return <CountryBar key={country.countryName} country={country} />;
      })}
      <YearAndTotalPopulationDetail totalPopulation={totalPopulation} />
    </div>
  );
};

export default BarChart;
