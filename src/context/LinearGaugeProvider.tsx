import { createContext, useState } from "react";

export const LinearGaugeContext = createContext<LinearContext>({
  currentYear: 1950,
  setCurrentYear: () => {},
  isPlayGauge: false,
  setIsPlayGauge: () => {},
});

export type LinearContext = {
  currentYear: number;
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>;
  isPlayGauge: boolean;
  setIsPlayGauge: React.Dispatch<React.SetStateAction<boolean>>;
};

const LinearGaugeProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentYear, setCurrentYear] = useState(1950);
  const [isPlayGauge, setIsPlayGauge] = useState(false);

  return (
    <LinearGaugeContext.Provider
      value={{ currentYear, setCurrentYear, isPlayGauge, setIsPlayGauge }}
    >
      {children}
    </LinearGaugeContext.Provider>
  );
};

export default LinearGaugeProvider;
