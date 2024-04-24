import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RuleSet, css, styled } from 'styled-components';
import { Column, Row } from '@/components/flex';
import MyImg from '@/components/MyImg';
import { useCountryIcon } from '@/hooks/auth.hooks';
import { getCaptchaApi } from '@/apis/auth';
import { CaptchaContainer, LeftIconContainer, MobileLeftIconContainer, RightIconContainer } from '../login.styled';
import useCountryData from '../hooks/useCountryData';
import KeepAlive from 'react-activation';
import { useAppSelector } from '@/store';
import { fingerprintSelector } from '@/store/slices/entry.slice';
import { countryCodeSelector, userInfoSelector } from '@/store/slices/auth.slice';
export type ChangeValue = Array<{ key: string, value: string }>;
interface DataProps {
  value: string
  error: string
  type: 'text' | 'password' | 'number'
  key: string
  onChange: (data: ChangeValue) => void
  placeholder?: string
  disabled?: boolean
  style?: React.CSSProperties
  className?: string
  typeKey: string
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void

}
interface InputDataProps {
  value: string
  type: 'text' | 'password' | 'number'
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}
interface MyinputContainerProps {
  css: RuleSet<{ index: number }>
  index: number
}
const defaultCss = css<{ index: number }>``;
const InputContentView = styled(Column)`
  width: 100%;
  height:124rem;
  position: relative;
  .error{
    color: red;
    font-size: 12rem;
    position: absolute;
    bottom: 0;
    right: 20rem;
    animation: error 0.3s;
    z-index: 1;
    @keyframes error{
      0%{
        opacity: 0;
        bottom: 20rem;
      }
      100%{
        opacity: 1;
        bottom: 0;
      }
    }
  }
`;
const InputView = styled(Row)<MyinputContainerProps>`
  width: 100%;
  height: 79rem;
  background-color: #ebf1f6;
  padding: 0 25rem;
  border-radius: 7rem;
  position: relative;
  z-index: 2;
  ${({ css }) => css as any}
  /* 根据index 动画延迟 */
  animation-delay: ${({ index }) => index * 0.1}s;
  /* margin-bottom: 20rem; */
  input{
    padding: 0 10rem;
    border: none;
    flex:1;
    height: 100%;
    background-color: transparent;
  }
`;

interface InputItemProps {
  formData?: any
  item: DataProps
  index: number
  css: RuleSet<{ index: number }>
}

interface RightIconProps {
  icon?: React.FC | string
  type?: 'text' | 'password' | 'number'
  click?: (data: ChangeValue) => void
}

const RightIcon: React.FC<RightIconProps> = (props) => {
  const { icon: Icon, click, type = '' } = props;
  const handleClick = () => {
    if (click && type) {
      click([{ key: 'type', value: type === 'password' ? 'text' : 'password' }]);
    }
  };

  return (
    <RightIconContainer justify='center' align='center' onClick={handleClick}>
      {Icon && (
        typeof Icon === 'string'
          ? <div className="icon"> <MyImg loading={false}
            src={`/files/auth/icon/${Icon}`}
            style={{
              objectFit: 'contain'
            }} /></div>
          : <Icon />)
      }
    </RightIconContainer>
  );
};

interface LeftIconProps {
  icon: string
}
const LeftIcon = ({ icon }: LeftIconProps) => {
  return (
    <LeftIconContainer justify='center' align='center' >
      <div className="icon">
        <MyImg loading={false}
          src={`/files/auth/icon/${icon}`}
          style={{
            objectFit: 'contain'
          }} />
      </div>
    </LeftIconContainer>
  );
};

