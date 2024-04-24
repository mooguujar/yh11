import { createGlobalStyle } from 'styled-components';
import { DESIGN_WIDTH, getWndowWidth } from '@/utils/tools';
import { type NamedExoticComponent } from 'react';
import rootVar from '@/components/RootVar';
const GlobalStyle: NamedExoticComponent<any> = createGlobalStyle`
 ${rootVar as any}
 html,body,#root {
    margin: 0;
    padding: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    ::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
  html {
    font-size: ${( getWndowWidth() / DESIGN_WIDTH )}px;
  }
  body {
    font-size: 12rem;
  }
 .hairline-border {
   position: relative;
 }
 .hairline-border::after {
   content: "";
   pointer-events: none;
   position: absolute;
   left: 0;
   top: 0;
   border: 1px solid #d6dce8 !important;
   width: 200%;
   height: 200%;
   -webkit-transform: scale(0.5);
   transform: scale(0.5);
   -webkit-transform-origin: left top;
   transform-origin: left top;
 }
 .ellipsis {
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
 }
`;
const GlobalView: React.FC = () => {
  return (
    <GlobalStyle />
  );
};

export default GlobalView;
