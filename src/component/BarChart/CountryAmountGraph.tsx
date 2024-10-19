import { motion } from "framer-motion";
import { CountryPopulation } from "../../data/population";
import { useContext, useMemo, useRef } from "react";
import { LinearGaugeContext } from "../../context/LinearGaugeProvider";

const CountryAmountGraph = ({ country }: { country: CountryPopulation }) => {
  const { TopAmountPopulation } = useContext(LinearGaugeContext);

  const populationAmountRef = useRef(null);
  // i want to get width populationAmountRef
  const maxWidthBox =
    populationAmountRef.current?.getBoundingClientRect().width;

  const widthValue = useMemo(() => {
    return (country.amount / TopAmountPopulation) * maxWidthBox;
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
      <div className="text-black text-right mr-2 bg-slate-400 p-1">
        {country.countryName}
      </div>
      <div
        ref={populationAmountRef}
        className="  col-span-9 flex gap-2 text-black"
      >
        <div
          style={{ width: `${widthValue}px`, zIndex: 0 }}
          className=" relative flex h-full bg-slate-400 z-10 transition-all duration-500"
        >
          <h3
            className={` absolute top-[50%] right-[0%] -translate-y-[50%] translate-x-[150%]  transition-all duration-500 text-white`}
            style={{ zIndex: 100 }}
          >
            {/* {countryListData[country.countryName]?.[country.year ?? 0]
              ?.amount ?? country.amount} */}

            {/* {countryListData} */}

            {country.amount}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

export default CountryAmountGraph;
