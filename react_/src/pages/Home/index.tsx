
import { Column } from '@/components/flex';
import React, { useEffect, useState, useRef } from 'react';
import { styled } from 'styled-components';
import { WalletInfoContainer } from './home.styled';
import LoginStatus from '@/pages/Home/components/LoginStatus';
import Balance from '@/pages/Home/components/Balance';
import WalletAddress from '@/pages/Home/components/WalletAddress';
import Bulletin from '@/pages/Home/components/Bulletin';
import MySlider from '@/pages/Home/components/MySlider';
import DealInfo from '@/pages/Home/components/DealInfo';
import DealBtn from '@/pages/Home/components/DealBtn';
import MyPendingOrder from '@/pages/Home/components/MyPendingOrder';
import TopBar from '@/pages/Home/components/TopBar';
import store, { useAppDispatch, useAppSelector } from '@/store';
import { userInfoSelector } from '@/store/slices/auth.slice';
import { updateHomeNoticeShowStatus, updateHomeNoticeList } from '@/store/slices/article.slice';
import IModal from '@/components/IModal';
import { StateProps } from '@/pages/Home/types';
import { spriteHomeCss } from '@/components/Sprite';
import VerifyDialog from '@/pages/Mine/components/VerifyDialog';
import { articleListApi } from '@/apis/article';
import { IArticleListType } from '@/store/types/article';
import { ARTICLE } from '@/store/sliceName';
import dayjs from 'dayjs';

interface Props {}
const HomeContainer = styled(Column)`
  width: 100%;
  height: 100%;
  background-color: #ebf1f6;
  overflow: auto;
  
  /* 精灵图 */
  ${spriteHomeCss as any}
`;
const TopBarContainer = styled.div`
  width: 100%;
  height: 264rem;
  flex: 0 0 264rem;
  padding: 0 30rem;
  box-sizing: border-box;
  background-color: #0b75ff;
`;
const MainContentContainer = styled.div`
  width: 100%;
  padding: 0 20rem;
`;
const ModalPlainTextContainer = styled(Column)`
  width: 100%;
  padding: 0 54rem;
  background-color: #fff;
  .title {
    margin-top: 35rem;
    font-size: 29rem;
    color: #13161b;
  }
  .plain-text {
    margin: 33rem 0 35rem 0;
    font-size: 25rem;
    color: #787f8c;
    text-align: justify;
  }
`;

