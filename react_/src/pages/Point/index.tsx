import { Row, Column } from '@/components/flex';
import { styled } from 'styled-components';
import { PageTitle, PointInfo } from '@/pages/Point/Point.styled';
import { useAppSelector } from '@/store';
import { tokenSelector } from '@/store/slices/auth.slice';
import { useNavigate } from 'react-router-dom';
import CheckIn from '@/pages/Point/components/CheckIn';
import LuckyDraw from '@/pages/Point/components/LuckyDraw';
import TodayActivity from '@/pages/Point/components/TodayActivity';
import TotalTask from '@/pages/Point/components/TotalTask';
import { spritePointCss } from '@/components/Sprite';
import ISprite from '@/components/ISprite';

const PointContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 21rem;
  background: url(${`${process.env.REACT_APP_STATIC_PATH}/files/point/bg.webp`}) center / cover no-repeat;
  overflow: auto;

  /* 精灵图 */
  ${spritePointCss as any}
`;
const PointHome = () => {
  const to = useNavigate();
  const token = useAppSelector(tokenSelector);
  const isLogin = !!token;
  const helpCssProps = {
    url: '/sprites/point/sprite-point.png',
    backgroundSize: [473, 455],
    originSize: [40, 40],
    size: [28, 28],
    pos: [-244, -380]
  };
  const arrowRightCssProps = {
    url: '/sprites/point/sprite-point.png',
    backgroundSize: [473, 455],
    size: [9, 17],
    originSize: 0.7,
    pos: [-454, -193]
    // pos: [-454, -179]
  };
  
  return (
    <PointContainer>
      <PageTitle justify='center'>
        <div>会员积分</div>
        <ISprite {...helpCssProps} className="help" />
      </PageTitle>
      <PointInfo justify='space-between'>
        <Column>
          <Row className='point-show'>
            <div>积分</div>
            <div className='point-value'>
              {
                isLogin ? 1341234 : '未登录'
              }
            </div>
          </Row>
          <div className='point-clear-deadline'>积分清零时间：2022-12-30 00:00:10</div>
        </Column>
        <Row onClick={() => { to('/auth/login'); }}>
          <div className='text-point-details'>积分明细</div>
          <ISprite {...arrowRightCssProps} className="arrow-right" />
        </Row>
      </PointInfo>
      <CheckIn />
      <LuckyDraw />
      <TodayActivity />
      <TotalTask />
    </PointContainer>
  );
};

export default PointHome;
