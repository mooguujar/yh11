import React, { type MouseEventHandler } from 'react';
import styled from 'styled-components';
interface FlexViewProps {
  align: string
  justify: string
  wrap: string
  direction: string
  fontSize?: number
}
const FlexView = styled.div<FlexViewProps>`
  display: flex;
  align-items:${( { align } ) => align};
  justify-content: ${( { justify } ) => justify};
  flex-wrap:${( { wrap } ) => wrap};
  flex-direction: ${( { direction } ) => direction};
  ${( { fontSize } ) => fontSize ? `transform:scale(${fontSize});` : ''};
`;

type Align = 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'initial' | 'inherit';
type Justify = Align;
type Wrap = 'nowrap' | 'wrap' | 'wrap-reverse' | 'initial' | 'inherit';
type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  align?: Align
  justify?: Justify
  wrap?: Wrap
  direction?: FlexDirection
  className?: string
  iRef?: any
  onClick?: MouseEventHandler
  style?: React.CSSProperties
  fontSize?: number

}
const getDecoratedChildren = ( props: { children?: React.ReactNode } ): string | number | true | React.ReactNode | React.ReactFragment | null => {
  if ( !props.children ) return null;
  if ( !React.isValidElement( props.children ) ) return props.children;

  return React.Children.map( props.children, ( child: any ) => React.cloneElement( child ) );
};

const getJsx = ( isRow: boolean ): React.FC<Props> => {
  return ( props ) => {
    const {
      fontSize: fz, align = 'center', justify = 'flex-start', direction = isRow ? 'row' : 'column', wrap = 'nowrap', className = '', iRef = null, onClick = undefined, style = {}
    } = props;
    let fontSize = fz;

    if ( fontSize && fontSize <= 12 ) {
      fontSize = fontSize / 12;
    }

    const propsData = {
      align,
      justify,
      wrap,
      className,
      direction,
      style,
      onClick,
      ref: iRef,
      fontSize
    };

    return ( <FlexView {...propsData}>{getDecoratedChildren( props )}</FlexView> );
  };
};

export const Row = getJsx( true );
export const Column = getJsx( false );
