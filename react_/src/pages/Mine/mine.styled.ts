import { Row } from '@/components/flex';
import { styled } from 'styled-components';

export const TopBarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 264rem;
  flex: 0 0 264rem;
  padding: 0 30rem 22rem;
  box-sizing: border-box;
  background-color: #0b75ff;
`;

export const TopBarContentView = styled(Row)`
  width: 100%;
  height: 90rem;
  align-items: flex-center;
  .mine-logo-container {
    position: absolute;
    top: 40rem;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    width: 200rem;
    color: white;
    font-size: 40rem;
  }
  .iconfont {
    color: #fff;
  }
  .icon-kefu {
    font-size: 40rem;
  }
  .icon-wenhao, .icon-letter {
    font-size: 36rem;
  }
`;

export const MineContentContainer = styled.div`
  padding: 22rem;
  width: 100%;

  .entry-row-container {
    width: 100%;
    height: 88rem;
    padding: 22rem 30rem;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    position: relative;
  }
`;

export const ProfileContainer = styled.div`
  width: 100%;
  height: 99rem;
  position: absolute;
  left: 0;
  bottom: 22rem;
  padding: 0 22rem;
  display: flex;
  justify-content: space-between;

  .avatar {
    width: 99rem;
    height: 99rem;
    border-radius: 15rem;
    background: #fff;
    position: relative
  }

  .avatar-input {
    width: 99rem;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 34rem;
    opacity: 0;
    z-index: 2;
  }

  .input-overlay {
    width: 99rem;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 34rem;
    opacity: 0;
    z-index: 3;
  }

  .camera-mask {
    width: 100%;
    height: 33rem;
    background-color: rgba(0,0,0, 0.5);
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .camera-mask img {
    width: 22rem;
    height: 22rem;
    margin: 0 auto;
  }

  .edit {
    width: 33rem;
    height: 33rem;
    margin-left: 11rem;
  }

  .chervon-icon {
    width: 11rem;
    height: 22rem;
    margin-left: 11rem;
  }

  .info {
    margin-left: 11rem;
    color: #fff;
  }

  .name {
    font-size: 33rem;
    text-align: left;
    display: flex;
    align-items: center;
  }

  .id {
    font-size: 22rem;
    color: #94c3ff;
    text-align: left;
  }

  .flex {
    display: flex;
    align-items: center;
  }

  .right {
    text-align: right;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .amount {
    font-size: 22rem;
    color: #94c3ff;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .money {
    font-weight: bold;
    font-size: 22rem;
    text-align: right;
    color: #fff;
    span {
      font-size: 33rem;
      font-weight: bold;
      display: inline-block;
      margin-right: 5rem;
      color: #fff;
    }
  }
  
`;
