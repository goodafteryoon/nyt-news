import { useState } from 'react';
import styled from 'styled-components';

import { useScrapped } from 'context/ScrapContext';
import FilterHeader from 'components/FilterHeader';
import FilterModal from 'components/FilterModal';
import ArticleList from 'components/ArticleList';

const HEADER_HEIGHT = '60px';

const Scrap = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { scrapArticles } = useScrapped();

  const noScrapped = scrapArticles.length === 0;
  const scrapped = scrapArticles.length > 0;

  return (
    <>
      {noScrapped && <div>스크랩한 기사가 없습니다.</div>}
      {scrapped && (
        <>
          <FilterHeader onOpenModal={() => setIsModalOpen(true)} />
          <ContentWrapper>
            <ArticleList staticArticles={scrapArticles} />
          </ContentWrapper>
          <FilterModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </>
      )}
    </>
  );
};

export default Scrap;

const ContentWrapper = styled.div`
  padding-top: ${HEADER_HEIGHT};
`;
