import React, { useState } from "react";
import Papa from "papaparse";

const App = () => {
  const [data, setData] = useState([]);
  console.log("🚀: ~ data:", data);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];

    if (file) {
      Papa.parse(file, {
        header: true, // กำหนดให้แปลงหัวตารางเป็น key ใน JSON
        skipEmptyLines: true, // ข้ามบรรทัดที่ว่าง
        complete: (result) => {
          setData(result.data as []); // บันทึกข้อมูลที่แปลงแล้วใน state
        },
      });
    }
  };

  return (
    <div className="">
      <h1>Population growth per country, 1950 to 2021</h1>
      <h2>Click on the legend below to filter by continent</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* แสดงข้อมูล JSON */}
    </div>
  );
};

export default App;
