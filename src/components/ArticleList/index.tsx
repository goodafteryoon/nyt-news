import { useEffect } from 'react';
import styled from 'styled-components';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';

import { theme } from 'styles/theme';
import { Article } from 'models/article';
import { formatDateForApi, formatDateForDisplayArticle } from 'utils/date';
import StarIcon from 'assets/imageComponents/StarIcon';
import FilledStarIcon from 'assets/imageComponents/FilledStarIcon';
import { useFilterStore } from 'store/articleFilter';
import { fetchFilteredArticles } from 'api/SearchArticle/articles';

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
          <ArticlItem key={article._id}>
            <HeadlineContainer>
              <Headline>{article.headline.main}</Headline>
              <ScrapButton>
                <StarIcon color={theme.colors.darkGray} />
              </ScrapButton>
            </HeadlineContainer>
            <InfoContainer>
              <Author>{article.byline.original?.replace(/^By /, '')}</Author>
              <PublishedDate>
                {formatDateForDisplayArticle(article.pub_date)}
              </PublishedDate>
            </InfoContainer>
          </ArticlItem>
        ))}
      {hasNextPage && (
        <div ref={ref}>{isFetchingNextPage ? '로딩 중...' : '더 보기'}</div>
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

const ArticlItem = styled.li`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.white};
  padding: 10px 20px;
  border-radius: 8px;
  gap: 8px;
`;

const HeadlineContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Headline = styled.h2`
  max-width: 90%;
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: -0.9px;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Author = styled.span`
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
`;

const PublishedDate = styled.span`
  font-size: 13px;
  color: ${(props) => props.theme.colors.darkGray};
  font-weight: 400;
  line-height: 20px;
`;

const ScrapButton = styled.button``;
