import { Row } from '@/components/flex';
import { styled } from 'styled-components';
const ForgetContainer = styled(Row)`
  width: 100%;
  height: 50rem;
  padding: 0 20rem;
  font-size: 28rem;
  line-height: 45rem;
  color: #0b75ff;
`;
const Forget = () => {
  const handleClick = () => {

  };

  return (
    <ForgetContainer justify="flex-end" align="center">
      <span onClick={handleClick}>
      忘记密码
      </span>
    </ForgetContainer>
  );
};

export default Forget;
