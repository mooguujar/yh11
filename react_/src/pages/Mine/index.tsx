import { useState, useEffect } from 'react';
import { Column, Row } from '@/components/flex';
import { styled } from 'styled-components';
import { useAppDispatch, useAppSelector } from '@/store';
import { ICoin } from '@/store/types/coin';
import { tokenSelector, logout, userInfoSelector, userCoinsSelector, editreviewSelector } from '@/store/slices/auth.slice';
import { getUserInfoThunk, getUserCoinsThunk } from '@/store/actions/user.thunk';
import { updateUserInfoApi, updateUserInfoParams } from '@/apis/user';
import { useAvatar, useInviteURL } from '@/hooks/user.hooks';
import { useNavigate } from 'react-router-dom';
import MyImg from '@/components/MyImg';
import ShareDialog from './components/ShareDialog';
// import VerifyDialog from './components/VerifyDialog';
import EditNameModal from './components/EditNameModal';
import EntryRow from './components/EntryRow';
import EntryRowGroup from './components/EntryRowGroup';
import { TopBarContainer, ProfileContainer, MineContentContainer } from './mine.styled';
import { spriteMineCss } from '@/components/Sprite';
import { uploadImgApi } from '@/apis/common';
import Toast from '@/utils/toast';

// const IconTutorialColumn = styled(Column)`
//   margin: 0 auto;
//   margin-right: 28rem;
// `;

const MineContainer = styled(Column)`
  width: 100%;
  height: 100%;
  background-color: #ebf1f6;
  overflow: auto;

  /* 精灵图 */
  ${spriteMineCss as any}
`;

const ModalContainer = styled(Column)`
  width:100%;
  height:100rem;
  background-color: #009;
`;

export const TopBarContentView = styled(Row)`
  width: 100%;
  height: 90rem;
  position: relative;

  .icon-customer-service {
    width: 38rem;
    height: 34rem;
  }
  .top-bar-title {
    width: 100%;
    text-align: center;
    color: white;
    font-size: 44rem;
    position: absolute;
    top: 40rem;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
  }
  .icon-help {
    width: 33rem;
    height: 33rem;
    margin: 0 auto;
    margin-right: 28rem;
  }
  .icon-message {
    width: 37rem;
    height: 37rem;
    margin-bottom: -3rem;
  }
`;

const topBarItemList = [
  {
    src: '/files/home/customer-service.png',
    routePath: '/linkPage/customerService',
    className: 'icon-customer-service'
  },
  {
    src: '/files/home/homeLogo.png',
    routePath: '',
    className: 'icon-home-logo',
    text: '我的'
  },
  {
    src: '/files/home/help.png',
    routePath: '/linkPage/tutorial',
    className: 'icon-help'
  },
  {
    src: '/files/home/message.png',
    routePath: '/message',
    className: 'icon-message'
  }
];

const TopBar = () => {
  const navigate = useNavigate();
  const to = (path: string) => { navigate(path); };

  return (
    <TopBarContentView justify="space-between" align="flex-end">
      {
        topBarItemList.map((item) => {
          return (
            item.text
              ? <div className="top-bar-title" key={item.src}>
                {item.text}
              </div>
              : <MyImg
                key={item.src}
                className={item.className}
                src={item.src}
                onClick={() => { to(item.routePath); }}
              />
          );
        })
      }
    </TopBarContentView>
  );
};

