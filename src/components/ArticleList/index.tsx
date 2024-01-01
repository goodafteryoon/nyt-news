import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

import { Article } from 'models/article';
import ArticleItem from 'components/ArticleList/ArticleItem';
import SkeletonLoader from './SkeletonLoader';
import useArticlesQuery, {
  FetchArticlesFunction,
} from 'hooks/query/useArticlesQuery';

interface ArticleListProps {
  fetchArticles?: FetchArticlesFunction;
  staticArticles?: Article[];
}

const ArticleList = ({ fetchArticles, staticArticles }: ArticleListProps) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useArticlesQuery(fetchArticles);

  const { ref, inView } = useInView();

  const articlesToShow =
    staticArticles || data?.pages.flatMap((group) => group);

  useEffect(() => {
    if (!staticArticles && inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, staticArticles]);

  return (
    <ArticleContainer>
      {articlesToShow?.map((article: Article) => (
        <ArticleItem key={article._id} article={article} />
      ))}
      {isLoading && <SkeletonLoader />}
      {!staticArticles && hasNextPage && (
        <div ref={ref}>{isFetchingNextPage && <SkeletonLoader />}</div>
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
