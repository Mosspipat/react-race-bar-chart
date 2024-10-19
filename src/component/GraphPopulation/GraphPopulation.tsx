import { useCallback, useContext, useEffect, useState } from "react";

import { FaHandPointDown } from "react-icons/fa";
import { CountryPopulation, populationData } from "../../data/population";
import { RegionBox } from "../../data/region";
import BarChart from "../BarChart/BarChart";
import YearGauge from "../BarChart/YearGauge";
import { callDataExcel, filterData } from "../../util/dataExcel";
import { LinearGaugeContext } from "../../context/LinearGaugeProvider";

const GraphPopulation = () => {
  const { filterCountryData, setFilterCountryData, currentYear } =
    useContext(LinearGaugeContext);
  const [countryData, setCountryData] = useState<CountryPopulation[]>([]);

  console.log(currentYear);

  useEffect(() => {
    const newCountryData: CountryPopulation[] = [];
    console.log({ newCountryData });
    for (const countryName in filterCountryData) {
      const amount = filterCountryData[countryName]?.[currentYear]?.amount ?? 0;
      newCountryData.push({
        countryName,
        amount,
      });
    }
    setCountryData(newCountryData);
  }, [filterCountryData, currentYear]);

  const [population, setPopulation] = useState(populationData);

  const getData = useCallback(async () => {
    const data = await callDataExcel();

    const dataFilter = filterData({
      data,
      nameCountryList: [
        "China",
        "India",
        "United States", // "USA",
        "Russia",
        "Japan",
        "Indonesia",
        "Germany",
        "Brazil",
        "United Kingdom", // "UK",
        "Italy",
        "France",
        "Bangladesh",
      ],
    });
    setFilterCountryData(dataFilter);
  }, []); // memorize function เมื่อ mount

  useEffect(() => {
    getData();
    console.log("fetchData");
  }, [getData]);

  const RegionBoxRender = ({
    label,
    colorClass,
  }: {
    label: string;
    colorClass: string;
  }) => {
    return (
      <div className="flex items-center gap-2">
        <div className={`w-4 h-4 rounded-sm ${colorClass}`} />
        {label}
      </div>
    );
  };

  return (
    <>
      <div className=" flex flex-col gap-10 p-2">
        {/* header component */}
        <div className="flex flex-col gap-2">
          <h1>Population growth per country, 1950 to 2021</h1>
          <h2 className="flex items-center gap-2">
            Click on the legend below to filter by continent
            <FaHandPointDown color="yellow" />
          </h2>
        </div>
        {/* filter component */}
        <div className="flex gap-4">
          <h2 className="font-bold">Region</h2>
          <div className="flex items-center gap-2">
            {RegionBox.map((region) => {
              return (
                <RegionBoxRender
                  label={region.regionName}
                  colorClass={region.color}
                />
              );
            })}
          </div>
        </div>

        <BarChart countryData={countryData} />

        <YearGauge />
        {/* <input type="file" accept=".csv" onChange={handleFileUpload} />
      <pre>{JSON.stringify(data, null, 2)}</pre>  //แสดงข้อมูล JSON  */}
      </div>
    </>
  );
};

export default GraphPopulation;
