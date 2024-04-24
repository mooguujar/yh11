import React, { useEffect, useRef, useState } from 'react';
import { useMarquee } from '@/hooks/common.hooks';
import { styled } from 'styled-components';

const MarqueeContainer = styled.div`
  overflow: hidden;
`;

interface Props {
  list: any[]
}

const Marquee: React.FC<Props> = (props) => {
  const { list = [] } = props;
  const listRef = useRef<HTMLDivElement>() as React.RefObject<HTMLDivElement>;
  const wrapRef = useRef<HTMLDivElement>() as React.RefObject<HTMLDivElement>;
  const [data, setData] = useState<any[]>([]);
  const { start, index, transition, transform } = useMarquee({
    data,
    listRef,
    wrapRef
  });

  useEffect(() => {
    window.log('跑马灯公告', list);
    const newData = [...list, ...list.slice(0, 4)];

    setData(newData);
  }, [list]);
  useEffect(() => {
    start({ delay: 4000, duration: 700 });
  }, [start]);

  return (
    <MarqueeContainer className="marquee" ref={wrapRef}>
      <div ref={listRef} style={{ transform, transition }}>
        {[0, 1].map((domItem) => (
          <React.Fragment key={domItem}>
            {data[domItem + index]}
          </React.Fragment>
        ))}
      </div>
    </MarqueeContainer>
  );
};

export default Marquee;
