import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

import { theme } from 'styles/theme';
import HomeTabIcon from 'assets/imageComponents/HomeTabIcon';
import ScrapTabIcon from 'assets/imageComponents/ScrapTabIcon';
import { PATHS } from 'constants/routesPath';

const BottomNavigation = () => {
  const { pathname } = useLocation();

  const isActive = (route: string) => pathname === route;

  return (
    <Wrapper>
      <Container>
        <Tab>
          <LinkTab to={PATHS.HOME}>
            <HomeTabIcon
              color={
                isActive(PATHS.HOME)
                  ? theme.colors.white
                  : theme.colors.darkGray
              }
            />
            <TabLabel $isActive={isActive(PATHS.HOME)}>홈</TabLabel>
          </LinkTab>
        </Tab>
        <Tab>
          <LinkTab to={PATHS.SCRAP}>
            <ScrapTabIcon
              color={
                isActive(PATHS.SCRAP)
                  ? theme.colors.white
                  : theme.colors.darkGray
              }
            />
            <TabLabel $isActive={isActive(PATHS.SCRAP)}>스크랩</TabLabel>
          </LinkTab>
        </Tab>
      </Container>
    </Wrapper>
  );
};

export default BottomNavigation;

const Wrapper = styled.nav`
  height: 85px;
  background-color: ${(props) => props.theme.colors.black};
  font-size: 10px;
  font-weight: 600;
  line-height: 12px;
  border-radius: 30px 30px 0 0;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  padding: 0px 80px;
  width: 100%;
  max-width: 560px;
`;

const Container = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Tab = styled.li`
  height: 100%;
`;

const LinkTab = styled(Link)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 9px;
`;

const TabLabel = styled.span<{ $isActive: boolean }>`
  color: ${({ $isActive }) =>
    $isActive ? theme.colors.white : theme.colors.darkGray};
`;
