import { Column, Row } from '@/components/flex';
import { styled } from 'styled-components';
import MyImg from '@/components/MyImg';
import { useEffect, useState } from 'react';
import { IBuyOrder, ISellOrder } from '@/store/types/buySellCoin';
import { myBuyOrdersApi, mySellOrdersApi } from '@/apis/buySellCoin';
import { useAppSelector } from '@/store';
import { tokenSelector } from '@/store/slices/auth.slice';
import { useNavigate } from 'react-router-dom';
import ISprite from '@/components/ISprite';

const MyPendingOrderContainer = styled.div`
  width: 100%;
  margin-top: 15rem;
  background-color: #fff;
  border-radius: 14rem;
  .header {
    height: 76rem;
    padding-left: 13rem;
    font-size: 28rem;
    color: #13161b;
    .go-banzhuan {
      padding: 8rem 15rem;
      color: #fff;
      background-color: #ffa800;
      border-top-left-radius: 30rem;
      border-bottom-left-radius: 30rem;
      white-space: nowrap;
      .icon-banzhuan {
        margin-right: 10rem;
      }
    }
  }
`;
const OrderContainer = styled.div`
  padding: 0 10rem;
  .title-bar {
    height: 40rem;
    padding-left: 15rem;
    font-size: 24rem;
    color: #868d9a;
    background-color: #ebeef4;
    border-radius: 14rem;
  }
  .table-th {
    height: 66rem;
    font-size: 22rem;
    color: #868d9a;
    .th-order-num {
      flex: 3;
    }
    div:not(.th-order-num) {
      flex: 2;
    }
  }
  .no-data-container {
    img {
      width: 140rem;
      height: 110rem;
    }
    .text-no-data {
      width: 100%;
      margin-bottom: 22rem;
    }
  }
`;

interface OrderProps {
  title: string
  list: IBuySellOrder
}
type IBuySellOrder = IBuyOrder[] | ISellOrder[];
const OrderView: React.FC<OrderProps> = (props) => {
  const { title, list } = props;

  return (
    <OrderContainer>
      <Row className="title-bar">{title}</Row>
      <Row className='table-th'>
        <div className='th-order-num'>订单号</div>
        <div className='th-amount'>金额</div>
        <div className='th-status'>状态</div>
      </Row>
      {
        list.length
          ? list.map((item: IBuyOrder | ISellOrder) => {
            return (
              <Row key={item.order_id}>
                <div>{item.order_id}</div>
                <div>{(item as IBuyOrder).buy_num ?? (item as ISellOrder).sell_num}</div>
                <div>{item.status}</div>
              </Row>
            );
          })
          : <Column className='no-data-container'>
            <MyImg src='/files/home/noData.png' />
            <div className='text-no-data'>暂无数据</div>
          </Column>
      }
    </OrderContainer>
  );
};

const MyPendingOrder = () => {
  const token = useAppSelector(tokenSelector);
  const navigate = useNavigate();
  const [buyOrderList, setBuyOrderList] = useState<IBuyOrder[]>([]);
  const [sellOrderList, setSellOrderList] = useState<ISellOrder[]>([]);
  const banzhuanCssProps = {
    url: '/sprites/home/sprite-home.png',
    backgroundSize: [323, 261],
    originSize: [51, 45],
    size: [36, 32],
    pos: [-53, -179]
  };
  
  const getMyBuyOrderList = async () => {
    try {
      const res = await myBuyOrdersApi({
        token
      });

      window.log('我的买单', res);

      if (res.count) {
        setBuyOrderList(res.list);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getMySellOrderList = async () => {
    try {
      const res = await mySellOrdersApi({
        token
      });

      window.log('我的卖单', res);

      if (res.count) {
        setSellOrderList(res.list);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    getMyBuyOrderList();
    getMySellOrderList();
  }, []);

  return (
    <MyPendingOrderContainer>
      <Row justify='space-between' className='header'>
        <div>我的挂单</div>
        <Row justify='space-between' className='go-banzhuan' onClick={() => { navigate('/crypto'); }}>
          <ISprite {...banzhuanCssProps} className='icon-banzhuan' />
          <div>搬砖赚钱</div>
        </Row>
      </Row>
      <OrderView title='买币' list={buyOrderList} />
      <OrderView title='卖币' list={sellOrderList} />
    </MyPendingOrderContainer>
  );
};

export default MyPendingOrder;
