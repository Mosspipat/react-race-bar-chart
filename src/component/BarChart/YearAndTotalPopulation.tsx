const YearAndTotalPopulation = ({
  year,
  totalPopulation,
}: {
  year: number;
  totalPopulation: number;
}) => {
  return (
    <div className="absolute right-0 bottom-0 flex flex-col items-end p-2  text-slate-500">
      <h1 className=" font-bold">{year}</h1>
      <p className=" font-semibold  text-2xl">
        <span className=" mr-2">Total:</span>
        {totalPopulation}
      </p>
    </div>
  );
};

export default YearAndTotalPopulation;
