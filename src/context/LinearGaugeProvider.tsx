import { createContext, useState } from "react";
import { CountryListData } from "../type/linearGauge";

export const LinearGaugeContext = createContext<LinearContext>({
  currentYear: 1950,
  setCurrentYear: () => {},
  isPlayGauge: false,
  setIsPlayGauge: () => {},
  TopAmountPopulation: 0,
  setTopAmountPopulation: () => {},
  filterCountryData: {},
  setFilterCountryData: () => {},
});

export type LinearContext = {
  currentYear: number;
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>;
  isPlayGauge: boolean;
  setIsPlayGauge: React.Dispatch<React.SetStateAction<boolean>>;
  TopAmountPopulation: number;
  setTopAmountPopulation: React.Dispatch<React.SetStateAction<number>>;
  filterCountryData: CountryListData | null;
  setFilterCountryData: React.Dispatch<React.SetStateAction<CountryListData>>;
};

const LinearGaugeProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentYear, setCurrentYear] = useState(1950);
  const [isPlayGauge, setIsPlayGauge] = useState(false);
  const [TopAmountPopulation, setTopAmountPopulation] = useState(0);
  const [filterCountryData, setFilterCountryData] = useState<CountryListData>(
    {}
  );

  return (
    <LinearGaugeContext.Provider
      value={{
        currentYear,
        setCurrentYear,
        isPlayGauge,
        setIsPlayGauge,
        TopAmountPopulation,
        setTopAmountPopulation,
        filterCountryData,
        setFilterCountryData,
      }}
    >
      {children}
    </LinearGaugeContext.Provider>
  );
};

export default LinearGaugeProvider;
