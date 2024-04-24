import { Row, Column } from '@/components/flex';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Task from '@/pages/Point/components/Task';
import { TOTALTASK } from '@/constant/point';
const TotalTaskContainer = styled.div`
  width: 100%;
  padding: 30rem 20rem;
  margin-bottom: 20rem;
  background-color: #fff;
  border-radius: 14rem;
  .container-title {
    font-size: 28rem;
    text-align: left;
    margin-bottom: 14rem;
    color: #13161b;
  }
`;

const dailyTaskList = [
  {
    name: '累计签到',
    currValue: 0,
    targetValue: 2,
    awardValue: 5,
    status: 1
  },
  {
    name: '累计买币',
    currValue: 0,
    targetValue: 1000,
    awardValue: 10,
    status: 0
  },
  {
    name: '累计卖币',
    currValue: 0,
    targetValue: 1000,
    awardValue: 10,
    status: 0
  },
  {
    name: '累计上分',
    currValue: 0,
    targetValue: 500,
    awardValue: 10,
    status: 0
  },
  {
    name: '累计下分',
    currValue: 0,
    targetValue: 500,
    awardValue: 10,
    status: 0
  }
];
const TotalTask = () => {
  const to = useNavigate();
  const onTotalTask = () => {
    
  };

  return (
    <TotalTaskContainer>
      <div className='container-title'>累计任务</div>
      <Task list={dailyTaskList} type={TOTALTASK} />
    </TotalTaskContainer>
  );
};

export default TotalTask;
