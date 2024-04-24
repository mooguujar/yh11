import MyImg from '@/components/MyImg';
import { styled } from 'styled-components';

const RowEntryContainer = styled.div`
  .icon {
    width: 44rem;
    margin-right: 11rem;
  }

  .entry-hr {
    width: 88%;
    border-bottom: 1px solid #d6dce8;
    right: 0;
    bottom: 0;
    position: absolute;
  }

  .entry-icon {
    width: 40rem;
    margin-right: 11rem;
  }
  
  .entry-icon.tall {
    width: 30rem;
    margin-left: 6rem;
    margin-right: 16.5rem;
  }

  .chervon-icon {
    width: 11rem;
    margin-left: 22rem;
  }

  .flex {
    display: flex;
    align-items:center;
  }

  .title {
    font-size: 28rem;
    color: #13161b;
  }

  .status {
    font-size: 22rem;
    color: #787f8c;

    &.red {
      color: red;
    }
  }
`;

const EntryRow = (props: {
  action?: Function
  title: string
  statusType: 'verify' | 'bind' | 'none'
  icon: string
  isDone?: boolean
  hasLine: boolean
  iconIsTall?: boolean
  isVersion?: boolean
}) => {
  const statusText = {
    verify: props.isDone ? '已认证' : '未认证',
    bind: props.isDone ? '已绑定' : '未绑定',
    none: ''
  };

  return (
    <RowEntryContainer onClick={() => { props.action && props.action(); }}>
      <div className="entry-row-container">
        <div className="flex entry-row">
          <div className="entry-icon">
            <div className={`${props.icon} ${props.iconIsTall ? 'tall' : ''}`}></div>
          </div>
          <div className="title">{props.title}</div>
        </div>
        {
          props.isVersion
            ? <div className="status">
              当前版本v0.1.1
            </div>
            : <div className={`status flex ${props.isDone ? '' : 'red'}`}>
              {
                statusText[props.statusType]
              }
              <MyImg className="chervon-icon" src='/files/mine/chervon-right.png' alt='verify' loading={false} />
            </div>
        }
        {
          props.hasLine && <div className="entry-hr" />
        }
      </div>
    </RowEntryContainer>
  );
};

export default EntryRow;
