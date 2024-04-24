import { Column } from '@/components/flex';
import { styled } from 'styled-components';
// import './Quick.css';
//  QuickBuyCrypto;
export default () => {
  return (
    <QuickBuyCryptoContent>
      <div className='container'>
        <p className='buytext'>买币金额</p>
        <input type="text" />
        <p className='paytext'>付款方式</p>
        <div className='paypic'>
          <div>
            <img src="" alt="" />
            <img src="" alt="" />
            银行卡
          </div>
          <div>
            <img src="" alt="" />
            <img src="" alt="" />
            支付宝
          </div>
          <div>
            <img src="" alt="" />
            <img src="" alt="" />
            微信
          </div>
        </div>
        <div className='buyButton'>
          购买G币
        </div>
      </div>
    </QuickBuyCryptoContent>
  );
};

const QuickBuyCryptoContent = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ebf1f6;
  overflow: auto;
  padding: 20rem;
  .container {
    width: 708.3rem;
    height: 540.3rem;
    background-color: #ffffff;
    border-radius: 13.9rem;
    .buytext{
      width: 110.4rem;
      height: 27.1rem;
      font-family: MicrosoftYaHei;
      font-size: 27.8rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 33.3rem;
      letter-spacing: 0rem;
      color: #13161b;
    }
  }

`;
