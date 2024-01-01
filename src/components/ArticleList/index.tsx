import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

import { Article } from 'models/article';
import ArticleItem from 'components/ArticleList/ArticleItem';
import SkeletonLoader from './SkeletonLoader';
import useArticlesQuery, {
  FetchArticlesFunction,
} from 'hooks/query/useArticlesQuery';
import BaseButton from 'components/ui/BaseButton';

interface ArticleListProps {
  fetchArticles?: FetchArticlesFunction;
  staticArticles?: Article[];
}

const ArticleList = ({ fetchArticles, staticArticles }: ArticleListProps) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
    refetch,
  } = useArticlesQuery(fetchArticles);

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
      {error ? (
        <ErrorContanier>
          <Typo>Too many 요청 에러 발생 💩</Typo>
          <BaseButton
            onClick={() => refetch}
            buttonText='잠시 후에 다시 시도해주세요'
          />
        </ErrorContanier>
      ) : (
        articlesToShow?.map((article: Article) => (
          <ArticleItem key={article._id} article={article} />
        ))
      )}
      {!staticArticles && isLoading && <SkeletonLoader />}
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

const ErrorContanier = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Typo = styled.p`
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: -0.9px;
  margin-top: 8px;
  margin-bottom: 1.25rem;
`;
