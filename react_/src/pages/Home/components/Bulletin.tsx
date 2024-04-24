import { Column, Row } from '@/components/flex';
import { styled } from 'styled-components';
import { articleListApi } from '@/apis/article';
import React, { useState, useEffect } from 'react';
import Marquee from '@/components/Marquee';
import IModal from '@/components/IModal';
import { StateProps } from '@/pages/Home/types';
import { IArticleListType } from '@/store/types/article';
import ISprite from '@/components/ISprite';
const BulletinContainer = styled(Row)`
  width: 100%;
  height: 50rem;
  margin: 10rem 0;
  font-size: 26rem;
  .icon-bulletin {
    margin-right: 10rem;
  }
  .marquee {
    height: 50rem;
  }
  .item-notice {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 50rem;
    margin-bottom: 20rem;
  }
`;
const ModalContentContainer = styled(Column)`
  width: 90%;
  margin: 0 auto;
  background-color: #fff;
  .title {
    margin-top: 35rem;
    font-size: 29rem;
    color: #13161b;
  }
  .content {
    margin: 33rem 0 35rem 0;
    font-size: 25rem;
    color: #787f8c;
    text-align: justify;
    img {
      width: 100%;
      margin-top: 20rem;
    }
  }
`;
const Bulletin = () => {
  const [noticeData, setNoticeData] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [modalObj, setModalObj] = useState<StateProps>({
    title: '',
    content: ''
  });
  const bulletinCssProps = {
    url: '/sprites/home/sprite-home.png',
    backgroundSize: [323, 261],
    originSize: [45, 33],
    size: [32, 24],
    pos: [-242, -140]
  };

  const NoticeView = (data: any[]) => {
    const openNotice = (notice: IArticleListType) => {
      setModalObj({
        title: notice.title,
        content: notice.content
      });
      setVisible(true);
    };

    return data.map((item, index) => {
      return (
        <div className='item-notice' key={index} onClick={() => { openNotice(item); }}>
          {item.title}
        </div>
      );
    });
  };
  const handleRollingNoticeData = async () => {
    try {
      const res = await articleListApi({
        bind_key: 'RollingNotice'
      });

      if (res.length) {
        setNoticeData(NoticeView(res));
      }

      window.log('滚动公告内容', res);
    } catch (error) {
      console.error(error);
    }
  };
  const onClose = () => {
    setVisible(false);
  };
  const CloseBtn = () => {
    return (
      <div className='close-dark'></div>
    );
  };

  useEffect(() => {
    handleRollingNoticeData();
  }, []);
  
  return (
    <BulletinContainer align="center">
      <ISprite {...bulletinCssProps} className='icon-bulletin' />
      {noticeData.length && <Marquee list={noticeData} />}
      <IModal
        visible={visible}
        onClose={onClose}
        CloseBtn={CloseBtn}
        onCheck={(e: boolean) => { console.log('e', e); }}
        submit={{
          name: '提交',
          async onClick() {
            onClose();
          }
        }}>
        <ModalContentContainer>
          <div className="title">{modalObj.title}</div>
          <div className="content" dangerouslySetInnerHTML={{ __html: modalObj.content }}></div>
        </ModalContentContainer>
      </IModal>
    </BulletinContainer>
  );
};

export default Bulletin;
