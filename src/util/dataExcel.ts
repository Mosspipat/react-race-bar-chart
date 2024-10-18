import Papa from "papaparse";
import { CountryPopulation } from "../data/population";
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

type CountryStoreData = {
  amount: number;
  year?: number;
};

type CountryListData = Record<string, CountryStoreData[]>;

const testData: CountryListData = {
  ACountry: [
    {
      year: 2020,
      amount: 1,
    },
    {
      year: 2021,
      amount: 2,
    },
    {
      year: 2022,
      amount: 3,
    },
  ],
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
    .reduce((acc, country) => {
      const countryName = country["Country name"];

      // Initialize the country name key if it doesn't exist
      if (!acc[countryName]) {
        acc[countryName] = [];
      }

      // Push the current country's amount and year into the array
      acc[countryName].push({
        amount: Number(country.Population),
        year: Number(country.Year),
      });

      return acc;
    }, {});

  console.log(filterCountry);

  return filterCountry;
};
