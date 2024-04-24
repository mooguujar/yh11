import React from 'react';
import { FooterView } from '../login.styled';
interface FootViewProps {
  children?: React.ReactNode
}
const FootView: React.FC<FootViewProps> = (props) => {
  return (
    <FooterView justify='flex-start' align='center'>
      <div className='buttom-view'>
        {/* <MyBtn name='登录'
        onClick={onLogin} /> */}
        {props?.children}
      </div>
      <div className="version-view">
        <span className="version">版本号：{process.env.REACT_APP_VERSION}</span>
      </div>
    </FooterView>
  );
};

export default FootView;
