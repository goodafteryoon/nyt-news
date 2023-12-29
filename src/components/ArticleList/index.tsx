import styled from 'styled-components';

import { formatDate } from 'utils/date';
import articles from 'mock/article.json';
import StarIcon from 'assets/imageComponents/StarIcon';
import { theme } from 'styles/theme';

const ArticleList = () => {
  const articleList = articles.response.docs;

  return (
    <ArticleContainer>
      {articleList.map((item) => (
        <Article key={item._id}>
          <HeadlineContainer>
            <Headline>{item.headline.main}</Headline>
            <button>
              <StarIcon color={theme.colors.darkGray} />
            </button>
          </HeadlineContainer>
          <InfoContainer>
            <Author>{item.byline.original?.replace(/^By /, '')}</Author>
            <PublishedDate>{formatDate(item.pub_date)}</PublishedDate>
          </InfoContainer>
        </Article>
      ))}
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

const Article = styled.li`
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
