import AppContextProvider from "./context/AppContextProvider";
import GraphPopulation from "./component/GraphPopulation/GraphPopulation";
import AxisScale from "./component/D3/AxisScale";
import SampleD3Chart from "./component/D3/GridLineXAxis";

const App = () => {
  return (
    <AppContextProvider>
      <GraphPopulation />
      {/* <SampleD3Chart /> */}
    </AppContextProvider>
  );
};

export default App;
