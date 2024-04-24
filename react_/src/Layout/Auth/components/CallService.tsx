import MyImg from '@/components/MyImg';
import { Row } from '@/components/flex';
import { styled } from 'styled-components';

const Header = styled(Row)`
  width: 100%;
  height: 51rem;
  padding: 0 41rem;
  .icon{
    width:38rem;
    height:34rem;
  }
`;
const CallService = () => {
  return (
    <Header justify="flex-end" align="flex-end">
      <div className="icon">
        <MyImg src="/files/auth/icon/service.png" />
      </div>
    </Header>
  );
};

export default CallService;
