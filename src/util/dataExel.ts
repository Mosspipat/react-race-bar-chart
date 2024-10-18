import Papa from "papaparse";

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
