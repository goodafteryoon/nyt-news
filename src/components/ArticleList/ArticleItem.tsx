import styled from 'styled-components';

import { theme } from 'styles/theme';
import { Article } from 'models/article';
import { formatDateForApi, formatDateForDisplayArticle } from 'utils/date';
import StarIcon from 'assets/imageComponents/StarIcon';

interface AritcleItemProps {
  article: Article;
}

const ArticleItem = ({ article }: AritcleItemProps) => {
  return (
    <ArticlItem>
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
  );
};

export default ArticleItem;

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
