import { Row, Column } from '@/components/flex';
import { styled } from 'styled-components';
import { MouseEventHandler } from 'react';
import { DAILYTASK } from '@/constant/point';

const TaskContainer = styled(Column)`
  width: 100%;
  padding: 0 15rem;
  font-size: 25rem;
  gap: 10rem;
  .item-name {
    color: #787f8c;
  }
  .item-curr-value {
    margin: 0 auto 0 33rem;
  }
  .item-award-value {
    margin: 0 33rem 0 auto;
  }
  .item-fields {
    height: 60rem;
    line-height: 60rem;
  }
  .item-status {
    width: 112rem;
  }
  .item-completed {
    width: 100%;
    .item-curr-value, .item-award-value, .item-status {
      color: #58cf00;
    }
  }
  .item-go-do{
    width: 100%;
    .item-curr-value, .item-award-value {
      color: #ff6d7f;
    }
    .item-status {
      background-color: #ff4565;
      border-radius: 7rem;
      color: #fff;
    }
  }
`;

interface IList {
  name: string
  currValue: number
  targetValue: number
  awardValue: number
  status: number
}
interface Props {
  list: (IList)[]
  type: number
  style?: React.CSSProperties
  className?: string
  onClick?: MouseEventHandler
}
const Task: React.FC<Props> = (props) => {
  const { list, type = 1 } = props;

  return (
    <TaskContainer>
      {
        list.map((item, index) => {
          const className = item.status ? 'item-completed' : 'item-go-do';

          return (
            <Row key={index} className={className} justify='space-between'>
              <div className='item-fields item-name'>{item.name}</div>
              <div className='item-fields item-curr-value'>{item.currValue}/{item.targetValue}{index === 0 ? '次' : '元'}</div>
              <div className='item-fields item-award-value'>+{item.awardValue}{type === DAILYTASK ? '活跃度' : '积分'}</div>
              <div className='item-fields item-status'>{item.status ? '已完成' : '去完成'}</div>
            </Row>
          );
        })
      }
    </TaskContainer>
  );
};

export default Task;
