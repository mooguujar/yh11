import MyImg from '@/components/MyImg';
import { Column, Row } from '@/components/flex';
import { styled } from 'styled-components';

const LogoViewContainer = styled(Column)`
  width: 100%;
  height: 314rem;
  .logo{
    width: 139rem;
    height: 139rem;
  }
`;
const LogoView = () => {
  return (
    <LogoViewContainer justify="center" align="center">
      <Row className="logo" justify='center' align='center' >
        <MyImg src="/files/logo.png" webp />
      </Row>
    </LogoViewContainer>
  );
};

export default LogoView;
