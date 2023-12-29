import { useState } from 'react';
import styled from 'styled-components';

import ArticleList from 'components/ArticleList';
import FilterHeader from 'components/FilterHeader';
import FilterModal from 'components/FilterModal';

interface FiltersState {
  searchTerm: string;
  selectedDate: string;
  selectedCountries: string[];
}

const HEADER_HEIGHT = '60px';

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
      <ContentWrapper>
        <div>Home page</div>
        <ArticleList />
      </ContentWrapper>
      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApplyFilter={handleApplyFilter}
      />
    </>
  );
};

export default Home;

const ContentWrapper = styled.div`
  padding-top: ${HEADER_HEIGHT};
`;
