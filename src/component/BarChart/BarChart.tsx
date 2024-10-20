import { useContext, useEffect, useMemo, useRef } from "react";
import { CountryPopulation } from "../../data/population";

import { BarChartValueContext } from "../../context/BarChartValueContextProvider";
import CountryBar from "./CountryBar";

import GridLineXAxis from "../D3/GridLineXAxis";
import YearAndTotalPopulationDetail from "./YearAndTotalPopulationDetail";
import { BarChartContext } from "../../context/BarChartContextProvider";

// const PopulationBarScale = () => {
//   const { TopAmountPopulation } = useContext(BarChartValueContext);

//   const barGridRef = useRef(null);

//   const widthValue = useMemo(() => {
//     return barGridRef.current?.getBoundingClientRect().width;
//   }, [barGridRef.current?.getBoundingClientRect().width]);

//   const initValueGrid = 50;
//   const gridMeasureVisible = 4;

//   const [gridMeasure, setGridMeasure] = useState(3);

//   return (
//     <motion.div
//       ref={barGridRef}
//       layout
//       initial={{ opacity: 0 }} // Initial animation when the item first appears
//       animate={{ opacity: 1 }} // Animate when the item is rendered
//       exit={{ opacity: 0 }} // Optionally add exit animation
//       transition={{ duration: 1 }}
//       className="flex items-center justify-center w-full"
//     >
//       {[...Array(gridMeasure)].map((_, i) => {
//         // const valueCal =
//         //   ((i % gridMeasure) * TopAmountPopulation * widthValue) %
//         //   TopAmountPopulation;

//         return (
//           <motion.div
//             key={i}
//             style={{
//               width: `${widthValue / gridMeasure}px`,
//             }}
//             className="border-l-2 border-green-400 "
//             //animtion when the item is rendered
//             initial={{ opacity: 1 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             {/* {Math.floor(TopAmountPopulation * (i / gridMeasure))} */}
//             {Math.floor(TopAmountPopulation * (i / gridMeasure))}
//           </motion.div>
//         );
//       })}
//     </motion.div>
//   );
// };

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

  const raceBarChartRef = useRef(null);
  const parentPopulationBarRef = useRef(null);

  console.log({ raceBarChartRef, parentPopulationBarRef });

  useEffect(() => {
    if (raceBarChartRef) {
      setSizeBarChartRace({
        width: parentPopulationBarRef.current?.getBoundingClientRect().width,
        height: raceBarChartRef.current?.getBoundingClientRect().height,
      });
    }
  }, [
    raceBarChartRef.current?.getBoundingClientRect().height,
    parentPopulationBarRef.current?.getBoundingClientRect().width,
    setSizeBarChartRace,
  ]);

  return (
    <div
      ref={raceBarChartRef}
      className="relative flex flex-col gap-2 bg-green-400"
    >
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
