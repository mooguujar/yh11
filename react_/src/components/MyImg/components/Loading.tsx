import { Row } from '@/components/flex';
import React from 'react';
import { styled } from 'styled-components';
// 图片加载中的占位图,使用纯css实现
const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction:row;
  justify-content: center;
  align-items: center;
  .dot{
    min-width: 10rem;
    min-height: 10rem;
    max-width: calc(100% - 10rem);
    max-height: calc(100% - 10rem);
    border-radius: 50%;
    background-color: #aaa;
    margin: 0 0.2rem;
  }
`;

interface DotProps {
  index: number
}
const Dot = styled(Row)<DotProps>`
  animation: loading 1s linear infinite;
  animation-delay: ${({ index }) => index * 1.1}s;
  @keyframes loading{
    0%{
      transform:  scale(0.8);
    }
    50%{
      transform:scale(1.2);
    }
    100%{
      transform: scale(0.8);
    }
  }
`;
const Loading = (className: string = '', style: React.CSSProperties = {}) => (
  <LoadingContainer className={className} style={style}>
    {
      Array.from({ length: 5 }).map((_, index) => {
        return (
          <Dot
            key={index}
            index={index}
            className={`dot dot-${index}`}
          />
        );
      }
      )
    }
  </LoadingContainer>
);

export default Loading;
