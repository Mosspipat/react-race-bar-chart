import React from "react";
import BarChartValueContext from "./BarChartValueContextProvider";
import BarChartProvider from "./BarChartContextProvider";

export const AppContext = React.createContext<null>(null);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppContext.Provider value={null}>
      <BarChartProvider>
        <BarChartValueContext>{children}</BarChartValueContext>
      </BarChartProvider>
    </AppContext.Provider>
  );
};

export default AppContextProvider;
