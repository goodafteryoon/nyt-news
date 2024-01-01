import { useState } from 'react';
import styled from 'styled-components';

import ArticleItem from 'components/ArticleList/ArticleItem';
import FilterHeader from 'components/FilterHeader';
import FilterModal from 'components/FilterModal';
import { useScrapped } from 'context/ScrapContext';

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
            {scrapArticles.map((article) => (
              <ArticleItem key={article._id} article={article} />
            ))}
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
