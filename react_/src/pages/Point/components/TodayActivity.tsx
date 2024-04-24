import { Row, Column } from '@/components/flex';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MyImg from '@/components/MyImg';
import Task from '@/pages/Point/components/Task';
import { DAILYTASK } from '@/constant/point';

const TodayActivityContainer = styled.div`
  width: 100%;
  padding: 30rem 20rem;
  margin-bottom: 20rem;
  background-color: #fff;
  border-radius: 14rem;
  .container-title {
    font-size: 28rem;
    text-align: left;
    margin-bottom: 25rem;
    color: #13161b;
    span {
      color: #ffc000;
    }
  }
  .progressbar-container {
    position: relative;
    padding-left: 95rem;
    margin-bottom: 15rem;
    .progressbar-grey, .progressbar-yellow {
      position: absolute;
      left: 0;
      top: 23rem;
      height: 20rem;
    }
    .progressbar-grey {
      width: calc(100% - 20rem);
    }
    .progressbar-yellow {
      width: 140rem;
      left: -1rem;
      border-top-left-radius: 20rem;
      border-bottom-left-radius: 20rem;
    }
    .award-point-wrapper {
      position: relative;
      .award-point-value {
        margin-top: 8rem;
        font-size: 21rem;
        color: #ffc000;
      }
    }
    .point-80 {
      margin-top: -4rem;
    }
    .item-point-column {
      position: relative;
      margin-right: 49rem;
      &:nth-child(4) {
        margin-right: 0;
      }
      &:last-child {
        margin-left: auto;
        margin-right: 0;
      }
      [class*=point-] {
        position: relative;
        z-index: 9;
      }
      .light-step {
        position: absolute;
        top: -25rem;
        left: -20rem;
      }
      .received {
        position: absolute;
        top: 10rem;
        left: 6rem;
        z-index: 10;
      }
    }
  }
  .task-container {
    .task-tips {
      font-size: 25rem;
      color: #a1a7b2;
      text-align: left;
    }
  }
`;

const activityValue = 0;

const awardPointList = [
  {
    icon: '/files/point/point-10.png',
    point: 30,
    className: 'point-10',
    completed: 1
  },
  {
    icon: '/files/point/point-10.png',
    point: 60,
    className: 'point-10',
    completed: 0
  },
  {
    icon: '/files/point/point-30.png',
    point: 90,
    className: 'point-30',
    completed: 0
  },
  {
    icon: '/files/point/point-50.png',
    point: 120,
    className: 'point-50',
    completed: 0
  },
  {
    icon: '/files/point/point-80.png',
    point: 200,
    className: 'point-80',
    completed: 0
  }
];

const dailyTaskList = [
  {
    name: '每日签到',
    currValue: 0,
    targetValue: 1,
    awardValue: 5,
    status: 1
  },
  {
    name: '每日买币',
    currValue: 0,
    targetValue: 100,
    awardValue: 10,
    status: 0
  },
  {
    name: '每日卖币',
    currValue: 0,
    targetValue: 1,
    awardValue: 5,
    status: 0
  },
  {
    name: '每日上分',
    currValue: 0,
    targetValue: 100,
    awardValue: 20,
    status: 0
  },
  {
    name: '每日上分',
    currValue: 0,
    targetValue: 500,
    awardValue: 35,
    status: 0
  },
  {
    name: '每日上分',
    currValue: 0,
    targetValue: 1000,
    awardValue: 50,
    status: 0
  },
  {
    name: '每日下分',
    currValue: 0,
    targetValue: 100,
    awardValue: 30,
    status: 0
  },
  {
    name: '每日签到',
    currValue: 0,
    targetValue: 500,
    awardValue: 50,
    status: 0
  }
];
const TodayActivity = () => {
  const to = useNavigate();
  const onTodayActivity = () => {
    
  };

  return (
    <TodayActivityContainer>
      <div className='container-title'>今日活跃度：<span>{activityValue}</span></div>
      <div className='progressbar-container'>
        <MyImg src='/files/point/progressbar-grey.png' className='progressbar-grey'/>
        <MyImg src='/files/point/progressbar-yellow.png' className='progressbar-yellow'/>
        <Row className='award-point-wrapper'>
          {
            awardPointList.map(item => {
              return (
                <Column key={item.point} className='item-point-column'>
                  <div className={item.className}></div>
                  <div className='award-point-value'>{item.point}</div>
                  {
                    item.completed ? <div className='light-step'></div> : ''
                  }
                  {
                    item.completed ? <div className='received'></div> : ''
                  }
                </Column>
              );
            })
          }
        </Row>
      </div>
      <div className='task-container'>
        <div className='task-tips'>完成每日任务，获得活跃度!</div>
        <Task list={dailyTaskList} type={DAILYTASK} />
      </div>
    </TodayActivityContainer>
  );
};

export default TodayActivity;
