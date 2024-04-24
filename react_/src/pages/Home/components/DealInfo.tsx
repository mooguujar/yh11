import { Column, Row } from '@/components/flex';
import { styled } from 'styled-components';
import { useAppSelector } from '@/store';
import { tokenSelector } from '@/store/slices/auth.slice';
import { buySellCoinInfoApi } from '@/apis/buySellCoin';
import { useEffect, useState } from 'react';
const DealInfoContainer = styled(Row)`
  width: 100%;
  height: 140rem;
  margin: 17rem 0;
  background-color: #fff;
  border-radius: 14rem;
  .deal-info-item {
    position: relative;
    flex: 1;
    justify-content: center;
    height: 100rem;
    color: #868d9a;
    &.hairline-border::after {
      border: 0 !important;
      border-left: 1px solid #d6dce8 !important;
      border-right: 1px solid #d6dce8 !important;
    }
    .item-amount {
      margin-right: 5rem;
      font-size: 31rem;
      color: #13161b;
    }
    .item-GDB {
      font-size: 28rem;
    }
    .item-title {
      font-size: 26rem;
    }
  }
`;

const GDB = 'GDB';
const DealInfo = () => {
  const token = useAppSelector(tokenSelector);
  const [DealInfoItemList, setDealInfoItemList] = useState(
    [
      {
        id: 1,
        title: '卖单金额',
        amount: 0.00
      },
      {
        id: 2,
        title: '买币交易中',
        amount: 0.00
      },
      {
        id: 3,
        title: '卖币交易中',
        amount: 0.00
      }
    ]
  );
  const mType = 5;
  const getBuySellCoinInfo = async () => {
    try {
      const res = await buySellCoinInfoApi({
        token,
        mtype: mType
      });
  
      if (res) {
        const data = res.wallets[mType];
  
        window.log('买卖币资讯', res);
  
        setDealInfoItemList([
          {
            id: 1,
            title: '卖单金额',
            amount: data.remaining_num
          },
          {
            id: 2,
            title: '买币交易中',
            amount: data.trans.buy
          },
          {
            id: 3,
            title: '卖币交易中',
            amount: data.trans.sell
          }
        ]);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getBuySellCoinInfo();
  }, []);
  
  return (
    <DealInfoContainer align="center">
      {
        DealInfoItemList.map((item) => {
          const className = item.id === 2 ? 'deal-info-item hairline-border' : 'deal-info-item';

          return (
            <Column key={item.id} className={className}>
              <div>
                <span className='item-amount'>{item.amount.toFixed(2)}</span>
                <span className='item-GDB'>{GDB}</span>
              </div>
              <div className='item-title'>{item.title}</div>
            </Column>
          );
        })
      }
    </DealInfoContainer>
  );
};

export default DealInfo;
