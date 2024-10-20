import { useEffect, useRef } from "react";
import * as d3 from "d3";

const AxisScale = () => {
  // สร้าง ref เพื่ออ้างอิงถึง div
  const axisRef = useRef(null);

  useEffect(() => {
    // กำหนดขนาดของกราฟและ margins
    const width = 500; // ความกว้างของแกน
    const height = 500; // ความสูงของแกน

    // เลือก div ที่อ้างอิงด้วย ref
    const svg = d3
      .select(axisRef.current)
      .append("svg") // เพิ่ม SVG ภายใน div
      .attr("width", width)
      .attr("height", height);

    // สร้าง scale สำหรับแกน X (แกนตัวเลข)
    const xScale = d3
      .scaleLinear()
      .domain([0, 600000000]) // ช่วงของข้อมูล (0 - 600 ล้าน)
      .range([0, width - 50]); // กำหนดช่วงของขนาดกราฟ

    // สร้างแกน X
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(4) // จำนวน tick marks
      .tickFormat(d3.format(".2s")); // รูปแบบการแสดงตัวเลข เช่น 200M, 400M

    // เพิ่มแกน X เข้าไปใน SVG
    svg
      .append("g")
      .attr("transform", `translate(25, ${height / 2})`) // จัดตำแหน่งแกน
      .call(xAxis);
  }, []);

  return <div ref={axisRef} style={{ marginInline: "auto", color: "red" }} />; // สร้าง div ที่จะเก็บ axis
};

export default AxisScale;
