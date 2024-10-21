import { forwardRef, useRef, useEffect, useState, useContext } from "react";
import * as d3 from "d3";
import { BarChartContext } from "../../context/BarChartContextProvider";
import { BarChartValueContext } from "../../context/BarChartValueContextProvider";

const GridLineXAxis = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => {
    const { sizeBarChartRace } = useContext(BarChartContext);
    const { TopAmountPopulation } = useContext(BarChartValueContext);

    const svgRef = useRef<SVGSVGElement | null>(null);

    const [scaleWidthData, setScaleWidthData] = useState([
      0,
      TopAmountPopulation,
    ]); // Initial x-axis domain

    useEffect(() => {
      setScaleWidthData([0, TopAmountPopulation]);
    }, [TopAmountPopulation]);

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
        .join("g") // Use join to handle the enter and update selections
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${marginTop})`)
        .style("font-size", "16px")
        .style("font-weight", "600")
        .style("fill", "red");

      // Update selection: update the axis
      xAxisGroup
        .transition() // Apply transition
        .ease(d3.easeCubic) // Easing function for smoothness
        .call(xAxis as never); // Update axis with new scale

      // Remove the domain line and style the ticks
      xAxisGroup
        .call((g) => g.select(".domain").remove()) // Remove domain line
        .call((g) => g.selectAll(".tick line").attr("stroke", "#a5a5a5"))
        .call((g) => g.selectAll(".tick text").attr("fill", "#a5a5a5"))
        .call((g) => g.selectAll(".tick text").attr("dx", "0.2em")); // Shift tick text right
    }, [scaleWidthData, sizeBar.height, sizeBar.width]); // Re-run the effect when dependencies change

    return (
      <div>
        <svg
          ref={(svgElement) => {
            svgRef.current = svgElement; // Assign svgRef current value
            if (typeof ref === "function") {
              ref(svgElement); // Forward ref to parent if it's a function
            } else if (ref) {
              ref.current = svgElement; // Assign ref if it's an object
            }
          }}
          width={sizeBar.width}
          height={sizeBar.height}
          className="absolute -top-12"
          {...props} // Spread remaining props to the svg element
        />
      </div>
    );
  }
);

export default GridLineXAxis;
