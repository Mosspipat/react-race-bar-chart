import AppContextProvider from "./context/AppContextProvider";
import GraphPopulation from "./component/GraphPopulation/GraphPopulation";

const App = () => {
  return (
    <AppContextProvider>
      <GraphPopulation />
    </AppContextProvider>
  );
};

export default App;
