import { useEffect, useRef, useState } from "react";
import "./LinearGauge.css"; // Import your custom CSS

const LinearGauge = () => {
  const [selectedYear, setSelectedYear] = useState(1950);

  const timelineRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const currentYearRef = useRef<HTMLDivElement>(null);

  //function set current year

  useEffect(() => {
    if (indicatorRef.current) {
      const ticks = timelineRef?.current?.querySelectorAll("div.tick");

      // Find the div that contains the selected year
      const myLabelYear = Array.from(ticks).find(
        (tick) => tick.textContent.trim() === String(selectedYear)
      );

      if (myLabelYear) {
        currentYearRef.current = myLabelYear;

        // Get the bounding rectangle of the current year
        const { left, width } = currentYearRef.current.getBoundingClientRect();
        const timelineRect = timelineRef.current.getBoundingClientRect();

        // Calculate the left position based on the timeline's left position
        const leftPosition =
          left -
          timelineRect.left +
          width / 2 -
          indicatorRef.current.offsetWidth / 2;

        // Set the left style of the indicator
        indicatorRef.current.style.left = `${leftPosition}px`;
      } else {
        console.log("🚀: Year element not found.");
      }
    }
  }, [selectedYear]);

  function setCurrentYear(year: number) {
    setSelectedYear(year);
  }

  const years: number[] = [];
  for (let i = 1950; i <= 2020; i += 4) {
    years.push(i);
  }

  const YearLabelRender = ({ year }: { year: number }) => {
    const YearRender = (year: number) => {
      const conditionRenderBar = () => {
        if (years.includes(year)) {
          return "bg-slate-500 w-1 h-3 z-30";
        } else {
          return "bg-slate-500 w-1 h-1 z-30";
        }
      };

      return (
        <div className="flex flex-col justify-center items-center ">
          <div className={conditionRenderBar()}></div>
          {years.includes(year) && (
            <div
              key={year}
              className="tick absolute mt-10"
              // style={{
              //   fontWeight: year === selectedYear ? "bold" : "normal",
              // }}
            >
              {year}
            </div>
          )}
        </div>
      );
    };

    return (
      <div
        onClick={() => {
          setCurrentYear(year);
        }}
      >
        {YearRender(year)}
      </div>
    );
  };

  return (
    <div className="timeline-container border-t-2 border-t-slate-500">
      <div ref={timelineRef} className="timeline">
        {(() => {
          return Array.from({ length: (2020 - 1950) / 4 + 1 }, (_, index) => {
            const year = 1950 + index;
            return <YearLabelRender key={year} year={year} />;
          });
        })()}
        {/* {years.map((year) => (
          <div className="flex ">
            <div className="relative flex flex-col items-center ">
              <YearLabelRender year={year} />
            </div>
          </div>
        ))} */}
      </div>
      <div
        ref={indicatorRef}
        className="indicator"
        // style={{ left: `${((selectedYear - 1950) / 70) * 100}%` }}
      >
        ▲
      </div>
    </div>
  );
};

export default LinearGauge;
