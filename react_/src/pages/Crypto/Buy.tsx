import { Column } from '@/components/flex';
import { styled } from 'styled-components';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import TopBar from '@/components/common/TopBarCom';
import Tabs from '@/components/common/Tabs';

import QuickBuyCrypto from './components/Quick';
import SelfSelectBuyCrypto from './components/SelfSelect';
interface Props { }
interface TabsItem {
  title: string
  path: string
}
const BuyCryptoHomeContainer = styled(Column)`
  width: 100%;
  height: 100%;
  background-color: #ebf1f6;
  overflow: auto;

  .CrypContainer{
    width: 100%;
    height: 100%;
    background-color: #ebf1f6;
    border-radius: 20px;
    margin-top: -15px;
    z-index: 1;

  }

`;

const tabsItems: TabsItem[] = [
  {
    title: '快捷买币',
    path: '1'
  },
  {
    title: '自选买币',
    path: '2'
  }
];

const parseQueryString = (url: string) => {
  const index = url.indexOf('?');
  const str = url.slice(index + 1);
  const arr = str.split('&');
  const obj: any = {};

  for (let i = 0; i < arr.length; i++) {
    const arr2 = arr[i].split('=');

    obj[arr2[0]] = arr2[1];
  }

  return obj;
};

const BuyCryptoHome = (props: any) => {
  const [acitveIndex, setAcitveIndex] = useState<number>(1);

  const efreshParent = (path: any) => {
    // console.log('path', path);
    setAcitveIndex(Number(path));
  };

  // const nav = useNavigate();
  // const loc = useLocation();
  // const { search, pathname } = loc;
  // const path = 'loc';

  // const BuyParm: any = parseQueryString(search);

  return (
    <BuyCryptoHomeContainer className="BuyCryptoHomeContainer1">
      <TopBar />
      <div className='CrypContainer'>
        <Tabs list={tabsItems} refreshParent={efreshParent} />
        {acitveIndex === 1 ? <QuickBuyCrypto /> : <SelfSelectBuyCrypto />}

      </div>
    </BuyCryptoHomeContainer>
  );
};

export default BuyCryptoHome;
