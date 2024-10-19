import { useContext, useEffect, useRef } from "react";
import "./YearGrid.css"; // Import your custom CSS
import { LinearGaugeContext } from "../../../context/LinearGaugeProvider";

const YearGrid = () => {
  const { currentYear, setCurrentYear, isPlayGauge, setIsPlayGauge } =
    useContext(LinearGaugeContext);

  const timelineRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const currentYearRef = useRef<HTMLDivElement>(null);

  //timer every 1 sec selectedYear +1

  useEffect(() => {
    let timer: NodeJS.Timer;

    if (isPlayGauge) {
      timer = setInterval(() => {
        setCurrentYear((prev) => {
          const nextYear = prev + 1;
          if (nextYear > 2021) {
            clearInterval(timer); // Stop the timer when exceeding 2020
            return prev; // Return the previous value to prevent increment
          }
          return nextYear;
        });
      }, 200);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlayGauge, setCurrentYear]);

  useEffect(() => {
    if (indicatorRef.current) {
      const ticks = timelineRef?.current?.querySelectorAll("div.tick");

      // Find the div that contains the selected year
      const myLabelYear = Array.from(ticks).find(
        (tick) => tick.textContent.trim() === String(currentYear)
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
  }, [currentYear]);

  const years: number[] = [];
  for (let i = 1950; i <= 2020; i += 4) {
    years.push(i);
  }

  const YearLabel = ({ year }: { year: number }) => {
    const RenderYear = (year: number) => {
      const conditionRenderBar = () => {
        if (years.includes(year)) {
          return "bg-slate-500 w-1 h-3 z-30";
        } else {
          return "bg-slate-500 w-1 h-1 z-30";
        }
      };

      const conditionRenderLabel = () => {
        if (years.includes(year)) {
          return "opacity-100";
        } else {
          return "opacity-0";
        }
      };

      return (
        <div className="flex flex-col justify-center items-center ">
          <div className={conditionRenderBar()}></div>
          <div
            key={year}
            className={`tick absolute mt-10 ${conditionRenderLabel()} pointer-events-auto text-slate-600 font-semibold`}
          >
            {year}
          </div>
        </div>
      );
    };

    return (
      <div
        onClick={() => {
          setCurrentYear(() => {
            setIsPlayGauge(false);
            return year;
          });
        }}
      >
        {RenderYear(year)}
      </div>
    );
  };

  return (
    <div className="timeline-container border-t-2 border-t-slate-500">
      <div ref={timelineRef} className="timeline">
        {(() => {
          return Array.from({ length: 2022 - 1950 }, (_, index) => {
            const year = 1950 + index;
            return <YearLabel key={year} year={year} />;
          });
        })()}
      </div>
      <div ref={indicatorRef} className="indicator">
        ▲
      </div>
    </div>
  );
};

export default YearGrid;
