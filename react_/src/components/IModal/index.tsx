import { styled } from 'styled-components';
import { Column, Row } from '../flex';
import React, { useEffect, useMemo, useState } from 'react';
import MyBtn from '../MyBtn';
interface ModalViewProps {
  visible: boolean
  bgImg: string
}
const ModalView = styled(Column)<ModalViewProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.5);
  animation: fadeIn 0.3s;
  @keyframes fadeIn{
    0%{
      background-color: rgba(0,0,0,0);
    }
    100%{
      background-color: rgba(0,0,0,0.5);
    }
  }
  ${({ visible }) => visible ? 'display:flex;' : 'display:none;'}
  .modal-container{
    width: 708rem;
    border-radius: 8rem;
    overflow: hidden;
    animation: slideIn 0.3s;
    position: relative;
    background-color: #fff;
    padding-bottom: 20rem;
    .modal-content{
      width: 100%;
      ${({ bgImg }) => bgImg ? `background: url(${process.env.REACT_APP_API_URL}${bgImg}) no-repeat center / cover;` : ''}
      ${({ bgImg }) => bgImg ? 'height: 572rem;' : ''}
    }
    .btn-view {
      font-size: 31rem;
    }
    @keyframes slideIn{
      0%{
        transform: scale(0.3);
        opacity: 0;
      }
      100%{
        transform: scale(1);
        opacity: 1;
      }
    }
    .close-btn{
      width: 21rem;
      height: 21rem;
      position:absolute;
      right:40rem;
      top:24rem;
      font-size:24rem;
      color:#fff;
    }
    .close-btn-node{
      position:absolute;
      right:40rem;
      top:24rem;
    }
  }
  .btn-view{
    width: 90%;
    height:80rem;
  }
  .check-view{
    
  }
`;
const RadioContainer = styled(Row)`
  margin-top: 20rem;
  width: 100%;
  .radio-check{
    width: 35rem;
    height: 35rem;
    border-radius: 50%;
    margin-right: 10rem;
    .radio-unchecked {
      width: 100%;
      height: 100%;
      border: 1rem solid #868d9a;
      border-radius: 50%;
    }
  }
`;
const RadioView = styled.label`
  display: flex;
  align-items: center;
`;

interface RadioProps {
  onCheck: (checked: boolean) => void
  checked?: boolean
}
const Radio = (props: RadioProps) => {
  // const [checked, setChecked] = useState(false);
  const handleClick = () => {
    // setChecked((prev) => {
    //   const newChecked = !prev;
    //
    //   if (props.onCheck) props.onCheck(newChecked);
    //
    //   return !checked;
    // });
    const newChecked = !props.checked;

    if (props.onCheck) props.onCheck(newChecked);
  };
  
  return (
    <RadioContainer className='check-view' justify='center' align='center'>
      <RadioView onClick={handleClick}>
        <Row className='radio-check' justify='center' align='center'>
          {props.checked ? <div className='verified'></div> : <div className='radio-unchecked'></div>}
        </Row>
        <div className='radio-text'>今日不再提示</div>
      </RadioView>
    </RadioContainer>
  );
};

interface Props {
  visible: boolean
  children: React.ReactNode
  onClose?: () => void
  CloseBtn?: boolean | React.FC
  submit?: {
    name: string
    onClick: () => void
  } | React.FC
  showToday?: boolean
  bgImg?: string
  onCheck?: (checked: boolean) => void
}
const IModal: React.FC<Props> = (props) => {
  const { visible, onClose, CloseBtn, submit, showToday, bgImg = '', onCheck } = props;
  const [checked, setChecked] = useState(false);
  const handleClick = () => {
    if (onClose) {
      setChecked(false);
      onClose();
    }
  };
  const CloseBtnView = () => {
    if (!CloseBtn) return <React.Fragment></React.Fragment>;
    if (typeof CloseBtn === 'boolean') return <Row className='close-btn' justify='center' align='center' onClick={handleClick}>X</Row>;

    return <Row className='close-btn-node' justify='center' align='center' onClick={handleClick}>
      <CloseBtn/>
    </Row>;
  };
  const SubmitBtnView = () => {
    if (!submit) return <React.Fragment></React.Fragment>;

    const IsReactNode = (submit as any).$$typeof ? submit as React.FC : false;

    if (IsReactNode) return <IsReactNode />;

    const opt = submit as { name: string, onClick: () => void };

    return <Row className='btn-view' justify='center' align='center'>
      <MyBtn name={opt.name} onClick={() => { setChecked(false); opt.onClick(); }} />
    </Row>;
  };
  
  const handleRadioCheck = (checked: boolean) => {
    if (onCheck) {
      setChecked(checked);
      onCheck(checked);
    } else {
      return checked;
    }
  };

  return (
    <ModalView visible={visible} bgImg={bgImg} justify='center' align='center' onClick={handleClick}>
      <Column className='modal-container' onClick={(e) => { e.stopPropagation(); }}>
        <Column className='modal-content' justify='center' align='center'>

          <CloseBtnView/>
          {props.children}
        </Column>
        <SubmitBtnView/>
        {showToday && (
          
          <Radio onCheck={handleRadioCheck} checked={checked}/>
        )}
      </Column>
      
    </ModalView>
  );
};

export default IModal;
