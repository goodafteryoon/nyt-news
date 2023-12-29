import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

import BottomNavigation from 'components/BottomNavigation';

const BOTTOM_NAVIGATION_HEIGHT = '85px';

const Layout = () => {
  return (
    <Container>
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
      <BottomNavigation />
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  max-width: 560px;
  height: 100vh;
  margin: 0 auto;
  background-color: ${(props) => props.theme.colors.background};
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  height: calc(100% - ${BOTTOM_NAVIGATION_HEIGHT});
  padding-bottom: ${BOTTOM_NAVIGATION_HEIGHT};
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;
