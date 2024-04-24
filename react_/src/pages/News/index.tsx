import { useNavigate } from 'react-router-dom';
import asd from '@/assets/images/asd.png';
import { styled } from 'styled-components';
const Img = styled.img`
  width: 100%;
`;
const MineContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
`;
const Mine = () => {
  const navigate = useNavigate();

  return (
    <MineContainer>
      <Img src={asd} alt="" />
      <button onClick={() => { navigate( '/auth/register' ); }}>注册</button>
    </MineContainer>
  );
};

export default Mine;
