import React from 'react';
import { RuleSet, css, styled } from 'styled-components';
import { Row } from '../flex';
import KeepAlive from 'react-activation';
const IKeepAliveContainer = styled(Row)<IKeepAliveContainerProps>`
  width: 100%;
  height: 100%;
  .ka-wrapper{
    width: 100%;
    height: 100%;
    display: flex;
  }
  .ka-content{
    width: 100%;
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    ${css => css?.css ? css.css : ''}
  }
`;

interface IKeepAliveProps {
  css?: RuleSet<any>
  children: React.ReactNode
  id: string
}
interface IKeepAliveContainerProps {
  css?: RuleSet<any>
}
const IKeepAlive: React.FC<IKeepAliveProps> = (props) => {
  return (
    <IKeepAliveContainer>
      <KeepAlive id={props.id ?? ''}>
        {props.children}
      </KeepAlive>
    </IKeepAliveContainer>
  );
};

export default IKeepAlive;
