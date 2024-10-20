import { motion } from "framer-motion";
import { CountryPopulation } from "../../data/population";
import { useContext, useMemo, useRef } from "react";
import { BarChartValueContext } from "../../context/BarChartValueContextProvider";

import Flag from "react-world-flags";
import { countryWith2Letter } from "../../util/country";

const CountryBar = ({ country }: { country: CountryPopulation }) => {
  const { TopAmountPopulation } = useContext(BarChartValueContext);

  const countryBarRef = useRef<HTMLDivElement | null>(null);

  const populationAmountRef = useRef<HTMLDivElement | null>(null);
  // i want to get width populationAmountRef
  const maxWidthPopulationBar =
    populationAmountRef.current?.getBoundingClientRect().width;

  const maxHeightCountryBar = Math.floor(
    countryBarRef.current?.getBoundingClientRect().height as number
  );

  // console.log({
  //   countryName: country.countryName,
  //   maxHeightCountryBar,
  //   maxWidthPopulationBar80Per: maxHeightCountryBar * 0.8,
  // });

  const widthValue = useMemo(() => {
    return (
      (country.amount / TopAmountPopulation) * (maxWidthPopulationBar || 0)
    );
  }, [country.amount, TopAmountPopulation]);

  return (
    <motion.div
      key={country.countryName}
      layout // Add layout prop to animate changes in position
      className="grid grid-cols-10 "
      initial={{ opacity: 0 }} // Initial animation when the item first appears
      animate={{ opacity: 1 }} // Animate when the item is rendered
      exit={{ opacity: 0 }} // Optionally add exit animation
      transition={{ duration: 1 }}
    >
      <div className="text-slate-600 text-right font-semibold mr-2 p-1">
        {country.countryName}
      </div>
      <div
        ref={populationAmountRef}
        className="  col-span-9 flex gap-2 text-black "
      >
        <div
          ref={countryBarRef}
          style={{ width: `${widthValue}px`, zIndex: 0 }}
          className="relative flex h-full bg-slate-400 z-10 transition-all duration-500 p-5"
        >
          <div
            className={`absolute top-[50%] right-5 translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden`}
            style={{
              width: maxHeightCountryBar * 0.8,
              height: maxHeightCountryBar * 0.8,
            }}
          >
            <Flag
              code={
                countryWith2Letter[
                  country?.countryName as keyof typeof countryWith2Letter
                ]
              }
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          {/* {country.amount.toLocaleString("en-US")} */}

          <h3
            className={` absolute top-[50%] right-[0%] -translate-y-[50%] translate-x-[150%]  transition-all duration-500 text-slate-600 font-bold`}
            style={{ zIndex: 100 }}
          >
            {country.amount.toLocaleString("en-US")}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

export default CountryBar;
