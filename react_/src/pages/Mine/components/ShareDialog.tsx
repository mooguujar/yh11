import { Row } from '@/components/flex';
import MyImg from '@/components/MyImg';
import { styled } from 'styled-components';
import QRCode from 'qrcode.react';
import { useInviteURL } from '@/hooks/user.hooks';
import { useClipboard } from 'use-clipboard-copy';
import Toast from '@/utils/toast';

const ShareDialogContainer = styled(Row)`
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
    height: 95vw;
    margin: 0 auto;
    left: 0;
    right: 0;
    position: absolute;
    z-index: 101;
    top: 15%;
    border-radius: 22rem;
  }

  .dialog img {
    width: 100%:
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  .dialog .qrcode {
    width: 29vw !important;
    height: 29vw !important;
    position: absolute;
    top: 50vw;
    left: 33vw;
    border-radius: 2vw;
  }

  .bottom-popup {
    width: 100vw;
    position: absolute;
    bottom: 0;
    border-radius-top-left: 22rem;
    border-radius-top-right: 22rem;
    background-color: #fff;
    height: 25vh;
    z-index: 101;
  }

  .popup-title {
    font-size: 33rem;
    margin-top: 33rem;
    margin-bottom: 22rem;
  }

  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .action-item {
    width: 33.33%;
  }

  .action-icon {
    height: 44rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 22rem;
  }

  .action-icon img {
    width: 55rem;
    height: auto;
    display: block;
  }

  .popup-cancel {
    color: #0b75ff;
    font-size: 33rem;
    margin-top: 44rem;
  }

`;
const ShareDialog = (props: any) => {
  const inviteURL = useInviteURL();

  console.log(inviteURL);

  const clipboard = useClipboard({
    onSuccess() {
      Toast.show('复制成功');
    },
    onError() {
      console.log('Failed to copy text!');
    }
  });

  return (
    <ShareDialogContainer>
      <div className="mask" onClick={() => props.handleDialog(false) }></div>
      <div className="dialog">
        <MyImg src='/files/mine/share_modal_bg.png' alt='share' loading={false} webp />
        <QRCode
          id={inviteURL}
          value={inviteURL}
          level={'H'}
          includeMargin={true}
          className="qrcode"
        />
      </div>
      <div className="bottom-popup">
        <div className="popup-title">
          分享到
        </div>
        <div className="flex">
          <div className="action-item">
            <div className="action-icon">
              <MyImg src='/files/mine/save-image-icon.png' alt='share' loading={false} webp />
            </div>
            保存图片
          </div>
          <div className="action-item" onClick={() => { clipboard.copy(inviteURL); }}>
            <div className="action-icon">
              <MyImg src='/files/mine/copy-link-icon.png' alt='share' loading={false} webp />
            </div>
            複製链接
          </div>
          <div className="action-item">
            <div className="action-icon">
              <MyImg src='/files/mine/more-icon.png' alt='share' loading={false} webp />
            </div>
            更多
          </div>
        </div>
        <div className="popup-cancel" onClick={() => props.handleDialog(false) }>
          取消
        </div>
      </div>
    </ShareDialogContainer>
  );
};

export default ShareDialog;
