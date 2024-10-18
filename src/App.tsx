import AppContextProvider from "./context/AppContextProvider";
import GraphPopulation from "./component/GraphPopulation/GraphPopulation";
import { useState, useEffect } from "react";
import { callDataExcel, filterData } from "./util/dataExcel";

const App = () => {
  const [data, setData] = useState([]);
  console.log("🚀: ~ data:", data);

  useEffect(() => {
    (async () => {
      const data = await callDataExcel();
      setData(data);
    })();
  }, []);

  useEffect(() => {
    const a = filterData({
      data,
      nameCountryList: [
        //from countryName in populationData.countryName from population.ts only
        "China",
        "India",
        "USA",
        "Russia",
        "Japan",
        "Indonesia",
        "Germany",
        "Brazil",
        "UK",
        "Italy",
        "France",
        "Bangladesh",
      ],
    });

    console.log(a);
  }, [data]);

  return (
    <AppContextProvider>
      <GraphPopulation />
    </AppContextProvider>
  );
};

export default App;
