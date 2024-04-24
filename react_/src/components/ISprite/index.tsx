import React, { useMemo } from 'react';
import { styled } from 'styled-components';
interface ISpriteContainerProps {
  url: string
  w: number
  h: number
  width: number
  height: number
  x: number
  y: number
}
const ISpriteContainer = styled.i<ISpriteContainerProps>`
  display: inline-block;
  background: url(${props => props.url}) no-repeat ${props => `${props.x}rem ${props.y}rem`}/${props => props.w}rem;
  width: ${(props) => props.width}rem;
  height: ${(props) => props.height}rem;
`;

export interface ISpriteProps {
  url: string
  backgroundSize: number[]
  webp?: boolean
  size: number[]
  pos: number[]
  originSize?: number[] | number
  className?: string
  onClick?: (e: any) => void
}
/**
 * @description: ISprite
 * @param {string} url 图片地址
 * @param {boolean} webp 是否使用webp 默认为true
 * @param {number[]} backgroundSize 精灵图的宽高
 * @param {number[]} size icon的宽高
 * @param {number[]} pos 所在精灵图的位置
 * @param {number[]} originSize 放大缩小 如果需要确定icon的宽高，则传入原始宽高数组,如果需要等比放大缩小，则传入一个倍率数字
 * @return {*}
 * @example:
 * <ISprite url='/sprites/test/s1.png' backgroundSize={[204, 168]} originSize={[80, 40]} size={[200, 100]} pos={[-75, 0]} />
 */
const ISprite: React.FC<ISpriteProps> = (props) => {
  const { url, webp = true, backgroundSize, size, pos, originSize } = props;
  const [w, h] = backgroundSize;
  const [width, height] = size;
  const [x, y] = pos;
  const changeExt = (src: string) => {
    if (webp && window.isWebPSupported) {
      const ext = src.split('.').pop() as string;

      return src.replace(`.${ext}`, '.webp');
    }

    return src;
  };
  const src = useMemo<string>(() => {
    if (url.startsWith('http')) return (url);

    const src = url.startsWith('/') ? changeExt(url) : changeExt(`/${url}`);

    return (`${process.env.REACT_APP_STATIC_PATH}${src}`);
  }, [url]);
  const containerProps = useMemo(() => {
    const isnumber = typeof originSize === 'number';
    let m: number[];

    if (Array.isArray(originSize)) {
      m = originSize;
    } else {
      m = size;
    }

    const [ow, oh] = m;
    const wMultiplier = isnumber ? originSize : width / ow;
    const hMultiplier = isnumber ? originSize : height / oh;
    const ix = x * wMultiplier;
    const iy = y * hMultiplier;
    const iw = w * wMultiplier;

    return {
      x: ix,
      y: iy,
      w: iw,
      h,
      width: isnumber ? width * originSize : width,
      height: isnumber ? height * originSize : height,
      url: src
    };
  }, [originSize,
    size,
    src]);

  return (
    <ISpriteContainer
      className={props.className}
      onClick={props.onClick}
      {...containerProps}
    />
  );
};

export default ISprite;
