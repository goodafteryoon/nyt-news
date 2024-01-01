import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { PATHS } from 'constants/routesPath';
import BaseButton from 'components/ui/BaseButton';
import ScrapPageIcon from 'assets/imageComponents/ScrapPageIcon';

const EmptyArticle = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <ScrapPageIcon />
      <Typo>저장된 스크랩이 없습니다.</Typo>
      <BaseButton
        onClick={() => navigate(PATHS.HOME)}
        buttonText='스크랩 하러 가기'
      />
    </Container>
  );
};

export default EmptyArticle;

const Container = styled.div`
  max-width: 560px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.background};
  overflow: hidden;
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
