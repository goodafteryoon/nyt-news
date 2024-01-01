import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

import { Article } from 'models/article';
import ArticleItem from 'components/ArticleList/ArticleItem';
import SkeletonLoader from './SkeletonLoader';
import useArticlesQuery from 'hooks/query/useArticlesQuery';

const ArticleList = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useArticlesQuery();
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
