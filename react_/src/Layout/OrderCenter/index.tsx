import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Column } from '@/components/flex';
import { styled } from 'styled-components';
import MyImg from '@/components/MyImg';
import Tabs from './components/PageTabs';

const OrderCenterContainer = styled(Column)`
  width: 100%;
  height: 100%;
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

const OrderCenterContent = styled(Column)`
  width: 100%;
  border-top-left-radius: 30rem;
  border-top-right-radius: 30rem;
  background-color: #fff;
  margin-top: -50rem;
  position: relative;
  z-index: 1;
  padding: 10rem 10rem;
`;

const topBarItemList = [
  {
    src: '',
    routePath: '/orderCenter',
    className: 'icon-home-logo',
    text: '訂單中心'
  }
];

const OrderCenterTopBar = () => {
  const navigate = useNavigate();
  const to = (path: string) => { navigate(path); };

  return (
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
  );
};

const OrderCenterLayout = () => {
  return (
    <OrderCenterContainer justify="flex-start" align="center">
      <div className="top-bar-container">
        <OrderCenterTopBar />
      </div>
      <OrderCenterContent>
        <Tabs />
        <Outlet />
      </OrderCenterContent>
    </OrderCenterContainer>
  );
};

export default OrderCenterLayout;
