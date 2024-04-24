import { RuleSet, css, styled } from 'styled-components';
import { Column, Row } from '@/components/flex';
import { useLocation, useNavigate } from 'react-router-dom';
import { spriteMineCss } from '@/components/Sprite';

const RealVerifyContainer = styled(Row)`
  width: 100%;
  padding: 0 30rem;
  /* 精灵图 */
  ${spriteMineCss as any}
`;

const TopBar = styled(Row)`
  width: 100%;
  display: block;
  .back-icon {
    position: absolute;
    left: 44rem;
    top: 33rem;
  }
  .bar-title {
    width: 100%;
    margin-top: 22rem;
    font-size: 33rem;
    text-align: center;
  }

  .desc {
    font-size: 22rem;
    color: #787f8c;
    text-align: left;
    margin-top: 33rem;
    margin-left: 11rem;
  }

  .steps {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 22rem auto;
    width: 100%;
  }

  .step-titles {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 22rem auto;
    width: 500rem;
  }


  .step-item {
    position: relative;
    width: 120rem;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44rem;
    height: 44rem;
    border-radius: 999px;
    background-color: #0b75ff;
  }

  .item-inner {
    width: calc(100% - 3px);
    height: calc(100% - 3px);
    border-radius: 999px;
    border: 1px solid #fff;
    background-color: #0b75ff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28rem;
    color: #fff;
  }

  .item-title {
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 55rem;
    width: 120rem;
    white-space: nowrap;
  }

  .step-dot {
    width: 22rem;
    height: 22rem;
    margin: 0 16rem;
    background-color: #787f8c;
    border-radius: 999px;
  }

`;

const Index = () => {
  const nav = useNavigate();

  return (
    <RealVerifyContainer>
      <TopBar>
        <div className="back-icon" onClick={() => { nav(-1); }}></div>
        <div className="bar-title">实名认证</div>
        <div className="desc">
          为保证您的账号安全，请先完成实名认证
        </div>
        <div className="steps">
          <div className="step-item">
            <div className="item">
              <div className="item-inner">
                1
              </div>
            </div>
            <div className="item-title">上传身份证</div>
          </div>
          <div className="step-dot"></div>
          <div className="step-dot"></div>
          <div className="step-dot"></div>
          <div className="step-dot"></div>
          <div className="step-dot"></div>
          <div className="step-dot"></div>
          <div className="step-item">
            <div className="item">
              <div className="item-inner">
                2
              </div>
            </div>
            <div className="item-title">人工审核</div>
          </div>
        </div>
      </TopBar>
    </RealVerifyContainer>
  );
};

export default Index;
