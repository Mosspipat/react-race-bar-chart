import React from "react";
import LinearGaugeProvider from "./LinearGaugeProvider";

export const AppContext = React.createContext<null>(null);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppContext.Provider value={null}>
      <LinearGaugeProvider>{children}</LinearGaugeProvider>
    </AppContext.Provider>
  );
};

export default AppContextProvider;
