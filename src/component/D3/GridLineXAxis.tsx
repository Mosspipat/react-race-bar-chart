import { forwardRef, useRef, useEffect, useState, useContext } from "react";
import * as d3 from "d3";
import { BarChartContext } from "../../context/BarChartContextProvider";
import { BarChartValueContext } from "../../context/BarChartValueContextProvider";

interface SizeBar {
  width: number;
  height: number;
}

const GridLineXAxis = forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>((props, ref) => {
  const { sizeBarChartRace } = useContext(BarChartContext);
  const { TopAmountPopulation } = useContext(BarChartValueContext);

  const svgRef = useRef<SVGSVGElement | null>(null);

  const [scaleWidthData, setScaleWidthData] = useState<number[]>([
    0,
    TopAmountPopulation,
  ]);

  useEffect(() => {
    setScaleWidthData([0, TopAmountPopulation]);
  }, [TopAmountPopulation]);

  const [sizeBar, setSizeBar] = useState<SizeBar>({ width: 0, height: 0 });

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

    const x = d3
      .scaleLinear()
      .domain(scaleWidthData)
      .range([0, sizeBar.width - marginRight]);

    const xAxis = d3
      .axisTop(x)
      .tickSize(-sizeBar.height + marginTop + marginBottom)
      .ticks(4);

    const xAxisGroup = svg
      .selectAll(".x-axis")
      .data([null])
      .join("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${marginTop})`)
      .style("font-size", "16px")
      .style("font-weight", "600")
      .style("fill", "red");

    xAxisGroup
      .transition()
      .ease(d3.easeCubic)
      .call(xAxis as never);

    xAxisGroup
      .call((g) => g.select(".domain").remove())
      .call((g) => g.selectAll(".tick line").attr("stroke", "#a5a5a5"))
      .call((g) => g.selectAll(".tick text").attr("fill", "#a5a5a5"))
      .call((g) => g.selectAll(".tick text").attr("dx", "0.2em"));
  }, [scaleWidthData, sizeBar.height, sizeBar.width]);

  return (
    <div ref={ref} {...props}>
      <svg
        ref={svgRef}
        width={sizeBar.width}
        height={sizeBar.height}
        className="absolute -top-12"
      />
    </div>
  );
});

export default GridLineXAxis;
