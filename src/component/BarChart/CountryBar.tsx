import { motion } from "framer-motion";
import { CountryPopulation } from "../../data/population";
import { useContext, useMemo, useRef } from "react";
import { LinearGaugeContext } from "../../context/LinearGaugeProvider";

import Flag from "react-world-flags";
import { countryWith2Letter } from "../../util/country";

const CountryBar = ({ country }: { country: CountryPopulation }) => {
  const { TopAmountPopulation } = useContext(LinearGaugeContext);

  const populationAmountRef = useRef<HTMLDivElement | null>(null);
  // i want to get width populationAmountRef
  const maxWidthBox =
    populationAmountRef.current?.getBoundingClientRect().width;

  const widthValue = useMemo(() => {
    return (country.amount / TopAmountPopulation) * (maxWidthBox || 0);
  }, [country.amount, TopAmountPopulation]);

  console.log(country?.countryName);

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
        className="  col-span-9 flex gap-2 text-black"
      >
        <div
          style={{ width: `${widthValue}px`, zIndex: 0 }}
          className="relative flex h-full bg-slate-400 z-10 transition-all duration-500 p-5"
        >
          <div className=" absolute w-[30px] h-[30px] right-5 translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden">
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
