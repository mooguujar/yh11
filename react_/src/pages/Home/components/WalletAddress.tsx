import { Row } from '@/components/flex';
import { styled } from 'styled-components';
import { getUserWalletAddressApi } from '@/apis/user';
import { useEffect, useState } from 'react';
import { getLoginStatus } from '@/utils/tools';
import { useClipboard } from 'use-clipboard-copy';
import Toast from '@/utils/toast';
import ISprite from '@/components/ISprite';

const WalletAddressContainer = styled(Row)`
  width: 100%;
  height: 56rem;
  padding: 0 10rem;
  background-color: #ebeef4;
  border-radius: 7rem;
  .wallet2 {
    margin-right: 10rem;
  }
  .wallet-hash-address {
    flex: 0 0 380rem;
    margin: 0 auto;
    color: #333333;
  }
`;
const WalletAddress = () => {
  const [address, setAddress] = useState('');
  const { isLogin, token = '' } = getLoginStatus();
  const walletCssProps = {
    url: '/sprites/home/sprite-home.png',
    backgroundSize: [323, 261],
    originSize: [41, 38],
    size: [28, 28],
    pos: [-242, -48]
  };
  const copyCssProps = {
    url: '/sprites/home/sprite-home.png',
    backgroundSize: [323, 261],
    originSize: [35, 35],
    size: [26, 25],
    pos: [-242, -190]
  };
  const getWalletAddress = async () => {
    try {
      const res = await getUserWalletAddressApi({
        token,
        mtype: 5,
        coin_name: 'TRX',
        coin_protocol: 'TRX',
        coin_wallet_api: 'TRX_SYS' || 'UDUNCLOUD',
        create: 0
      });

      window.log('钱包地址信息', res);
      setAddress(res[0]?.coin_address);
    } catch (error) {
      console.error(error);
    }
  };

  const clipboard = useClipboard({
    onSuccess() {
      Toast.show('复制成功');
    },
    onError() {
      console.log('Failed to copy text!');
    }
  });
  
  useEffect(() => {
    getWalletAddress();
  }, []);

  return (
    <WalletAddressContainer justify="space-between" align="center">
      <ISprite {...walletCssProps} className="wallet2" />
      <span>钱包地址</span>
      <span className='wallet-hash-address ellipsis'>{isLogin ? address : '--'}</span>
      <ISprite {...copyCssProps} onClick={() => { clipboard.copy(address); }}/>
    </WalletAddressContainer>
  );
};

export default WalletAddress;
