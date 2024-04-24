import { styled } from 'styled-components';
import { Column } from '@/components/flex';
import MyImg from '@/components/MyImg';

const EmptyStampContainer = styled(Column)`
.no-data-container {
  margin-top: 120rem;
  img {
    width: 180rem;
    height: 130rem;
    margin: 0 auto 20rem;
  }
  .text-no-data {
    width: 100%;
    margin-bottom: 22rem;
    color: #999;
    font-size: 28rem;
  }
}
`;

const EmptyStamp = () => {
  return (
    <EmptyStampContainer>
      <Column className='no-data-container'>
        <MyImg src='/files/home/noData.png' />
        <div className='text-no-data'>暂无数据</div>
      </Column>
    </EmptyStampContainer>
  );
};

export default EmptyStamp;