const Home: React.FC<Props> = ( _props ) => {
  const userInfoData = useAppSelector(userInfoSelector);
  const [visible, setVisible] = useState(false);
  const [currArticleIndex, setCurrArticleIndex] = useState(0);
  const currArticleIndexRef = useRef(0);
  const [hasCloseBtn, setHasCloseBtn] = useState(false);
  const [ipChanged, setIpChanged] = useState(false);
  const [modalObj, setModalObj] = useState<StateProps>({
    title: '【温馨提示】',
    content: '当我们从Bug的泥淖中痛苦脱身后，当你蓄谋已久的大\n' +
        '招功能终于即将发布了，亦或者是当你在研究完《七宗\n' +
        '罪》《人性的弱点》《用户行为心理学》后为产品作做\n' +
        '出了一个沁人心脾、改变世界（PM们心里都是偷偷这\n' +
        '么想的）的用户体验优化后，你是不是很想告诉你的告\n' +
        '诉你的用户，是不是迫不及待的告诉你的粉丝和迷妹。\n' +
        '那么我们应该如何邀请用户来参加这场约会？如何更高\n' +
        '效的促使用户升级版本、体验产品新功能呢？产品更新\n' +
        '说明本身只是微不足道的，无法帮助你的产品改变4姐。\n' +
        '但是好的更新文案一定会为你的产品锦上添花。和用户\n' +
        '调调情，他们会觉得你很有趣！',
    img: '',
    allowShow: true
  });
  const [articleList, setArticleList] = useState<IArticleListType[]>([]);
  const dispatch = useAppDispatch();
  const userInfo = async () => {
    try {
      console.log('userInfoData', userInfoData);
    } catch (error) {
      
    }
  };

  const CloseBtn = () => {
    return (
      <div className={modalObj.img ? 'close-white' : 'close-dark'}></div>
    );
  };

  const onCheck = (e: boolean) => {
    setModalObj({ ...modalObj, allowShow: !e });
  };
  
  const onClose = () => {
    const homeNoticeShowList = store.getState()[ARTICLE].homeNoticeShowList.slice();
    const dateNow = dayjs().format('YYYY-MM-DD');

    window.log('dateNow', dateNow);

    // 更新当前弹窗今日显示状态
    homeNoticeShowList[currArticleIndex] = modalObj.allowShow ? true : dateNow;
    dispatch(updateHomeNoticeList(homeNoticeShowList));
    
    setCurrArticleIndex(currArticleIndex + 1);
    setVisible(false);
    
    setTimeout(() => {
      window.log('关闭', currArticleIndex, currArticleIndexRef.current, modalObj);

      // 如果当前公告索引值小于公告列表长度，就设置下一个公告弹窗内容，否则，就更新首页公告显示状态
      if (currArticleIndexRef.current < articleList.length) {
        setModalObj({ ...modalObj, ...articleList[currArticleIndexRef.current], allowShow: true });
        setVisible(true);
      } else {
        dispatch(updateHomeNoticeShowStatus(false));
      }
    }, 50);
  };
  
  const handleOpenNoticeData = async () => {
    const res = await articleListApi({
      bind_key: 'OpenNotice'
    });
    
    window.log('弹窗公告内容', res);
    setArticleList(res);

    if (res.length) {
      let homeNoticeShowList = store.getState()[ARTICLE].homeNoticeShowList.slice();

      homeNoticeShowList = homeNoticeShowList.map(item => typeof item === 'boolean' || !dayjs().isSame(dayjs(item), 'day') || item);
      const allShow = homeNoticeShowList.every(item => item === true);

      dispatch(updateHomeNoticeList(allShow ? [] : homeNoticeShowList));

      // 未点击过 '今日不再显示'
      if (!homeNoticeShowList.length) {
        setModalObj({ ...modalObj, ...res[0] });
        setVisible(true);

        return;
      }

      const showNoticeIndex = homeNoticeShowList.findIndex(item => item === true);

      window.log('homeNoticeShowList', homeNoticeShowList);

      // 首页公告弹窗过滤出今日要显示的公告列表，若存在，则显示
      if (~showNoticeIndex) {
        setCurrArticleIndex(showNoticeIndex);
        setModalObj({ ...modalObj, ...res[showNoticeIndex] });
        setVisible(true);
      }
    }
  };

  const [isShowVerifyDialog, setIsShowVerifyDialog] = useState(false);

  const handleVerifyDialog = (isShow: boolean) => {
    setIsShowVerifyDialog(isShow);
  };

  useEffect(() => {
    window.log('用户信息', userInfoData);
    const homeNoticeShowStatus = store.getState()[ARTICLE].homeNoticeShowStatus;

    // 如果公告显示过了，就不再显示
    if (currArticleIndex === 0) {
      if (homeNoticeShowStatus) {
        handleOpenNoticeData();
      }
    }

    currArticleIndexRef.current = currArticleIndex;

    // 刷新重置相应状态
    // window.onbeforeunload = function() {
    //   // dispatch(updateHomeNoticeShowStatus(true));
    //   dispatch(updateHomeNoticeList([]));
    // };

    return () => {

    };
  }, [currArticleIndex]);

  return (
    <HomeContainer>
      <TopBarContainer>
        <TopBar />
      </TopBarContainer>
      <MainContentContainer>
        <WalletInfoContainer>
          <div className="wallet-info">
            <LoginStatus onClick={() => { handleVerifyDialog(true); }} />
            <div className='wallet-main-content'>
              <Balance />
              <WalletAddress />
            </div>
          </div>
        </WalletInfoContainer>
        <Bulletin />
        <MySlider />
        <DealInfo />
        <DealBtn />
        <MyPendingOrder />
        <button onClick={userInfo}>获取用户信息</button>
      </MainContentContainer>
      <IModal
        visible={visible}
        bgImg={modalObj.img}
        onClose={onClose}
        CloseBtn={modalObj.img ? CloseBtn : false}
        onCheck={(e: boolean) => { onCheck(e); }}
        showToday
        submit={{
          name: '提交',
          async onClick() {
            onClose();
          }
        }}>
        <ModalPlainTextContainer>
          {
            !modalObj.img &&
              <React.Fragment>
                <div className="title">{modalObj.title}</div>
                <div className="plain-text" dangerouslySetInnerHTML={{ __html: modalObj.content }}></div>
              </React.Fragment>
          }
        </ModalPlainTextContainer>
      </IModal>
      {
        isShowVerifyDialog && <VerifyDialog handleDialog={handleVerifyDialog} />
      }
    </HomeContainer>
  );
};

export default Home;
