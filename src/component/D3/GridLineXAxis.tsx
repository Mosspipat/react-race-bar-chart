import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const SampleD3Chart = () => {
  const width = 640;
  const height = 200;
  const marginTop = 40;
  const marginRight = 20;
  const marginBottom = 20;
  const marginLeft = 40;

  const svgRef = useRef();
  const [data, setData] = useState([1000, 1000000]); // Initial x-axis domain
  console.log("🚀: ~ data:", data);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Create the x (horizontal) scale with a linear scale
    const x = d3
      .scaleLinear()
      .domain(data) // Use data as the domain
      .range([marginLeft, width - marginRight]);

    // Create the x-axis with grid lines
    const xAxis = d3.axisTop(x).tickSize(-height + marginTop + marginBottom);

    // Select the x-axis group
    const xAxisGroup = svg.selectAll(".x-axis").data([null]);

    // Enter selection: create new axis if it doesn't exist
    const xAxisEnter = xAxisGroup
      .enter()
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${marginTop})`);

    // Update selection: update the axis
    xAxisGroup
      .merge(xAxisEnter)
      .transition() // Apply transition
      .duration(750) // Duration of the transition in milliseconds
      .ease(d3.easeCubic) // Easing function for smoothness
      .call(xAxis); // Update axis with new scale

    // Remove the domain line and style the ticks
    xAxisGroup
      .merge(xAxisEnter)
      .call((g) => g.select(".domain").remove()) // Remove domain line
      .call((g) => g.selectAll(".tick line").attr("stroke", "#ccc"))
      .call((g) => g.selectAll(".tick text").attr("fill", "#000"));
  }, [data]); // Re-run the effect when `data` changes

  // Function to update the data (and trigger the transition)
  const updateData = () => {
    setData((pre) =>
      pre.map((element) => {
        return element + 10000;
      })
    );
  };

  return (
    <div>
      <button onClick={updateData}>Update Data</button>
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  );
};

export default SampleD3Chart;
