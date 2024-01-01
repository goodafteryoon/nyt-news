import { useState } from 'react';
import styled from 'styled-components';

import { useScrapped } from 'context/ScrapContext';
import FilterHeader from 'components/FilterHeader';
import FilterModal from 'components/FilterModal';
import ArticleList from 'components/ArticleList';
import { FiltersState } from 'store/articleFilter/type';

const HEADER_HEIGHT = '60px';

const Scrap = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { scrapArticles } = useScrapped();
  const [localFilters, setLocalFilters] = useState<FiltersState>({
    searchTerm: '',
    selectedDate: null,
    selectedCountries: [],
  });

  const noScrapped = scrapArticles.length === 0;
  const scrapped = scrapArticles.length > 0;

  return (
    <>
      {noScrapped && <div>스크랩한 기사가 없습니다.</div>}
      {scrapped && (
        <>
          <FilterHeader
            onOpenModal={() => setIsModalOpen(true)}
            filters={localFilters}
          />
          <ContentWrapper>
            <ArticleList staticArticles={scrapArticles} />
          </ContentWrapper>
          <FilterModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onApplyFilters={setLocalFilters}
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
