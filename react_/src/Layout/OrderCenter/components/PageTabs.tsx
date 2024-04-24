import { Column, Row } from '@/components/flex';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';
interface TabsItem {
  title: string
  path: string
}
const TabsContainer = styled(Row)`
  width: 100%;
  height: 50rem;
  .items-view{
    width: 100%;
    position: relative;
    padding-bottom: 4rem;
  }
`;

interface ItemViewContainerProps {
  active: boolean
}
const ItemViewContainer = styled(Column)<ItemViewContainerProps>`
  width: 83rem;
  position: relative;

  .name{
    font-size: 27rem;
    color: ${({ active }) => active ? '#000' : '#868d9a'};
    font-weight: ${({ active }) => active ? 'bold' : 'normal'};
    transition: color 0.3s;
  }

  &:nth-child(1):after {
    content: "";
    height: 20rem;
    position: absolute;
    right: 0;
    border-right: 1px solid #000 !important;
  }
`;
const tabsItems: TabsItem[] = [
  {
    title: '买币',
    path: '/orderCenter/buy'
  },
  {
    title: '卖币',
    path: '/orderCenter/sell'
  }
];

interface ItemViewProps {
  item: TabsItem
  index: number
  acitveIndex: number
  handleClick: (left: number, path: string, now?: boolean) => void
}
const ItemView: React.FC<ItemViewProps> = ({ item, index, acitveIndex, handleClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const handleClickItem = (now?: boolean) => {
    if (!ref || !ref.current) return;

    const left = ref.current.offsetLeft;
    const { path } = item;

    handleClick(left, path, now);
  };

  useEffect(() => {
    if (!ref.current) return;
    if (acitveIndex === index) { handleClickItem(true); }
  }, []);

  return (
    <ItemViewContainer active={acitveIndex === index} className='item-view' justify='center' align='center' key={index} onClick={() => { handleClickItem(); }} iRef={ref}>
      <div className="name">
        {item.title}
      </div>
    </ItemViewContainer>
  );
};
const Tabs = () => {
  const nav = useNavigate();
  const loc = useLocation();
  const acitveIndex = useMemo(() => tabsItems.findIndex(item => item.path === loc.pathname), [loc.pathname]);
  const handleClick = useCallback((left: number, path: string, now?: boolean) => {
    const { pathname } = loc;

    if (pathname !== path) {
      nav(path, { replace: true });
    }
  }, [loc.pathname]);
  
  return (
    <TabsContainer justify='center' align='center'>
      <Row justify='flex-start' align='center' className='items-view'>
        {
          tabsItems.map((item, index) => (
            <ItemView item={item} index={index} acitveIndex={acitveIndex} handleClick={handleClick} key={index}/>
          ))
        }
      </Row>
    </TabsContainer>
  );
};

export default Tabs;
