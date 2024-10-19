import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { CountryPopulation } from "../../data/population";
import YearAndTotalPopulation from "./YearAndTotalPopulation";
import { LinearGaugeContext } from "../../context/LinearGaugeProvider";
import CountryBar from "./CountryBar";

import { motion } from "framer-motion";

const PopulationBarScale = () => {
  const { TopAmountPopulation } = useContext(LinearGaugeContext);

  const barGridRef = useRef(null);

  const widthValue = useMemo(() => {
    return barGridRef.current?.getBoundingClientRect().width;
  }, [barGridRef.current?.getBoundingClientRect().width]);

  const initValueGrid = 50;
  const gridMeasureVisible = 4;

  const [gridMeasure, setGridMeasure] = useState(3);

  return (
    <motion.div
      ref={barGridRef}
      layout
      initial={{ opacity: 0 }} // Initial animation when the item first appears
      animate={{ opacity: 1 }} // Animate when the item is rendered
      exit={{ opacity: 0 }} // Optionally add exit animation
      transition={{ duration: 1 }}
      className="flex items-center justify-center w-full"
    >
      {[...Array(gridMeasure)].map((_, i) => {
        // const valueCal =
        //   ((i % gridMeasure) * TopAmountPopulation * widthValue) %
        //   TopAmountPopulation;

        // console.log({ valueCal });

        return (
          <motion.div
            key={i}
            style={{
              width: `${widthValue / gridMeasure}px`,
            }}
            className="border-l-2 border-green-400 "
            //animtion when the item is rendered
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* {Math.floor(TopAmountPopulation * (i / gridMeasure))} */}
            {Math.floor(TopAmountPopulation * (i / gridMeasure))}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

const BarChart = ({ countryData }: { countryData: CountryPopulation[] }) => {
  const { setTopAmountPopulation } = useContext(LinearGaugeContext);
  // Sort countryData by amount in ascending order
  const sortedCountryData = useMemo(() => {
    return [...countryData].sort((a, b) => b?.amount - a?.amount);
  }, [countryData]);

  useEffect(() => {
    setTopAmountPopulation(sortedCountryData[0]?.amount);
  }, [setTopAmountPopulation, sortedCountryData]);

  const totalPopulation = useMemo(() => {
    const total = sortedCountryData.reduce(
      (acc, cur) => (acc += cur?.amount),
      0
    );
    return total;
  }, [sortedCountryData]);

  return (
    <div className="relative flex flex-col gap-2">
      {/* grid scale */}
      {/* <div className="grid grid-cols-10">
        <div></div>
        <div className="col-span-9 flex gap-2 text-black bg-blue-600">
          <PopulationBarScale />
        </div>
      </div> */}
      {/*  */}
      {sortedCountryData.map((country) => {
        return <CountryBar key={country.countryName} country={country} />;
      })}
      <YearAndTotalPopulation totalPopulation={totalPopulation} />
    </div>
  );
};

export default BarChart;
