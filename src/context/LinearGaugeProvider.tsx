import { createContext, useState } from "react";

export const LinearGaugeContext = createContext<LinearContext>({
  currentYear: 1950,
  setCurrentYear: () => {},
  isPlayGauge: false,
  setIsPlayGauge: () => {},
  TopAmountPopulation: 0,
  setTopAmountPopulation: () => {},
});

export type LinearContext = {
  currentYear: number;
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>;
  isPlayGauge: boolean;
  setIsPlayGauge: React.Dispatch<React.SetStateAction<boolean>>;
  TopAmountPopulation: number;
  setTopAmountPopulation: React.Dispatch<React.SetStateAction<number>>;
};

const LinearGaugeProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentYear, setCurrentYear] = useState(1950);
  const [isPlayGauge, setIsPlayGauge] = useState(false);
  const [TopAmountPopulation, setTopAmountPopulation] = useState(0);

  return (
    <LinearGaugeContext.Provider
      value={{
        currentYear,
        setCurrentYear,
        isPlayGauge,
        setIsPlayGauge,
        TopAmountPopulation,
        setTopAmountPopulation,
      }}
    >
      {children}
    </LinearGaugeContext.Provider>
  );
};

export default LinearGaugeProvider;
