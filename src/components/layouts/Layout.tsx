import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

import BottomNavigation from 'components/BottomNavigation';

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
  padding-bottom: 85px;
  /* overflow: scroll; */
`;
