import styled, { keyframes } from 'styled-components';

const SkeletonLoader = () => {
  return (
    <ArticlItemSkeleton>
      <HeadlineSkeleton />
      <InfoContainerSkeleton>
        <AuthorSkeleton />
        <PublishedDateSkeleton />
      </InfoContainerSkeleton>
    </ArticlItemSkeleton>
  );
};

export default SkeletonLoader;

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const ArticlItemSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.white};
  padding: 10px 20px;
  border-radius: 8px;
  gap: 8px;
  animation: pulse 1.5s ease-in-out infinite;
`;

const HeadlineSkeleton = styled.div`
  height: 20px;
  background-color: #e0e0e0;
  width: 70%;
  border-radius: 4px;
`;

const InfoContainerSkeleton = styled.div`
  justify-content: start;
  display: flex;
  justify-content: space-between;
`;

const AuthorSkeleton = styled.div`
  height: 15px;
  background-color: #e0e0e0;
  width: 30%;
  border-radius: 4px;
`;

const PublishedDateSkeleton = styled.div`
  height: 15px;
  background-color: #e0e0e0;
  width: 20%;
  margin-left: 10px;
  border-radius: 4px;
`;
