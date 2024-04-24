import { Column, Row } from '@/components/flex';
import { css, styled } from 'styled-components';

export const LoginContainer = styled(Column)`
  width: 100%;
  flex:1;
  margin-top:31rem;
  .content-view{
    width: 100%;
  padding: 0 41rem;
  }
`;
export const RightIconContainer = styled(Row)`
  width: 30rem;
  height: 100%;
`;
export const LeftIconContainer = styled(Row)`
  .icon{
    width: 41rem;
    height:41rem;
  }
`;
export const FooterView = styled(Column)`
  width: 100%;
  padding: 0 41rem;
  .buttom-view{
    width: 100%;
    height: 80rem;
  }
  .version-view{
    margin-top:45rem;
      font-size: 25rem;
      line-height: 35rem;
      color: #9f9e9e;
  }
  padding-bottom: 28rem;
`;
export const InputCss = css<{ index: number }>`
  /* 从下至上10rem */
  @keyframes show{
    0%{
      opacity: 0;
      transform: translateY(50rem);
    }
    100%{
      opacity: 1;
      transform: translateY(0);
    }
  }
  opacity: 0;
  animation: show .5s;
  animation-fill-mode: forwards;
  animation-delay: ${({ index }) => index * 0.03}s;
`;
export const MobileLeftIconContainer = styled(Row)`
  width:215rem;
  height: 100%;
  .phone-view{
    flex:1;
    height: 100%;
    padding:0 10rem;
    .conuntry-icon{
      width:32rem;
      height: 32rem;
    }
    .phone-code{
      font-size: 25rem;
      line-height: 35rem;
      color: #13161b;
    }
      .arrows-view{
        width: 17rem;
        transform: rotate(90deg);
      }
  }
  &::after{
    content: '';
    width: 1rem;
    height: 28rem;
    background: #d6dce8;
    display: block;
  }
`;

export const MyinputContainer = styled(Column)`
  width: 100%;
`;
export const CaptchaContainer = styled(Row)`
  //width: 143rem;
  //height: 48rem;
  //img{
  //  width: 100%;
  //  height: 100%;
  //}
  font-size: 26rem;
  color: #0b75ff;
`;
