import { Row } from '@/components/flex';
import MyImg from '@/components/MyImg';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

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
    height: 92vw;
    margin: 0 auto;
    left: 0;
    right: 0;
    position: absolute;
    z-index: 101;
    top: 25%;
    border-radius: 11rem;
    background: #fff;
  }

  .verify-img {
    width: 240rem;
    height: 260rem;
    margin: 0 auto;
    margin-top: 77rem;
  }

  .close-icon {
    width: 22rem;
    height: 22rem;
    position: absolute;
    top: 33rem;
    right: 33rem;
  }

  .dialog-head {
    width: 100%;
    margin-top: 33rem;
    font-size: 33rem;
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
    width: 90%;
    height: 77rem;
    background-color: #0b75ff;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28rem;
    margin-top: 44rem;
    border-radius: 11rem;
  }

`;
const VerifyDialog = (props: any) => {
  const navigate = useNavigate();
  const to = (path: string) => { navigate(path); };
  
  return (
    <VerifyDialogContainer>
      <div className="mask" onClick={() => props.handleDialog(false) }></div>
      <div className="dialog">
        <div className="dialog-head">
          身份认证
          <MyImg onClick={() => props.handleDialog(false) } className="close-icon" src='/files/mine/close-icon.png' alt='share' loading={false} webp />
        </div>
        <MyImg className="verify-img" src='/files/mine/verify-img.png' alt='share' loading={false} webp />
        <div className="dialog-desc">
          完成身份认证，可核对真实身份，<br />
          保障合法权益
        </div>
        <div className="dialog-btn" onClick={() => { to('/realVerify'); }}>
          立即认证
        </div>
      </div>
    </VerifyDialogContainer>
  );
};

export default VerifyDialog;
