import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { Column, Row } from '@/components/flex';
import IModal from '@/components/IModal';
import { useState } from 'react';
import { delay } from '@/utils/tools';
const MessageContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
`;
const ModalContainer = styled(Column)`
  width:100%;
  height:500rem;
  background-color: #009;
`;
const CloseBtn = () => {
  return (
    <div>关闭</div>
  );
};
const Message = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const onClose = () => {
    console.log('关闭');
    setVisible(false);
  };

  return (
    <MessageContainer>
      <Row>消息</Row>
      <Row onClick={() => { setVisible(true); }}>打开弹窗</Row>
      <IModal visible={visible}
        onClose={onClose}
        CloseBtn={CloseBtn}
        onCheck={(e: boolean) => { console.log('e', e); }}
        showToday
        submit={{
          name: '提交',
          async onClick() {
            await delay(2000);
          }
        }}>
        <ModalContainer>123</ModalContainer>
      </IModal>
    </MessageContainer>
  );
};

export default Message;
