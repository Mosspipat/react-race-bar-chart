import React, { useState } from "react";
import Papa from "papaparse";
import { FaHandPointDown } from "react-icons/fa";
import { CountryPopulation, population } from "./data/population";

const App = () => {
  // const [data, setData] = useState([]);

  // const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e?.target?.files?.[0];

  //   if (file) {
  //     Papa.parse(file, {
  //       header: true, // กำหนดให้แปลงหัวตารางเป็น key ใน JSON
  //       skipEmptyLines: true, // ข้ามบรรทัดที่ว่าง
  //       complete: (result) => {
  //         setData(result.data as []); // บันทึกข้อมูลที่แปลงแล้วใน state
  //       },
  //     });
  //   }
  // };

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

  const BarChart = ({ countryData }: { countryData: CountryPopulation[] }) => {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div>0</div>
          <div>200</div>
          <div>400</div>
          <div>600</div>
        </div>

        <div className="flex flex-col bg-white gap-2">
          {countryData.map((countryData) => {
            console.log(`w-[${countryData?.amount.toString()}px]`);

            return (
              <div className="grid grid-cols-10 ">
                <div className=" text-black text-right mr-2 bg-slate-400">
                  {countryData.countryName}
                </div>
                <div className="col-span-9 flex gap-2 text-black ">
                  <div
                    style={{ width: `${countryData?.amount}px`, zIndex: 0 }}
                    className="flex h-full bg-slate-400 z-10"
                  />
                  <h3 className="	" style={{ zIndex: 100 }}>
                    {countryData?.amount}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* <div>{children}</div> */}
      </div>
    );
  };

  const ItemCountryBar = ({
    countryName,
    amount,
  }: {
    countryName: string;
    amount: number;
  }) => {
    console.log({ countryName, amount: `w-[${amount * 10}px]` });
    return (
      <div className="flex items-center gap-2">
        <p>{countryName}</p>
        <div className={`w-[400px] h-4 rounded-sm bg-red-500`} />
      </div>
    );
  };

  const RegionBox: { regionName: string; color: string }[] = [
    { regionName: "Asia", color: "bg-blue-500" },
    { regionName: "Europe", color: "bg-purple-500" },
    { regionName: "Africa", color: "bg-red-500" },
    { regionName: "Oceania", color: "bg-yellow-500" },
    { regionName: "Americas", color: "bg-yellow-300" },
  ];

  return (
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

      <BarChart countryData={population} />
      {/* <input type="file" accept=".csv" onChange={handleFileUpload} />
      <pre>{JSON.stringify(data, null, 2)}</pre>  //แสดงข้อมูล JSON  */}
    </div>
  );
};

export default App;
