import { Outlet } from 'react-router-dom';
import { Column } from '@/components/flex';
import { styled } from 'styled-components';
const IframeContainer = styled(Column)`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
`;
const ContentView = styled(Column)`
  width: 100%;
  flex: 1;
`;
const Iframe = () => {
  return (
    <IframeContainer justify="flex-start" align="center">
      <ContentView>
        <Outlet />
      </ContentView>
    </IframeContainer>
  );
};

export default Iframe;
