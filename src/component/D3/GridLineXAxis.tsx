import { forwardRef, useRef, useEffect, useState, useContext } from "react";
import * as d3 from "d3";
import { BarChartContext } from "../../context/BarChartContextProvider";
import { BarChartValueContext } from "../../context/BarChartValueContextProvider";

const GridLineXAxis = forwardRef((props, ref) => {
  const { sizeBarChartRace } = useContext(BarChartContext);
  const { TopAmountPopulation, BottomAmountPopulation } =
    useContext(BarChartValueContext);

  const svgRef = useRef();
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
      height: sizeBarChartRace.height,
    });
  }, [sizeBarChartRace]);

  // const width = 1200;
  // const height = 800;
  const marginTop = 40;
  const marginRight = 20;
  const marginBottom = 20;
  const marginLeft = 40;

  // i want width and height ref
  // const maxWidthPopulationBar = ref.current?.getBoundingClientRect().width;
  // console.log("🚀: ~ widthRef:", maxWidthPopulationBar);
  // React.ForwardedRef<unknown>;
  // const heightRef = ref.current.height;

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
      .tickSize(-sizeBar.height + marginTop + marginBottom);

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
      // .duration(750) // Duration of the transition in milliseconds
      .ease(d3.easeCubic) // Easing function for smoothness
      .call(xAxis); // Update axis with new scale

    // Remove the domain line and style the ticks
    xAxisGroup
      .merge(xAxisEnter)
      .call((g) => g.select(".domain").remove()) // Remove domain line
      .call((g) => g.selectAll(".tick line").attr("stroke", "#ccc"))
      .call((g) => g.selectAll(".tick text").attr("fill", "#000"));
  }, [scaleWidthData]); // Re-run the effect when `data` changes

  // Function to update the data (and trigger the transition)
  const updateData = () => {
    setScaleWidthData((pre) =>
      pre.map((element) => {
        return element + 10000;
      })
    );
  };

  return (
    <div ref={ref}>
      {/* <button onClick={updateData}>Update Data</button> */}
      <svg
        ref={svgRef}
        width={sizeBar.width}
        height={sizeBar.height}
        className="absolute z-30 -top-14"
      ></svg>
    </div>
  );
});

export default GridLineXAxis;
