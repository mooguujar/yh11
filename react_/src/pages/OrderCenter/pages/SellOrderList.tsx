import { useState } from 'react';
import { styled } from 'styled-components';
import { Column } from '@/components/flex';
import Tabs from '../components/Tabs';
import ReactPullToRefresh from 'react-pull-to-refresh';

import EmptyStamp from '../EmptyStamp';

const SellListContent = styled(Column)`
  width: 100%;
`;

// 模拟异步请求
async function getData(throwError?: any) {
  return new Promise<number[]>((resolve, reject) => {
    setTimeout(() => {
      if (throwError) {
        reject(new Error('error'));
      }

      resolve([]);
      // resolve(Array.from({ length: 10 }, (_, i) => i));
    }, 2000);
  });
}

const PullRefreshList = () => {
  const [list, setList] = useState<number[]>([]);
  const [finished, setFinished] = useState<boolean>(false);

  const onLoadRefresh = async (isRefresh?: any) => {
    const data = await getData();

    setList(v => {
      const newList = isRefresh ? data : [...v, ...data];

      setFinished(true);

      return newList;
    });
  };

  const onRefresh = async () => {
    setFinished(false);
    await onLoadRefresh(1);
  };

  return (
    <ReactPullToRefresh onRefresh={onRefresh} className="pull-list" style={{ textAlign: 'center' }}>
      {
        list?.length > 0
          ? <div>list</div>
          : <EmptyStamp />
      }
    </ReactPullToRefresh>
  );
};

const SellList = () => {
  return (<SellListContent>
    <Tabs />
    <PullRefreshList />
  </SellListContent>);
};

export default SellList;
