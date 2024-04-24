import { Column } from '@/components/flex';
import { useNavigate } from 'react-router-dom';

const SelfSelectCrypto = () => {
  const navigate = useNavigate();
  const to = (path: string) => { navigate(path); };

  return (
    <Column>
      <div className='content'>
        555
      </div>
      自选买币
      <div onClick={() => { to('/crypto/selfSelectDetail'); }}>自选买币详情</div>
    </Column>
  );
};

export default SelfSelectCrypto;
