import { create } from 'zustand';

import { FiltersState } from 'store/articleFilter/type';

interface FilterStore {
  filters: FiltersState;
  setFilters: (newFilters: FiltersState) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filters: {
    searchTerm: '',
    selectedDate: null,
    selectedCountries: [],
  },
  setFilters: (newFilters) => set(() => ({ filters: newFilters })),
}));
