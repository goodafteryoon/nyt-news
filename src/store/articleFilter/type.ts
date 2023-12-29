export interface Country {
  name: string;
  value: string;
}
export interface FiltersState {
  searchTerm: string;
  selectedDate: string;
  selectedCountries: Country[];
}
