import { createContext, useState } from "react";

export const BarChartContext = createContext<BarValue>({
  sizeBarChartRace: { width: 0, height: 0 },
  setSizeBarChartRace: () => {},
});

export type BarValue = {
  sizeBarChartRace: { width: number; height: number };
  setSizeBarChartRace: React.Dispatch<
    React.SetStateAction<{ width: number; height: number }>
  >;
};

const BarChartProvider = ({ children }: { children: React.ReactNode }) => {
  const [sizeBarChartRace, setSizeBarChartRace] = useState({
    width: 0,
    height: 0,
  });

  return (
    <BarChartContext.Provider value={{ sizeBarChartRace, setSizeBarChartRace }}>
      {children}
    </BarChartContext.Provider>
  );
};

export default BarChartProvider;
