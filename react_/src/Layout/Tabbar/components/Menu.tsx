import { Column, Row } from '@/components/flex';
import { useLocation, useNavigate } from 'react-router';
import styled from 'styled-components';
import MyImg from '@/components/MyImg';
import ISprite, { ISpriteProps } from '@/components/ISprite';

const TabbarMenu = styled( Row )`
  width: 100%;
  height: 128rem;
  .tabbar-title {
    margin-top: 2rem;
  }
  .tabbar-scan {
    width: 118rem;
    height: 118rem;
  }
`;
const menuList = [
  {
    title: '首页',
    icon: '/files/tabbar/tabbar-home.png',
    path: '/home',
    className: 'tabbar-home',
    cssProps: {
      url: '/sprites/home/sprite-home.png',
      backgroundSize: [323, 261],
      originSize: [54, 54],
      size: [32, 34],
      pos: [-59, -61]
    },
    activeCssProps: {
      url: '/sprites/home/sprite-home.png',
      backgroundSize: [323, 261],
      originSize: [54, 54],
      size: [32, 34],
      pos: [0, -61]
    }
  },
  {
    title: '积分',
    icon: '/files/tabbar/tabbar-points.png',
    path: '/point',
    className: 'tabbar-points',
    cssProps: {
      url: '/sprites/home/sprite-home.png',
      backgroundSize: [323, 261],
      originSize: [53, 48],
      size: [37, 33],
      pos: [-118, -122]
    },
    activeCssProps: {
      url: '/sprites/home/sprite-home.png',
      backgroundSize: [323, 261],
      originSize: [54, 54],
      size: [37, 33],
      pos: [0, -138]
    }
  },
  {
    title: '',
    icon: '/files/tabbar/tabbar-scan.png',
    path: '/scan',
    className: 'tabbar-scan'
  },
  {
    title: '订单',
    icon: '/files/tabbar/tabbar-order.png',
    path: '/orderCenter/buy',
    className: 'tabbar-order',
    cssProps: {
      url: '/sprites/home/sprite-home.png',
      backgroundSize: [323, 261],
      originSize: [48, 48],
      size: [33, 33],
      pos: [0, -179]
    },
    activeCssProps: {
      url: '/sprites/home/sprite-home.png',
      backgroundSize: [323, 261],
      originSize: [54, 54],
      size: [33, 33],
      pos: [-128, -59]
    }
  },
  {
    title: '我的',
    icon: '/files/tabbar/tabbar-mine.png',
    path: '/mine',
    className: 'tabbar-mine',
    cssProps: {
      url: '/sprites/home/sprite-home.png',
      backgroundSize: [323, 261],
      originSize: [48, 48],
      size: [33, 34],
      pos: [-187, -103]
    },
    activeCssProps: {
      url: '/sprites/home/sprite-home.png',
      backgroundSize: [323, 261],
      originSize: [54, 54],
      size: [33, 34],
      pos: [-128, 0]
    }
  }
];
const Menu = () => {
  // 使用路由钩子
  const navigate = useNavigate();
  const location = useLocation();
  // const [selectKey, setSelectKey] = useState('/home');
  // const selectKey = location.pathname;
  const handleMenuClick = ( path: string ) => {
    if ( location.pathname === path ) return;
  
    navigate( path );
    // setSelectKey( path );
  };
  
  return (
    <TabbarMenu justify='space-around' align='center'>
      {
        menuList.map( item => {
          const isActive = item.path === location.pathname;
          
          let className;
          let cssProps: ISpriteProps;

          if (isActive) {
            className = `${item.className}-active`;
            cssProps = item.activeCssProps as ISpriteProps;
          } else {
            className = item.className.replace(/-active/g, '');
            cssProps = item.cssProps as ISpriteProps;
          }
          
          return (
            <Column key={item.path} onClick={() => { handleMenuClick( item.path ); }}>
              {
                item.path === '/scan'
                  ? <MyImg src={item.icon} className={item.className} loading={false} />
                  : <ISprite {...cssProps} />
              }
              <div className='tabbar-title'>{item.title}</div>
            </Column>
          );
        } )
      }
    </TabbarMenu>
  );
};

export default Menu;
