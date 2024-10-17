import { useContext } from "react";
import Papa from "papaparse";
import { FaHandPointDown } from "react-icons/fa";
import { population } from "../../data/population";
import { RegionBox } from "../../data/region";
import BarChart from "../BarChart/BarChart";
import YearGauge from "../BarChart/YearGauge";
import { LinearGaugeContext } from "../../context/LinearGaugeProvider";

const GraphPopulation = () => {
  const { currentYear } = useContext(LinearGaugeContext);
  console.log("🚀: ~ currentYear:", currentYear);

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

  // const ItemCountryBar = ({
  //   countryName,
  //   amount,
  // }: {
  //   countryName: string;
  //   amount: number;
  // }) => {
  //   console.log({ countryName, amount: `w-[${amount * 10}px]` });
  //   return (
  //     <div className="flex items-center gap-2">
  //       <p>{countryName}</p>
  //       <div className={`w-[400px] h-4 rounded-sm bg-red-500`} />
  //     </div>
  //   );
  // };

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

        <BarChart countryData={population} />
        <YearGauge />

        {/* <input type="file" accept=".csv" onChange={handleFileUpload} />
      <pre>{JSON.stringify(data, null, 2)}</pre>  //แสดงข้อมูล JSON  */}
      </div>
    </>
  );
};

export default GraphPopulation;
