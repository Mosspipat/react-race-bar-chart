import { useMemo } from "react";
import { CountryPopulation } from "../../data/population";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import YearAndTotalPopulation from "./YearAndTotalPopulation";

const PopulationBarScale = () => {
  return (
    <div className="flex items-center gap-2">
      <p className="text-white font-bold">Population</p>
      <div className="w-4 h-4 rounded-sm bg-red-500" />
    </div>
  );
};

const BarChart = ({ countryData }: { countryData: CountryPopulation[] }) => {
  // Sort countryData by amount in ascending order
  const sortedCountryData = useMemo(() => {
    return [...countryData].sort((a, b) => b.amount - a.amount);
  }, [countryData]);

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
        <div className="col-span-9 flex gap-2 text-black">
          <PopulationBarScale />
        </div>
      </div>
      {sortedCountryData.map((country, index) => {
        const previousCountry = index > 0 ? sortedCountryData[index - 1] : null;
        const hasIncreased = previousCountry
          ? country.amount > previousCountry.amount
          : false;

        return (
          <motion.div
            key={country.countryName}
            layout // Add layout prop to animate changes in position
            className="grid grid-cols-10 "
            initial={{ opacity: 0 }} // Initial animation when the item first appears
            animate={{ opacity: 1 }} // Animate when the item is rendered
            exit={{ opacity: 0 }} // Optionally add exit animation
            transition={{ duration: 0.5 }}
          >
            <div className="text-black text-right mr-2 bg-slate-400">
              {country.countryName}
            </div>
            <div className="col-span-9 flex gap-2 text-black">
              <motion.div
                style={{ width: `${country.amount}px`, zIndex: 0 }}
                className="flex h-full bg-slate-400 z-10 transition-all duration-500"
              />
              <motion.h3
                className={`transition-all duration-500 ${
                  hasIncreased ? "animate-move-up" : ""
                }`}
                style={{ zIndex: 100 }}
              >
                {country.amount}
              </motion.h3>
            </div>
          </motion.div>
        );
      })}
      <YearAndTotalPopulation totalPopulation={totalPopulation} />
    </div>
  );
};

export default BarChart;
