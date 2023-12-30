export interface Country {
  name: string;
  value: string;
}
export interface FiltersState {
  searchTerm: string;
  selectedDate: Date | null;
  selectedCountries: Country[];
}
