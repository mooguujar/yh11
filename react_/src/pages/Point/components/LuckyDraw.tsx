import { Row, Column } from '@/components/flex';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
const LuckyDrawContainer = styled.div`
  position: relative;
  width: 100%;
  height: 460rem;
  margin: 30rem 0;
  background: url(${`${process.env.REACT_APP_STATIC_PATH}/files/point/lucky-draw.webp`}) center / cover no-repeat;
  .draw-middle-container {
    position: absolute;
    top: 97rem;
    left: 15rem;
    width: 680rem;
    height: 258rem;
    padding: 15rem 22rem;
    .award-loop-container {
      width: 472rem;
      min-width: 472rem;
      gap: 13rem;
      .item-award {
        width: 84rem;
        height: 105rem;
        justify-content: space-between;
        padding-bottom: 9rem;
        background-color: #fff;
        border-radius: 7rem;
        .icon-container {
          height: calc(100% - 28rem);
          transform: scale(0.85);
          .RMB-gold-box, .RMB-silver-box, .lucky-star, .point-8 {
            margin-top: 5rem;
          }
        }
        .award-name {
          font-size: 19rem;
          color: #cf0224;
        }
      }
    }
    .right-scroll-container {
      align-self: flex-start;
      margin-left: 10rem;
      color: #fff;
      .title {
        margin-bottom: 10rem;
        font-size: 24rem;
        color: #ffdae0;
        text-align: left;
      }
      .winning-record {
        width: 146rem;
        height: 166rem;
        gap: 10rem;
        font-size: 18rem;
        color: #fabe73;
        overflow: auto;
        .item-award-history {
          width: 100%;
          flex: 0 0 26rem;
        }
      }
    }
  }
  .lottery-container {
    position: absolute;
    left: 15rem;
    bottom: 15rem;
    width: calc(100% - 30rem);
    height: 80rem;
    .award-btn {
      position: relative;
      .discount {
        position: absolute;
        top: -18rem;
        right: -14rem;
        .discount-num {
          position: absolute;
          top: 26rem;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
          font-size: 17rem;
          color: #fff;
          white-space: nowrap;
        }
      }
    }
    .item-name {
      font-size: 25rem;
      color: #cf0224;
      font-weight: bold;
    }
    .item-required-point {
      font-size: 17rem;
      color: #bb7100;
    }
  }
`;

const winRecordList = [
  {
    userName: 'sdf',
    datetime: '18:30',
    value: 10,
    type: 1
  },
  {
    userName: 'sdf',
    datetime: '18:30',
    value: 10,
    type: 2
  },
  {
    userName: 'sdf',
    datetime: '18:30',
    value: 10,
    type: 1
  },
  {
    userName: 'sdf',
    datetime: '18:30',
    value: 30,
    type: 2
  },
  {
    userName: 'sdf',
    datetime: '18:30',
    value: 1000,
    type: 1
  },
  {
    userName: 'sdf',
    datetime: '18:30',
    value: 10,
    type: 1
  }
];

const awardLoopList = [
  {
    icon: '/files/point/RMB-10.png',
    className: 'RMB-4',
    value: 10,
    type: 1,
    cssProps: {
      url: '/sprites/point/sprite-point.png',
      backgroundSize: [473, 455],
      originSize: [42, 28],
      size: [30, 20],
      pos: [-289, -380]
    }
  },
  {
    icon: '/files/point/point-10-luck.png',
    className: 'point-1',
    value: 10,
    type: 2
  },
  {
    icon: '/files/point/RMB-jackpot.png',
    className: 'RMB-gold-box',
    value: 8888,
    type: 1
  },
  {
    icon: '/files/point/lucky-star.png',
    className: 'lucky-star',
    value: '福星高照',
    type: 3
  },
  {
    icon: '/files/point/point-50-luck.png',
    className: 'point-5',
    value: 50,
    type: 2
  },
  {
    icon: '/files/point/point-200-luck.png',
    className: 'point-8',
    value: 200,
    type: 2
  },
  {
    icon: '/files/point/RMB-point66.png',
    className: 'RMB-1',
    value: 0.66,
    type: 1
  },
  {
    icon: '/files/point/RMB-666.png',
    className: 'RMB-silver-box',
    value: 666,
    type: 1
  },
  {
    icon: '/files/point/point-3-luck.png',
    className: 'point-3',
    value: 3,
    type: 2
  },
  {
    icon: '/files/point/RMB-6.6.png',
    className: 'RMB-3',
    value: 6.6,
    type: 1
  }
];

const btnList = [
  {
    id: 1,
    name: '单抽',
    requiredPoint: 30,
    discount: 0
  },
  {
    id: 2,
    name: '十连抽',
    requiredPoint: 270,
    discount: 9
  },
  {
    id: 3,
    name: '五十连抽',
    requiredPoint: 1200,
    discount: 8
  }
];
const LuckyDraw = () => {
  const to = useNavigate();
  const onCheckIn = () => {
    
  };

  return (
    <LuckyDrawContainer>
      <Row className='draw-middle-container'>
        <Row className='award-loop-container' wrap='wrap'>
          {
            awardLoopList.map(item => {
              let suffix;

              if (item.type === 1) {
                suffix = '元';
              } else if (item.type === 2) {
                suffix = '积分';
              } else {
                suffix = '';
              }

              return (
                <Column key={item.icon} className='item-award'>
                  <Row justify='center' className='icon-container'>
                    <div className={item.className}></div>
                  </Row>
                  <div className='award-name'>{item.value}{suffix}</div>
                </Column>
              );
            })
          }
        </Row>
        <div className='right-scroll-container'>
          <div className='title'>中奖记录</div>
          <Column className='winning-record' align='flex-start'>
            {
              winRecordList.map(item => {
                const itemKey = item.userName + Math.random().toString();
                let suffix;

                if (item.type === 1) {
                  suffix = '元';
                } else if (item.type === 2) {
                  suffix = '积分';
                } else {
                  suffix = '';
                }

                return (
                  <div key={itemKey} className='item-award-history ellipsis'>{item.datetime}{item.userName}中奖{item.value}{suffix}</div>
                );
              })
            }
          </Column>
        </div>
      </Row>
      <Row className='lottery-container' justify='space-between'>
        {
          btnList.map(item => {
            return (
              <div key={item.id} className='award-btn'>
                <div className='item-name'>{item.name}</div>
                <div className='item-required-point'>({item.requiredPoint}积分)</div>
                {
                  item.discount
                    ? <div className='discount'><div className='discount-num'>{item.discount}折</div></div>
                    : ''
                }
              </div>
            );
          })
        }
      </Row>
    </LuckyDrawContainer>
  );
};

export default LuckyDraw;
