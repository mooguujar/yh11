import { type MouseEventHandler, useMemo } from 'react';
import ProgressiveImage from 'react-progressive-graceful-image';
import { styled } from 'styled-components';
import Loading from './components/Loading';
const MyImage = styled.img`
  width: 100%;
  height: 100%;
  animation: fade 0.5s;
  @keyframes fade{
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
`;

interface Props {
  src: string
  alt?: string
  style?: React.CSSProperties
  loading?: boolean
  className?: string
  onClick?: MouseEventHandler
  webp?: boolean
  domain?: string
}
/**
 * @description: 图片组件
 * @param {string} src 图片地址
 * @param {string} alt 图片描述
 * @param {React.CSSProperties} style 图片样式
 *
 */
const MyImg: React.FC<Props> = (props) => {
  const { src, alt = '', style = {}, loading = true, className = '', onClick = undefined, webp = false, domain = '' } = props;
  const changeExt = (src: string) => {
    if (webp && window.isWebPSupported) {
      const ext = src.split('.').pop() as string;

      return src.replace(`.${ext}`, '.webp');
    }

    return src;
  };
  const mySrc = useMemo(() => {
    if (src.startsWith('http')) return (src);

    const url = src.startsWith('/') ? changeExt(src) : changeExt(`/${src}`);
    
    if (domain) {
      return domain + url;
    }

    return (`${process.env.REACT_APP_STATIC_PATH}/${url}`);
  }, [src]);

  if (!loading) return <MyImage src={mySrc} alt={alt} style={style} className={className} onClick={onClick} />;

  return (
    <ProgressiveImage placeholder='' src={mySrc}>
      {(src, l) => l
        ? Loading(className, style)
        : <MyImage src={src} alt={alt} style={style} className={className} onClick={onClick} />}
    </ProgressiveImage>
  );
};

export default MyImg;
