import React, { useEffect, useState } from 'react';
import { Column, Row } from '@/components/flex';
import { RuleSet, css, styled } from 'styled-components';

export type ChangeValue = Array<{ key: string, value: string }>;

interface DataProps {
  value: string
  error: string
  type: 'text' | 'password' | 'number'
  key: string
  onChange: (data: ChangeValue) => void
  placeholder?: string
  disabled?: boolean
  style?: React.CSSProperties
  className?: string
  typeKey: string
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void

}

interface InputItemProps {
  formData?: any
  item: DataProps
  css?: RuleSet<{ index: number }>
}

interface MyinputContainerProps {
  css?: RuleSet<{ index: number }>
  index: number
}

const InputView = styled(Row) <MyinputContainerProps>`
  width: 100%;
  height: 79rem;
  background-color: #ebf1f6;
  padding: 0 25rem;
  border-radius: 7rem;
  position: relative;
  z-index: 2;
  ${({ css }) => css as any}
  /* 根据index 动画延迟 */
  animation-delay: ${({ index }) => index * 0.1}s;
  /* margin-bottom: 20rem; */
  input{
    padding: 0 10rem;
    border: none;
    flex:1;
    height: 100%;
    background-color: transparent;
  }
`;

interface InputDataProps {
  value: string
  type: 'text' | 'password' | 'number'
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

const defaultCss = css<{ index: number }>``;

const Input: React.FC<InputItemProps> = ({ item, formData, css }) => {
  const inputData: InputDataProps = {
    value: item.value,
    type: item.type,
    onChange(e: React.ChangeEvent<HTMLInputElement>) {
      item.onChange([{ key: 'value', value: e.target.value }]);
    }
  };

  if (item.placeholder) inputData.placeholder = item.placeholder;

  return (
    <InputView css={css ?? defaultCss} index={0} className='input-view' key={item.key} justify='center' align='center' style={item.style} >
      <input className='input' {...inputData} />
    </InputView>
  );
};

export default Input;
