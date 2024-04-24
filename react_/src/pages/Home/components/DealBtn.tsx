import { Row } from '@/components/flex';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store';
import { tokenSelector, userInfoSelector } from '@/store/slices/auth.slice';
import ISprite from '@/components/ISprite';

const DealBtnContainer = styled(Row)`
  width: 100%;
  height: 90rem;
  gap: 22rem;
  .item-btn {
    flex: 1;
    height: 100%;
    font-size: 35rem;
    color: #fff;
    border-radius: 7rem;
    .icon {
      margin-right: 14rem;
    }
  }
  .btn-buy {
    background-color: #ec808d;
  }
  .btn-sell {
    background-color: #169bd5;
  }
  .btn-transfer {
    background-color: #00bfbf;
  }
  .btn-collect {
    background-color: #8080ff;
  }
`;

const DealBtnList = [
  {
    id: 1,
    title: '买币',
    className: 'buyCoin',
    path: '/crypto',
    cssProps: {
      url: '/sprites/home/sprite-home.png',
      backgroundSize: [323, 261],
      originSize: [42, 19],
      size: [31, 14],
      pos: [-84, -232]
    }
  },
  {
    id: 2,
    title: '卖币',
    className: 'sellCoin',
    path: '/crypto/sell',
    cssProps: {
      url: '/sprites/home/sprite-home.png',
      backgroundSize: [323, 261],
      originSize: [43, 19],
      size: [31, 14],
      pos: [-36, -232]
    }
  },
  {
    id: 3,
    title: '转账',
    className: 'transfer',
    path: '/crypto/transfer',
    cssProps: {
      url: '/sprites/home/sprite-home.png',
      backgroundSize: [323, 261],
      originSize: [48, 47],
      size: [33, 33],
      pos: [-242, 0]
    }
  },
  {
    id: 4,
    title: '收币',
    className: 'collectCoin',
    path: '/crypto/receive',
    cssProps: {
      url: '/sprites/home/sprite-home.png',
      backgroundSize: [323, 261],
      originSize: [34, 44],
      size: [24, 31],
      pos: [-242, -95]
    }
  }
];
const DealBtn = () => {
  const navigate = useNavigate();
  const userInfo = useAppSelector(userInfoSelector);
  const token = useAppSelector(tokenSelector);
  const isLogin = !!token;
  const verifiedStatus = userInfo.verified_status;
  const withdrawAddressList = [];
  
  const handleOk = () => {
    navigate('/realVerify');
  };
  const handleOk2 = () => {
    navigate('/addPayWay');
  };
  
  const handleDeal = (path: string) => {
    if (!verifiedStatus) {
      // return NiceModal.show( AppModal, { View: RealVerify, onOk() { navigate('/realVerify'); } });
    }
    if (!withdrawAddressList.length) {
      // return NiceModal.show( AppModal, { View: AddPayWay, onOk() { navigate('/addPayWay'); } });
    }

    navigate(path);
  };

  return (
    <DealBtnContainer align="center">
      {
        DealBtnList.map((item) => {
          let className;

          if (item.id === 1) {
            className = 'btn-buy';
          } else if (item.id === 2) {
            className = 'btn-sell';
          } else if (item.id === 3) {
            className = 'btn-transfer';
          } else {
            className = 'btn-collect';
          }

          return (
            <Row key={item.id} justify='center' className={`item-btn ${className}`}>
              <ISprite {...item.cssProps} className='icon' />
              <div onClick={() => { handleDeal(item.path); }}>{item.title}</div>
            </Row>
          );
        })
      }
    </DealBtnContainer>
  );
};

export default DealBtn;
