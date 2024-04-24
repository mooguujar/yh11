import { styled } from 'styled-components';
import { Row } from '@/components/flex';

export const PageTitle = styled(Row)`
  width: 100%;
  height: 110rem;
  font-size: 42rem;
  color: #fff;
  .help {
    margin-left: 10rem;
    transform: scale(0.9);
  }
`;

export const PointInfo = styled(Row)`
  width: 100%;
  height: 65rem;
  color: #fff;
  .point-show {
    width: 100%;
    font-size: 28rem;
    .point-value {
      margin-left: 13rem;
      font-size: 38rem;
    }
  }
  .point-clear-deadline {
    font-size: 17rem;
  }
  .text-point-details {
    margin-right: 16rem;
    font-size: 28rem;
  }
`;
