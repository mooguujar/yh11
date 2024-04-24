import { Column, Row } from '@/components/flex';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';
interface TabsItem {
  title: string
  path: string
}
interface propsList {
  list: TabsItem[]
  refreshParent: Function
}

const TabsContainer = styled(Row)`
  width: 100%;
  height: 50rem;
  margin-top: 20rem;
  .items-view{
    width: 100%;
    position: relative;
    padding-bottom: 4rem;
  }
`;

interface LineViewProps {
  active: number
}
const LineView = styled.div<LineViewProps>`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 40rem;
  height: 5rem;
  background-color: #0b75ff;
  border-radius: 2rem;
`;

interface ItemViewContainerProps {
  active: boolean
}
const ItemViewContainer = styled(Column) <ItemViewContainerProps>`
  padding: 0 15rem !important;
  .name{
    font-size: 27rem;
    color: ${({ active }) => active ? '#0b75ff' : '#868d9a'};
    font-weight: ${({ active }) => active ? 'bold' : 'normal'};
    padding-bottom: 12rem;
    transition: color 0.3s;
  }
`;

interface ItemViewProps {
  item: TabsItem
  index: number
  acitveIndex: number
  handleClick: (left: number, path: string, now?: boolean) => void
}

const ItemView: React.FC<ItemViewProps> = ({ item, index, acitveIndex, handleClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const acitveitem = useRef(acitveIndex);

  const handleClickItem = (now?: boolean) => {
    if (!ref || !ref.current) return;

    const left = ref.current.offsetLeft + 20;
    const { path } = item;

    handleClick(left, path, now);
  };

  useEffect(() => {
    if (!ref.current) return;
    if (acitveIndex === index) { handleClickItem(true); }
    // console.log('useEffecta0', acitveIndex, index);
  }, [acitveitem]);

  return (
    <ItemViewContainer active={acitveIndex === index} className='item-view' justify='center' align='center' key={index} onClick={() => { handleClickItem(); }} iRef={ref}>
      <div className="name">
        {item.title}
      </div>
    </ItemViewContainer>
  );
};
const Tabs = (props: propsList) => {
  const nav = useNavigate();
  const loc = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  // let acitveIndex = 0;
  const [acitveIndex, setAcitveIndex] = useState<number>(0);

  // const acitveIndex = useMemo(() => {
  //   const index = props.list.findIndex(item => item.path === loc.search);

  //   return index === -1 ? 0 : index;
  // }, [loc.search]);

  const handleClick = useCallback((left: number, path: string, now?: boolean) => {
    if (!ref || !ref.current) return;

    const oleft = ref.current.offsetLeft;
    const { pathname } = loc;

    ref.current.animate([
      { left: `${oleft}px` }, { left: `${left}px` }
    ], {
      duration: now ? 0 : 300,
      fill: 'forwards',
      easing: 'ease-in-out'
    });

    if (pathname !== path) {
      // nav(path, { replace: true });
      setAcitveIndex(Number(path) - 1);
      props.refreshParent(path);
    }
  }, [loc.pathname]);

  useEffect(() => {
    // console.log('acitveIndex000111', acitveIndex);
  }, [acitveIndex]);

  return (
    <TabsContainer justify='center' align='center'>
      <Row justify='flex-start' align='center' className='items-view' >
        {
          props.list.map((item, index) => (
            <ItemView item={item} index={index} acitveIndex={acitveIndex} handleClick={handleClick} key={index} />
          ))
        }
        <LineView ref={ref} active={acitveIndex} className="lineView"></LineView>
      </Row>
    </TabsContainer>
  );
};

export default Tabs;
