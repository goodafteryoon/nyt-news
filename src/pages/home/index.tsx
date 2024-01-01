import { useState } from 'react';
import styled from 'styled-components';

import ArticleList from 'components/ArticleList';
import FilterHeader from 'components/FilterHeader';
import FilterModal from 'components/FilterModal';
import { useFilterStore } from 'store/articleFilter';

const HEADER_HEIGHT = '60px';

const Home = () => {
  const { filters, setFilters } = useFilterStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <FilterHeader
        onOpenModal={() => setIsModalOpen(true)}
        filters={filters}
      />
      <ContentWrapper>
        <ArticleList />
      </ContentWrapper>
      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApplyFilters={setFilters}
      />
    </>
  );
};

export default Home;

const ContentWrapper = styled.div`
  padding-top: ${HEADER_HEIGHT};
`;
