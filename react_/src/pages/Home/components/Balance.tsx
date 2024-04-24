import { Row } from '@/components/flex';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store';
import { userInfoSelector } from '@/store/slices/auth.slice';
import { getLoginStatus } from '@/utils/tools';
const BalanceContainer = styled(Row)`
  width: 100%;
  height: 145rem;
  .text-balance {
    
  }
  .balance-content {
    font-size: 49rem;
    .balance-value {
      color: #13161b;
      margin-right: 5rem;
    }
  }
  .text-funding-details {
    color: #0b75ff;
  }
`;
const Balance = () => {
  const to = useNavigate();
  const { cash } = useAppSelector(userInfoSelector);
  const { isLogin } = getLoginStatus();
  
  const goFundingDetails = () => {
    if (!isLogin) {
      to('/auth/login');
    } else {
      to('/fundingDetails');
    }
  };

  return (
    <BalanceContainer justify="space-around" align="center">
      <div className='text-balance'>余额</div>
      <div className='balance-content'>
        <span className='balance-value'>{(+cash).toFixed(2)}</span>
        <span className='GDB'>GDB</span>
      </div>
      <div className='text-funding-details' onClick={goFundingDetails}>资金明细</div>
    </BalanceContainer>
  );
};

export default Balance;
