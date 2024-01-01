import { useState } from 'react';
import styled from 'styled-components';

import ArticleList from 'components/ArticleList';
import FilterHeader from 'components/FilterHeader';
import FilterModal from 'components/FilterModal';

const HEADER_HEIGHT = '60px';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <FilterHeader onOpenModal={() => setIsModalOpen(true)} />
      <ContentWrapper>
        <ArticleList />
      </ContentWrapper>
      <FilterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Home;

const ContentWrapper = styled.div`
  padding-top: ${HEADER_HEIGHT};
`;