export const MobileLeftIcon = () => {
  const nav = useNavigate();
  const { imgUrl } = useCountryIcon();
  const currentCountry = useAppSelector(countryCodeSelector).current;
  const { countryCode, phoneCode } = useAppSelector(userInfoSelector);
  const { countryData, form } = useCountryData();

  const handleClick = () => {
    nav('/chooseCountry', {
      state: {
        formPath: form
      }
    });
  };

  return (
    <MobileLeftIconContainer>
      <LeftIcon icon="mobile.png" />
      <Row className="phone-view" justify='space-around' align='center' onClick={handleClick}>
        <div className="conuntry-icon">
          <MyImg loading={false}
            src={imgUrl(currentCountry?.country_code ?? countryData.country_code)}
            style={{
              height: 'auto'
            }} />
        </div>
        <Row className="phone-code">
          {currentCountry?.phone_code ?? countryData.phone_code}
        </Row>
        <div className="arrows-view">
          <MyImg loading={false} src="/files/auth/icon/arrows.svg" />
        </div>
      </Row>
    </MobileLeftIconContainer>
  );
};
// 验证输入框右侧组件
interface CodeRightIconProps {
  imgtype: 'login' | 'reg' | 'passw' | 'cleardev'
  formData?: any
  codeChange?: (...arg: any[]) => void
}
export const CodeRightIcon = (props: CodeRightIconProps) => {
  const { countryData, form } = useCountryData();
  const [src, setSrc] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [codeSend, setCodeSend] = useState<boolean>(false);
  const [countDown, setCountDown] = useState<number>(0);
  const fingerprint = useAppSelector(fingerprintSelector);
  const { imgtype, formData, codeChange } = props;
  // 是个图片
  const getCaptcha = async () => {
    // if (loading) return;
    if (countDown) return;

    setLoading(true);

    try {
      const { value: mobile, error }: { value: string, error: string } = formData.find((item: { key: string }) => item.key === 'mobile');

      if (!mobile || error) return;

      const res = await getCaptchaApi({
        mobile: countryData.phone_code + mobile,
        uuid: '',
        username: '',
        type: '1',
        internationalCode: countryData.phone_code
      });
      // const src = `data: image/jpeg;base64,${btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), ''))}`;

      codeChange?.([{ key: 'value', value: res.code }]);
      setSrc(src);
      setLoading(false);
      setCodeSend(true);
      setCountDown(5);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (!fingerprint) return;
    
    // 验证码倒计时
    let countDownId: number;

    if (countDown) {
      countDownId = window.setInterval(() => {
        const _countDown = countDown - 1;

        setCountDown(_countDown);

        if (_countDown === 0) {
          clearInterval(countDownId);
        }
      }, 1000);
    }
  
    return () => {
      clearInterval(countDownId);
    };
  }, [fingerprint,
    codeSend,
    countDown]);

  return (<CaptchaContainer onClick={getCaptcha}>
    {/* {src && <img src={src} alt="" />} */}
    {
      countDown
        ? `${countDown}秒`
        : codeSend
          ? '重新发送'
          : '发送验证码'
    }
  </CaptchaContainer>);
};
const InputContent: React.FC<InputItemProps> = ({ item, formData, index, css }) => {
  const loc = useLocation();
  const inputData: InputDataProps = {
    value: item.value,
    type: item.type,
    onChange(e: React.ChangeEvent<HTMLInputElement>) {
      item.onChange([{ key: 'value', value: e.target.value }]);
    }
  };

  if (item.placeholder) inputData.placeholder = item.placeholder;

  return (
    <InputContentView>
      <InputView css={css ?? defaultCss} index={index} className='input-view' key={item.key} justify='center' align='center' style={item.style} >
        {
          renderLeft(item)
        }
        <input className='input' {...inputData} />
        <KeepAlive id={loc.pathname} >
          {renderRight(item, formData)}
        </KeepAlive>
      </InputView>
      {
        item.error && <div className='error'>{item.error}</div>
      }
    </InputContentView>
  );
};
const renderLeft = (item: DataProps) => {
  if (item.typeKey === 'mobile') return (<MobileLeftIcon />);
  if (item.typeKey === 'psw') return (<LeftIcon icon="lock.png" />);
  if (item.typeKey === 'code') return (<LeftIcon icon="code.png" />);
};
const renderRight = ( item: DataProps, formData: any) => {
  const passwordType = item.key.toLowerCase().includes('password');
  let inputType: string;

  if (item.key === 'payPassword') {
    inputType = 'number';
  } else {
    inputType = 'text';
  }
  if (passwordType) return (<RightIcon type={item.type} click={() => { item.onChange([{ key: 'type', value: item.type === 'password' ? inputType : 'password' }]); }} icon={item.type === 'password' ? 'close.png' : 'open.png'} />);
  if (item.typeKey === 'code') return (<CodeRightIcon imgtype='login' formData={formData} codeChange={item.onChange}/>);
  if (item.key === 'mobile') return null;

  return null;
};

export default InputContent;
