type CountryName =
  | "Bangladesh"
  | "Brazil"
  | "China"
  | "France"
  | "Germany"
  | "Indonesia"
  | "India"
  | "Italy"
  | "Japan"
  | "Russia"
  | "United Kingdom"
  | "United States";

export type DataCountry = {
  [year: number]: {
    amount: number;
  };
};

export type CountryListData = Partial<Record<CountryName, DataCountry[]>>;
