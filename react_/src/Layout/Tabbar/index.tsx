import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { Column } from '@/components/flex';
import Menu from './components/Menu';
import { spriteTabbarCss } from '@/components/Sprite';

interface Props {}
const TabbarView = styled( Column )`
  width: 100%;
  height: 100%;

  /* 精灵图 */
  ${spriteTabbarCss as any}
`;
const ContentView = styled( Column )`
  width: 100%;
  flex:1;
  overflow:hidden;
`;
const Tabbar = ( _props: Props ) => {
  return (
    <TabbarView justify='space-between' align='center'>
      <ContentView>
        <Outlet />
      </ContentView>
      <Menu />
    </TabbarView>
  );
};

export default Tabbar;
