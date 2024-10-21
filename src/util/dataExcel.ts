import Papa from "papaparse";
import { CountryData } from "../type/excel";

export const callDataExcel = async (): Promise<any[]> => {
  // CSV file in the public directory
  const fileUrl = "/population-and-demography.csv"; // Just use the relative path

  return await fetch(fileUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text(); // Get CSV data as text
    })
    .then((csvData) => {
      return Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
      }).data;
    })
    .catch((error) => {
      console.error("Error fetching CSV:", error);
      return [];
    });
};

type CountryAccumulator = {
  [countryName: string]: CountryData;
};

export const filterData = ({
  data,
  nameCountryList,
}: // keyToStore,
{
  data: CountryData[];
  nameCountryList: string[];
  // keyToStore: string;
}) => {
  const filterCountry = data
    .filter((country) => nameCountryList.includes(country["Country name"]))
    .reduce<CountryAccumulator>((acc, country) => {
      const countryName = country["Country name"];

      // Initialize the country object if it doesn't exist
      acc[countryName] = acc[countryName] || {};

      // Check if Year and Population are valid before adding to the accumulator
      const year = country.Year;
      const population = country.Population;

      // Check if Year and Population exist before adding to the accumulator
      if (
        year &&
        typeof year === "string" &&
        population &&
        !isNaN(Number(population))
      ) {
        acc[countryName][year] = { amount: Number(population) };
      }

      // // Push the current country's amount and year into the array
      // acc[countryName].push({
      //   [Number(country.Year)]: {
      //     amount: Number(country.Population),
      //   },
      // });

      return acc;
    }, {});

  return filterCountry;
};
