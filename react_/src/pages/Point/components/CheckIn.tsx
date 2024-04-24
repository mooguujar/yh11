import { Row, Column } from '@/components/flex';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MyImg from '@/components/MyImg';
import MyBtn from '@/components/MyBtn';
import ISprite from '@/components/ISprite';
const CheckInContainer = styled(Column)`
  width: 708rem;
  margin-top: 8rem;
  padding: 16rem 22rem 17rem 22rem;
  background-color: #fff;
  border-radius: 14rem;
  .tips {
    font-size: 19rem;
    color: #13161b;
  }
  .consequent-days, .tomorrow-get-point{
    color: #ff6d7f;
    margin: 0 5rem;
  }
  .card-container {
    gap: 30rem;
    margin: 15rem 0 18rem 0;
  }
  .item-card {
    width: 69rem;
    height: 83rem;
    line-height: 83rem;
    font-size: 25rem;
    color: #e4a41f;
    border-radius: 7rem;
  }
  .item-checked-in {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #aefe8b;
    & + .item-date {
      color: #787f8c;
    }
    img {
      width: 30rem;
      height: 20rem;
    }
  }
  .item-today {
    background-color: #fcf3b2;
    border: solid 3rem #e9a415;
    & + .item-date {
      color: #787f8c;
    }
  }
  .item-point {
    background-color: #fdf2db;
    & + .item-date {
      color: #abb1bb;
    }
  }
  .item-expires {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #c5c5c5;
    & + .item-date {
      color: #787f8c;
    }
    img {
      width: 22rem;
      height: 21rem;
    }
  }
  .item-date {
    margin-top: 4rem;
    font-size: 19rem;
  }
  .btn-check-in {
    width: 222rem;
    height: 56rem;
    font-size: 25rem;
    background-color: #ff4565;
    border-radius: 7rem;
    align-self: center;
  }
`;

const cardList = [
  {
    date: '7.11',
    status: true,
    score: 1
  },
  {
    date: '7.12',
    status: false,
    score: 1
  },
  {
    date: '7.13',
    status: false,
    score: 1
  },
  {
    date: '7.14',
    status: false,
    score: 1
  },
  {
    date: '7.15',
    status: false,
    score: 1
  },
  {
    date: '7.16',
    status: false,
    score: 1
  },
  {
    date: '7.17',
    status: false,
    score: 1
  }
    
];
const CheckIn = () => {
  const to = useNavigate();
  const checkedInCssProps = {
    url: '/sprites/point/sprite-point.png',
    backgroundSize: [473, 455],
    originSize: [42, 28],
    size: [30, 20],
    pos: [-289, -380]
  };
  const expiresCssProps = {
    url: '/sprites/point/sprite-point.png',
    backgroundSize: [473, 455],
    originSize: [31, 29],
    size: [22, 21],
    pos: [-249, -215]
  };
  const onCheckIn = () => {
    
  };

  return (
    <CheckInContainer align='flex-start'>
      <div className='tips'>已连续签到<span className='consequent-days'>0</span>天，明天签到<span className='tomorrow-get-point'>+2</span>积分</div>
      <Row className='card-container'>
        {
          cardList.map(item => {
            let className;

            if (item.date === '7.11') {
              className = item.status ? 'item-checked-in' : 'item-today';
            } else if (item.date > '7.11') {
              className = 'item-point';
            } else {
              className = item.status ? 'item-checked-in' : 'item-expires';
            }

            return (
              <Column key={item.date}>
                <div className={`item-card ${className}`}>
                  {
                    className === 'item-checked-in'
                      ? <ISprite {...checkedInCssProps} />
                      : className === 'item-expires'
                        ? <ISprite {...expiresCssProps} />
                        : `+${item.score}`
                  }
                </div>
                <div className='item-date'>{item.date === '7.11' ? '今天' : item.date}</div>
              </Column>
            );
          })
        }
      </Row>
      <MyBtn
        name='点击签到'
        className='btn-check-in'
        onClick={onCheckIn}
      />
    </CheckInContainer>
  );
};

export default CheckIn;
