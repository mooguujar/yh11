import React, { useState, useRef, useCallback } from 'react';

interface Props {
  data: any[]
  listRef: React.RefObject<HTMLDivElement>
  wrapRef: React.RefObject<HTMLDivElement>
}
interface timeProps {
  delay: number
  duration: number
}
export const useMarquee = ({ data, listRef, wrapRef }: Props) => {
  const [transform, setTransform] = useState('none');
  const [transition, setTransition] = useState('none');
  const durationRef = useRef(0);
  const delayRef = useRef(0);
  const countRef = useRef(0);

  const move = useCallback(
    (duration: number) => {
      let height = 0;
      const element = listRef.current?.children[0] as HTMLElement;

      height = element?.offsetHeight;
      setTransform(`translateY(-${height + 10}px)`);
      setTransition(`transform ${duration / 1000}s linear`);
    },
    [listRef]
  );
  const reset = useCallback(() => {
    countRef.current += 1;
    setTransform('none');
    setTransition('none');
  }, []);
  const start = useCallback(
    ({ delay, duration }: timeProps) => {
      if (!listRef.current?.children[0] || data.length < 4) {
        return;
      }

      const viewHeight = wrapRef.current?.offsetHeight;
      const element = listRef.current?.children[0] as HTMLElement;
      const itemHeight = element.offsetHeight;
      const num = Math.floor(Number(viewHeight) / itemHeight) + 1;

      if (countRef.current >= data.length - num) {
        // return;
        countRef.current = 0;
      }

      window.clearTimeout(delayRef.current);
      delayRef.current = window.setTimeout(() => {
        move(duration);
        window.clearTimeout(durationRef.current);
        durationRef.current = window.setTimeout(reset, duration);
        start({ delay, duration });
      }, delay);
    },
    [data.length,
      listRef,
      wrapRef,
      move,
      reset]
  );

  return { start, index: countRef.current, transform, transition };
};
