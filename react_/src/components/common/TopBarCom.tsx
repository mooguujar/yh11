import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Column } from '@/components/flex';
import { styled } from 'styled-components';
import MyImg from '@/components/MyImg';
// import { spriteHomeCss } from '@/components/Sprite';
/* 精灵图 */
// ${spriteHomeCss as any}

import ISprite from '@/components/ISprite';

// import Tabs from './components/PageTabs';

const BarCenterContainer = styled(Column)`
  width: 100%;
  background-color: #fff;
  overflow: auto;
  
  .top-bar-container {
    position: relative;
    width: 100%;
    height: 160rem;
    flex: 0 0 160rem;
    padding: 0 30rem 22rem;
    box-sizing: border-box;
    background-color: #0b75ff;
  }
  .top-bar-back{
    position: absolute;
    top: 45rem;
    left: 25rem;
    z-index: 10;
  }

  .top-bar-title {
    width: 100%;
    text-align: center;
    color: white;
    font-size: 44rem;
    position: absolute;
    top: 30rem;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
  }

  .container {
    width: 100%;
    height: 90rem;
  }
`;

const topBarItemList = [
  {
    src: '',
    routePath: '/crypto',
    className: 'icon-home-logo',
    text: '买币'
  }
];
const TopbarData = {
  // 固定宽高放大
  url: '/sprites/common/sprite-common.png',
  backgroundSize: [184, 159],
  originSize: 0.69,
  size: [23, 38],
  pos: [-81, -83]
};

const CenterLayout = () => {
  const navigate = useNavigate();
  const to = (path: string) => { navigate(path); };

  return (
    <BarCenterContainer className='BarCenterContainer' justify="flex-start" align="center">
      <div className='top-bar-back' onClick={() => { to('/home'); }}>
        <ISprite {...TopbarData} />
      </div>
      <div className="top-bar-container">

        <div className="container">
          {
            topBarItemList.map((item) => {
              return (
                item.text
                  ? <div className="top-bar-title" key={item.className}>
                    {item.text}
                  </div>
                  : <MyImg
                    key={item.src}
                    className={item.className}
                    src={item.src}
                    onClick={() => { to(item.routePath); }}
                    webp
                  />
              );
            })
          }
        </div>
        
      </div>
    </BarCenterContainer>
  );
};

export default CenterLayout;
