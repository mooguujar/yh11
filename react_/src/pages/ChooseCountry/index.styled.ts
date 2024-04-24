import { Column, Row } from '@/components/flex';
import { css, styled } from 'styled-components';
import { InputCss } from '../Auth/login.styled';

export const CountryCountryContainer = styled(Column)`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
export const ListContainer = styled(Column)`
  width: 100%;
  flex:1;
  overflow: hidden;
`;
export const ListHeader = styled(Column)`
  width: 100%;
  height: 80rem;
  padding: 0 21rem;
  div{
    height: 100%;
    padding-bottom: 15rem;
    width: 100%;
    font-size: 28rem;
    line-height: 35rem;
    letter-spacing: 0rem;
    color: #787f8c;
  }
  &::after{
    content: '';
    width: 100%;
    height: 1rem;
    background: #f5f5f5;
    background-color: #d6dce8;
  }
`;
export const ListContent = styled(Column)`
  width: 100%;
  height: 100%;
  flex:1;
  padding: 0 21rem 21rem;
  overflow-y: auto;
  //将滚动条移动到靠近屏幕右侧的位置
  scrollbar-width: thin;
  scrollbar-color: #eee #fff;
  &::-webkit-scrollbar {
    width: 6rem;
    height: 6rem;
  }
  &::-webkit-scrollbar-track {
    background: #fff;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #eee;
    border-radius: 3rem;
  }
  
      
  .listSorllView{
    width: 100%;
  }
`;
interface IListItemContentProps {
  index: number
}
export const ListItemContent = styled(Row)<IListItemContentProps>`
  width: 100%;
  height: 71rem;
  /* 根据index延迟动画 */
  ${InputCss as any}
  /* 动画 */
  .country-info{
    font-size: 26rem;
    line-height: 35rem;
    color: #13161b;
    .country-icon{
      width:31rem;
      height: 31rem;
      margin-right: 10rem;
    }
  }
  .phone-code{
    font-size: 25rem;
    line-height: 35rem;
    color: #787f8c;
  }
`;
