import { Outlet, useLocation } from 'react-router-dom';
import { Column } from '@/components/flex';
import { styled } from 'styled-components';
import CallService from './components/CallService';
import LogoView from './components/LogoView';
import Tabs from './components/Tabs';
// import KeepAlive from 'react-activation';
// import './index.css';
const AuthContainer = styled(Column)`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
`;
const ContentView = styled(Column)`
  width: 100%;
  flex: 1;
`;
const Auth = () => {
  return (
    <AuthContainer justify="flex-start" align="center">
      <ContentView>
        <CallService />
        <LogoView />
        <Tabs />
        {/* <KeepAlive style={{
          flex: 1,
          width: '100%'

        }}
        id={loc.pathname} > */}
        {/* <IKeepAlive id={loc.pathname} > */}
        <Outlet />
        {/* </IKeepAlive> */}
        {/* </KeepAlive> */}
      </ContentView>
    </AuthContainer>
  );
};

export default Auth;
