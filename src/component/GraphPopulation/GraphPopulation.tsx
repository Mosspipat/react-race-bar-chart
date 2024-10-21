import { useCallback, useContext, useEffect, useState } from "react";

import { FaHandPointDown } from "react-icons/fa";
import { CountryPopulation } from "../../data/population";
import { RegionBox } from "../../data/region";
import BarChart from "../BarChart/BarChart";
import YearController from "../BarChart/YearController";
import { callDataExcel, filterData } from "../../util/dataExcel";
import { BarChartValueContext } from "../../context/BarChartValueContextProvider";
import { CountryName } from "../../type/linearGauge";

const GraphPopulation = () => {
  const { filterCountryData, setFilterCountryData, currentYear } =
    useContext(BarChartValueContext);
  const [countryData, setCountryData] = useState<CountryPopulation[]>([]);

  type DataCountry = {
    [countryName: string]: {
      [year: number]: {
        amount: number;
      };
    };
  };

  useEffect(() => {
    const newCountryData: CountryPopulation[] = [];

    const filterData = filterCountryData as DataCountry;

    for (const countryName in filterData) {
      const amount =
        filterData[countryName as CountryName]?.[currentYear]?.amount ?? 0;
      newCountryData.push({
        countryName,
        amount,
      });
    }
    setCountryData(newCountryData);
  }, [filterCountryData, currentYear]);

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
  }, [setFilterCountryData]); // memorize function เมื่อ mount

  useEffect(() => {
    getData();
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
    <div className="flex justify-center w-screen">
      <div className=" flex flex-col gap-10 p-2 w-[80%]  ">
        {/* header component */}
        <div className="text-slate-600 flex flex-col gap-2">
          <h1 className="font-bold">
            Population growth per country, 1950 to 2021
          </h1>
          <h2 className="flex items-center gap-2 font-normal text-2xl">
            Click on the legend below to filter by continent
            <FaHandPointDown color="orange" />
          </h2>
        </div>
        {/* filter component */}
        <div className="flex gap-4 text-slate-600 font-medium">
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
        <YearController />
      </div>
    </div>
  );
};

export default GraphPopulation;
