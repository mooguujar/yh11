import React, { useState } from 'react';
import { Row } from '@/components/flex';
import { styled } from 'styled-components';
import { useAppSelector } from '@/store';
import { isUserLoggedInSelector, userInfoSelector } from '@/store/slices/auth.slice';
import ISprite from '@/components/ISprite';
const LoginStatusContainer = styled(Row)`
  width: 100%;
  height: 56rem;
  padding: 0 18rem 0 13rem;
  font-size: 26rem;
  color: #13161b;
  background-color: #ebeef4;
  .IDCard {
    margin-right: 13rem;
  }
  .verified {
    margin-right: 11rem;
  }
  .text-unverified {
    color: #f84c00;
  }
`;

const LoginSuccessView = (props: { onClick: (val: boolean) => void }) => {
  const { nickname, verified_status } = useAppSelector(userInfoSelector);
  const IDCardCssProps = {
    url: '/sprites/home/sprite-home.png',
    backgroundSize: [323, 261],
    originSize: [56, 40],
    size: [39, 28],
    pos: [-109, -179]
  };
  const verifiedCssProps = {
    url: '/sprites/home/sprite-home.png',
    backgroundSize: [323, 261],
    originSize: [50, 50],
    size: [35, 35],
    pos: [-187, 0]
  };

  return (
    <React.Fragment>
      <div>{nickname}</div>
      {
        verified_status
          ? <Row>
            <ISprite {...verifiedCssProps} className='verified' />
            <div className='text-verified'>已实名</div>
          </Row>
          : <Row onClick={ () => { props.onClick(true); } }>
            <ISprite {...IDCardCssProps} className='IDCard' />
            <div className='text-unverified'>请先实名</div>
          </Row>
      }
    </React.Fragment>
  );
};
const LoginStatus = (props: { onClick: (val: boolean) => void }) => {
  const { isLogin } = useAppSelector(isUserLoggedInSelector);

  return (
    <LoginStatusContainer justify="space-between" align="center">
      {
        isLogin
          ? <LoginSuccessView onClick={ () => { props.onClick(true); } } />
          : <div>请登录</div>
      }
    </LoginStatusContainer>
  );
};

export default LoginStatus;
