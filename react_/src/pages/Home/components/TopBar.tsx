import React, { Fragment } from 'react';
import { Column, Row } from '@/components/flex';
import { styled } from 'styled-components';
import MyImg from '@/components/MyImg';
import { useNavigate } from 'react-router-dom';
import ISprite from '@/components/ISprite';
export const TopBarContentView = styled(Row)`
  position: relative;
  width: 100%;
  height: 90rem;
  .logo-container {
    position: absolute;
    top: 35rem;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text-logo {
      margin-left: 16rem;
      font-size: 42rem;
      color: #fff;
    }
  }
  .icon-help {
    margin: 0 auto;
    margin-right: 28rem;
  }
  .icon-message {
    margin-bottom: -3rem;
  }
`;

const topBarItemList = [
  {
    // src: '/files/home/customer-service.png',
    routePath: '/linkPage/customerService',
    className: 'icon-customer-service',
    cssProps: {
      url: '/sprites/home/sprite-home.png',
      backgroundSize: [323, 261],
      originSize: [54, 48],
      size: [38, 34],
      pos: [-59, -120]
    }
  },
  {
    // src: '/files/home/homeLogo.png',
    routePath: '',
    className: 'logo-container',
    title: 'GDPAY',
    cssProps: {
      url: '/sprites/home/sprite-home.png',
      backgroundSize: [323, 261],
      originSize: [64, 56],
      size: [44, 39],
      pos: [0, 0]
    }
  },
  {
    // src: '/files/home/help.png',
    routePath: '/linkPage/tutorial',
    className: 'icon-help',
    cssProps: {
      url: '/sprites/home/sprite-home.png',
      backgroundSize: [323, 261],
      originSize: [48, 48],
      size: [33, 33],
      pos: [-187, -55]
    }
  },
  {
    // src: '/files/home/message.png',
    routePath: '/message',
    className: 'icon-message',
    cssProps: {
      url: '/sprites/home/sprite-home.png',
      backgroundSize: [323, 261],
      originSize: [54, 54],
      size: [38, 38],
      pos: [-69, 0]
    }
  }
];

const TopBar = () => {
  const navigate = useNavigate();
  const to = (path: string) => { navigate(path); };

  return (
    <TopBarContentView justify="space-between" align="flex-end">
      {
        topBarItemList.map((item, index) => {
          return (
            <div
              key={index}
              className={item.className}
              onClick={() => { to(item.routePath); }}
            >
              <ISprite {...item.cssProps} />
              {
                item.title && <div className='text-logo'>GDPAY</div>
              }
            </div>
          );
        })
      }
    </TopBarContentView>
  );
};

export default TopBar;
