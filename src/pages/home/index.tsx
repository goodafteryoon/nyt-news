import FilterHeader from 'components/FilterHeader';
import FilterModal from 'components/FilterModal';
import { useState } from 'react';

interface FiltersState {
  searchTerm: string;
  selectedDate: string;
  selectedCountries: string[];
}

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<FiltersState>({
    searchTerm: '전체 헤드라인',
    selectedDate: '전체 날짜',
    selectedCountries: [],
  });

  const handleApplyFilter = (newFilters: FiltersState) => {
    setFilters(newFilters);
    setIsModalOpen(false);
  };

  return (
    <>
      <FilterHeader
        filters={filters}
        onOpenModal={() => setIsModalOpen(true)}
      />
      <div>Home page</div>
      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApplyFilter={handleApplyFilter}
      />
    </>
  );
};

export default Home;