const Mine = () => {
  const navigate = useNavigate();
  const token = useAppSelector(tokenSelector);
  const userInfo = useAppSelector(userInfoSelector);
  const editreview = useAppSelector(editreviewSelector);
  const userCoins = useAppSelector(userCoinsSelector);
  const dispatch = useAppDispatch();
  
  const avatar = useAvatar();
  const out = () => {
    dispatch(logout(null));
    navigate('/auth/login');
  };

  const to = (path: string) => { navigate(path); };

  const [isShowShareDialog, setIsShowShareDialog] = useState(false);

  const handleShareDialog = (isShow: boolean) => {
    setIsShowShareDialog(isShow);
  };

  const [isShowEditNameModal, setIsShowEditNameModal] = useState(false);
  const handleEditNameModal = (isShow: boolean) => {
    setIsShowEditNameModal(isShow);
  };

  const uploadImg = async (file: string, type: string): Promise<any> => {
    try {
      const res = await uploadImgApi({
        file,
        type
      });
  
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  const [currentCoin, setCurrentCoin] = useState<ICoin>({
    mtype: 0,
    coin_name: '',
    coin_unit: '',
    coincash: '',
    available_coincash: '',
    status: 0,
    wallet_type: '',
    service_fee: ''
  });

  const updateAvatar = async (event: any) => {
    const res = await uploadImg(event.target.files[0], 'face');

    await updateUserInfo({ headimg: res?.img });
    getUserInfo();
  };

  const getUserInfo = async () => {
    try {
      await dispatch(getUserInfoThunk.asyncThunk());
      console.log(userInfo);
      await dispatch(getUserCoinsThunk.asyncThunk());
      const coin = userCoins.filter(coin => coin?.coin_unit === 'GDB')?.[0];
      
      setCurrentCoin(coin);

      console.log(editreview, 'editreview');
    } catch (e) {
      console.log(e);
    }
  };

  const updateUserInfo = async (params: updateUserInfoParams) => {
    try {
      await updateUserInfoApi(params);
    } catch (e) {
      console.log(e);
    }
  };

  const updateUserName = async (name: string) => {
    try {
      await updateUserInfo({ nickname: name });
    } catch (e) {
      console.log(e);
    }
  };

  const handleShowEditModal = () => {
    if (editreview.nickname.status === -1 ) {
      Toast.show('暱称正在审核中，请等待');

      return;
    }

    setIsShowEditNameModal(true);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <MineContainer>
      {
        isShowShareDialog && <ShareDialog handleDialog={handleShareDialog} />
      }
      {/* <img src={`${process.env.REACT_APP_STATIC_PATH}/files/home/1.png`} alt="" /> */}
      <TopBarContainer>
        <TopBar />
        <ProfileContainer>
          <div className="flex">
            <div className="avatar">
              <MyImg src={avatar} alt='avatar' loading={false} />
              <div className="camera-mask">
                <MyImg src='/files/mine/camera.png' alt='camera' loading={false} />
              </div>
              <input className="avatar-input" type="file" accept="image/*" onChange={updateAvatar} />
              {
                editreview?.headimg?.status === -1 && <div className="input-overlay" onClick={() => Toast.show('头像正在审核中，请等待')}></div>
              }
            </div>
            <div className="info">
              <div className="name">
                {userInfo?.nickname}
                <div className="edit" onClick={handleShowEditModal}></div>
                {/* <MyImg src='/files/mine/edit.png' alt='edit' loading={false} /> */}
              </div>
              <div className="id">{userInfo?.open_id}</div>
            </div>
          </div>
          <div className="right">
            <div className="amount flex">
              余额
              <MyImg className="chervon-icon" src='/files/mine/white-chervon-right.png' alt='verify' loading={false} />
            </div>
            <div className="money">
              <span>{currentCoin?.coincash}</span>{currentCoin?.coin_unit}
            </div>
          </div>
        </ProfileContainer>
      </TopBarContainer>
      <MineContentContainer>
        <EntryRow action={() => { to('/realVerify'); }} title="实名认证" icon="verify-icon" statusType='verify' isDone={userInfo?.verified_status === 1} hasLine={false} />
        <EntryRowGroup title="收款及支付方式">
          <EntryRow action={() => { to('bank'); }} title="银行卡" icon="bank-card-icon" statusType='bind' isDone={true} hasLine={true} />
          <EntryRow action={() => { to('wechat'); }} title="微信支付" icon="wechat-icon" statusType='bind' isDone={false} hasLine={true} />
          <EntryRow action={() => { to('alipay'); }} title="支付宝" icon="alipay-icon" statusType='bind' isDone={true} hasLine={false} />
        </EntryRowGroup>
        <EntryRowGroup title="账号安全">
          <EntryRow action={() => { to('loginPassword'); }} title="登录密码" icon="lock-icon" statusType='bind' isDone={true} hasLine={true} />
          <EntryRow action={() => { to('payPassword'); }} title="支付密码" icon="shield-icon" statusType='bind' isDone={userInfo?.is_set_paypassword === 1} hasLine={true} />
          <EntryRow action={() => { to('email'); }} title="电子邮箱" icon="email-icon" statusType='bind' isDone={userInfo?.is_email_verify === 1} hasLine={true} />
          <EntryRow action={() => { to('device'); }} title="我的设备" icon="device-icon" statusType='bind' isDone={userInfo?.is_sms_verify === 1} hasLine={true} iconIsTall={true} />
          <EntryRow action={() => { handleShareDialog(true); }} title="分享GDPay" icon="share-icon" statusType='none' hasLine={true} iconIsTall={true} />
          <EntryRow action={() => { to('aboutUs'); }} title="关于我们" icon="about-icon" statusType='none' hasLine={true} />
          <EntryRow title="关于我们" icon="check-icon" statusType='bind' isDone={true} hasLine={false} isVersion={true} />
        </EntryRowGroup>
      </MineContentContainer>
      <div>
        <div>用户名:{userInfo?.username}</div>
      </div>
      {token ? <div>已登录,token为:{token}</div> : ''}
      <button onClick={out}>退出登录</button>
      {
        isShowEditNameModal && <EditNameModal handleDialog={handleEditNameModal} submit={updateUserName}></EditNameModal>
      }
    </MineContainer>
  );
};

export default Mine;
