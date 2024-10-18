import Papa from "papaparse";

export const callDataExcel = () => {
  // CSV file in the public directory
  const fileUrl = "/population-and-demography.csv"; // Just use the relative path

  fetch(fileUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text(); // Get CSV data as text
    })
    .then((csvData) => {
      Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          console.log(result.data);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
    })
    .catch((error) => {
      console.error("Error fetching CSV:", error);
    });
};
