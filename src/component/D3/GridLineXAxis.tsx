import { forwardRef, useRef, useEffect, useState, useContext } from "react";
import * as d3 from "d3";
import { BarChartContext } from "../../context/BarChartContextProvider";
import { BarChartValueContext } from "../../context/BarChartValueContextProvider";

const GridLineXAxis = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => {
    const { sizeBarChartRace } = useContext(BarChartContext);
    const { TopAmountPopulation, BottomAmountPopulation } =
      useContext(BarChartValueContext);

    const svgRef = useRef<SVGSVGElement | null>(null);

    const [scaleWidthData, setScaleWidthData] = useState([
      0,
      TopAmountPopulation,
    ]); // Initial x-axis domain

    useEffect(() => {
      console.log({ TopAmountPopulation, BottomAmountPopulation });
      setScaleWidthData([0, TopAmountPopulation]);
    }, [TopAmountPopulation, BottomAmountPopulation]);

    const [sizeBar, setSizeBar] = useState({ width: 0, height: 0 });

    useEffect(() => {
      setSizeBar({
        width: sizeBarChartRace.width,
        height: sizeBarChartRace.height * 1.1,
      });
    }, [sizeBarChartRace]);

    const marginTop = 40;
    const marginRight = 20;
    const marginBottom = 20;

    console.log(scaleWidthData);

    useEffect(() => {
      const svg = d3.select(svgRef.current);

      // Create the x (horizontal) scale with a linear scale
      const x = d3
        .scaleLinear()
        .domain(scaleWidthData) // Use data as the domain
        .range([0, sizeBar.width - marginRight]);

      // Create the x-axis with grid lines
      const xAxis = d3
        .axisTop(x)
        .tickSize(-sizeBar.height + marginTop + marginBottom)
        .ticks(4);

      // Select the x-axis group
      const xAxisGroup = svg
        .selectAll(".x-axis")
        .data([null])
        .style("font-size", "16px") // Set font size
        .style("font-weight", "600") // Change to semi-bold (600)
        .style("fill", "red"); // Set font color here (black)

      const xAxisEnter = xAxisGroup
        .enter()
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${marginTop})`);

      // Update selection: update the axis
      xAxisGroup
        .merge(xAxisEnter)
        .transition() // Apply transition
        // .duration(750) // Duration of the transition in milliseconds
        .ease(d3.easeCubic) // Easing function for smoothness
        .call(xAxis); // Update axis with new scale

      // Remove the domain line and style the ticks
      xAxisGroup
        .merge(xAxisEnter)
        .call((g) => g.select(".domain").remove()) // Remove domain line
        .call((g) => g.selectAll(".tick line").attr("stroke", "#a5a5a5"))
        .call((g) => g.selectAll(".tick text").attr("fill", "#a5a5a5"));

      xAxisGroup
        .merge(xAxisEnter)
        .call((g) => g.selectAll(".tick text").attr("dx", "0.2em")); // ขยับข้อความไปทางขวา
    }, [scaleWidthData, sizeBar.height, sizeBar.width]); // Re-run the effect when `data` changes

    return (
      <div ref={ref} {...props}>
        <svg
          ref={svgRef}
          width={sizeBar.width}
          height={sizeBar.height}
          className="absolute  -top-12 "
        ></svg>
      </div>
    );
  }
);

export default GridLineXAxis;
