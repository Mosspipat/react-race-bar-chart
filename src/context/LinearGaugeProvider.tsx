import { createContext, useState } from "react";

export const LinearGaugeContext = createContext<LinearContext>({
  currentYear: 1950,
  setCurrentYear: () => {},
});

export type LinearContext = {
  currentYear: number;
  setCurrentYear: (year: number) => void;
  children?: React.ReactNode;
};

const LinearGaugeProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentYear, setCurrentYear] = useState(1950);

  return (
    <LinearGaugeContext.Provider value={{ currentYear, setCurrentYear }}>
      {children}
    </LinearGaugeContext.Provider>
  );
};

export default LinearGaugeProvider;
