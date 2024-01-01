import { useEffect } from 'react';
import styled from 'styled-components';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';

import { Article } from 'models/article';
import { formatDateForApi } from 'utils/date';
import { useFilterStore } from 'store/articleFilter';
import { fetchFilteredArticles } from 'api/SearchArticle';
import ArticleItem from 'components/ArticleList/ArticleItem';
import SkeletonLoader from './SkeletonLoader';

const ArticleList = () => {
  const { filters } = useFilterStore();
  const { selectedDate, searchTerm, selectedCountries } = filters;
  const formattedDate = selectedDate ? formatDateForApi(selectedDate) : '';

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['articles', { searchTerm, formattedDate, selectedCountries }],
    ({ pageParam = 0 }) =>
      fetchFilteredArticles({
        page: pageParam,
        countries: selectedCountries.map((c) => c.value),
        pubDate: formattedDate,
        headline: searchTerm,
      }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const currentPage = allPages.length;
        return currentPage;
      },
      retry: 3,
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 3,
      keepPreviousData: true,
    }
  );

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <ArticleContainer>
      {data?.pages
        .flatMap((group) => group)
        .map((article: Article) => (
          <ArticleItem key={article._id} article={article} />
        ))}
      {isLoading && <SkeletonLoader />}
      {hasNextPage && (
        <div ref={ref}>
          {isFetchingNextPage ? <SkeletonLoader /> : '더 보기'}
        </div>
      )}
    </ArticleContainer>
  );
};

export default ArticleList;

const ArticleContainer = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 20px;
  gap: 8px;
`;
