import { createContext, useState } from "react";
import { CountryListData } from "../type/linearGauge";

export const BarChartValueContext = createContext<BarChartValue>({
  currentYear: 1950,
  setCurrentYear: () => {},
  maxMinYear: { minYear: 0, maxYear: 0 },
  setMaxMinYear: () => {},
  isPlayGauge: false,
  setIsPlayGauge: () => {},
  TopAmountPopulation: 0,
  setTopAmountPopulation: () => {},
  filterCountryData: {},
  setFilterCountryData: () => {},
  BottomAmountPopulation: 0,
  setBottomAmountPopulation: () => {},
});

export type BarChartValue = {
  currentYear: number;
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>;
  maxMinYear: { minYear: number; maxYear: number };
  setMaxMinYear: React.Dispatch<
    React.SetStateAction<{ minYear: number; maxYear: number }>
  >;
  isPlayGauge: boolean;
  setIsPlayGauge: React.Dispatch<React.SetStateAction<boolean>>;
  TopAmountPopulation: number;
  setTopAmountPopulation: React.Dispatch<React.SetStateAction<number>>;
  filterCountryData: CountryListData | null;
  setFilterCountryData: React.Dispatch<React.SetStateAction<CountryListData>>;
  BottomAmountPopulation: number;
  setBottomAmountPopulation: React.Dispatch<React.SetStateAction<number>>;
};

const BarChartValueProvider = ({ children }: { children: React.ReactNode }) => {
  const [maxMinYear, setMaxMinYear] = useState<{
    minYear: number;
    maxYear: number;
  }>({
    minYear: 1950,
    maxYear: 2022,
  });

  const [currentYear, setCurrentYear] = useState(maxMinYear.minYear);
  const [isPlayGauge, setIsPlayGauge] = useState(false);
  const [TopAmountPopulation, setTopAmountPopulation] = useState<number>(0);
  const [BottomAmountPopulation, setBottomAmountPopulation] =
    useState<number>(0);
  const [filterCountryData, setFilterCountryData] = useState<CountryListData>(
    {}
  );

  return (
    <BarChartValueContext.Provider
      value={{
        currentYear,
        setCurrentYear,
        maxMinYear,
        setMaxMinYear,
        isPlayGauge,
        setIsPlayGauge,
        TopAmountPopulation,
        setTopAmountPopulation,
        filterCountryData,
        setFilterCountryData,
        BottomAmountPopulation,
        setBottomAmountPopulation,
      }}
    >
      {children}
    </BarChartValueContext.Provider>
  );
};

export default BarChartValueProvider;
