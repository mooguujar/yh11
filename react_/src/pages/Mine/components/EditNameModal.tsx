import { useState } from 'react';
import { Row } from '@/components/flex';
import MyImg from '@/components/MyImg';
import { styled } from 'styled-components';
import Input from './Input';
import { ChangeValue, StateProps, inputChange } from '@/pages/Auth/tools';

const VerifyDialogContainer = styled(Row)`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index:100;

  .mask {
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, .5);
    position: absolute;
    top: 0;
    z-index:100;
  }
  .dialog {
    width: 95vw;
    height: auto;
    padding: 0 40rem 40rem;
    margin: 0 auto;
    left: 0;
    right: 0;
    position: absolute;
    z-index: 101;
    top: 25%;
    border-radius: 11rem;
    background: #fff;
  }

  .close-icon {
    width: 22rem;
    height: 22rem;
    position: absolute;
    top: 33rem;
    right: 60rem;
  }

  .dialog-head {
    width: 100%;
    margin-top: 22rem;
    margin-bottom: 22rem;
    font-size: 30rem;
    color: #13161b;
    text-align: center;
  }

  .dialog-desc {
    width: 100%;
    text-align: center;
    line-height: 33rem;
    color: #787f8c;
    font-size: 22rem;
    margin-top: 22rem;
  }

  .dialog-btn {
    width: 100%;
    height: 77rem;
    background-color: #0b75ff;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28rem;
    margin-top: 88rem;
    border-radius: 11rem;
  }

`;
const EditNameModal = (props: any) => {
  const [name, setName] = useState<StateProps>({
    value: '',
    error: '',
    type: 'text'
  });

  const limitLengthMax = (value: string) => value.length <= 8;
  const nameOnChange = (data: ChangeValue) => {
    const isValue = data.find((item) => item.key === 'value');

    if (isValue && (!limitLengthMax(isValue?.value))) {
      return;
    }

    inputChange(setName)(data);
  };

  const handleSubmit = () => {
    props.submit(name.value);
    props.handleDialog(false);
  };
  const item = {
    key: 'name',
    placeholder: '暱称限制2-8位长度',
    typeKey: 'name',
    onChange: nameOnChange,
    ...name
  };

  return (
    <VerifyDialogContainer>
      <div className="mask" onClick={() => props.handleDialog(false)}></div>
      <div className="dialog">
        <MyImg onClick={() => props.handleDialog(false)} className="close-icon" src='/files/mine/close-icon.png' alt='share' loading={false} webp />
        <div className="dialog-head">
          暱称修改
        </div>
        <Input key={item.key} item={item} />
        <div className="dialog-btn" onClick={handleSubmit}>
          提交
        </div>
      </div>
    </VerifyDialogContainer>
  );
};

export default EditNameModal;
