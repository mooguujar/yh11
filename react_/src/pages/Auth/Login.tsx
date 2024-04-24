import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputCss, LoginContainer, MyinputContainer } from './login.styled';
import Forget from './components/Forget';
import MyBtn from '@/components/MyBtn';
import { useAppDispatch, useAppSelector } from '@/store';
import { countryCode, loginThunk } from '@/store/actions/auth.thunk';
import { userInfoSelector, updateUserInfo } from '@/store/slices/auth.slice';
import { fingerprintSelector, webSetWebRegSelector } from '@/store/slices/entry.slice';
import { IIsOpenRecaptcha } from '@/store/types/entry';
import InputContent from './components/Myinput';
import FootView from './components/FootView';
import { ChangeValue, StateProps, inputChange } from './tools';
import useCountryData from './hooks/useCountryData';
import Toast from '@/utils/toast';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const webSetWebReg = useAppSelector(webSetWebRegSelector);
  const fingerprint = useAppSelector(fingerprintSelector);
  const { mobile: _mobile = '', pass = '' } = useAppSelector(userInfoSelector);
  const { countryData } = useCountryData();
  const [mobile, setMobile] = useState<StateProps>({
    // value: process.env.REACT_APP_ENV === 'dev' ? '18987654321' : '',
    value: _mobile,
    error: '',
    type: 'text'
  });
  const [password, setPassword] = useState<StateProps>({
    // value: process.env.REACT_APP_ENV === 'dev' ? '1234qwer' : '',
    value: pass,
    error: '',
    type: 'password'
  });
  // 验证码
  const [code, setCode] = useState<StateProps>({
    value: '',
    error: '',
    type: 'text'
  });
  const isOpenRecaptcha = useMemo<IIsOpenRecaptcha>(() => {
    return (webSetWebReg?.is_open_recaptcha as IIsOpenRecaptcha)?.v
      ? webSetWebReg?.is_open_recaptcha as IIsOpenRecaptcha
      : {
        v: '0',
        n: '',
        id: ''
      };
  }, [webSetWebReg?.is_open_recaptcha]);
  const mobileOnChange = (data: ChangeValue) => {
    const regCN = /^1[3456789]\d{9}$/;
    const regTW = /^9[0-9]{8}$/;
    const isValue = data.find((item) => item.key === 'value');

    if (isValue && (!regCN.test(isValue.value) && !regTW.test(isValue.value))) {
      data.push({
        key: 'error',
        value: '手机号码格式不正确'
      });
    } else {
      data.push({
        key: 'error',
        value: ''
      });
    }

    inputChange(setMobile)(data);
  };
  const passwordOnChange = (data: ChangeValue) => {
    const reg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/);
    const isValue = data.find((item) => item.key === 'value');

    if (isValue && !reg.test(isValue.value)) {
      data.push({
        key: 'error',
        value: '密码格式不正确'
      });
    } else {
      data.push({
        key: 'error',
        value: ''
      });
    }

    inputChange(setPassword)(data);
  };
  const codeOnChange = (data: ChangeValue) => {
    const reg = new RegExp(/^[0-9]{4}$/);
    const isValue = data.find((item) => item.key === 'value');

    if (isValue && !reg.test(isValue.value)) {
      data.push({
        key: 'error',
        value: '验证码格式不正确'
      });
    } else {
      data.push({
        key: 'error',
        value: ''
      });
    }

    inputChange(setCode)(data);
  };
  const inputProps = useMemo(() => {
    const arr = [
      {
        key: 'mobile',
        placeholder: '手机号码',
        typeKey: 'mobile',
        onChange: mobileOnChange,
        ...mobile
      },
      {
        key: 'password',
        placeholder: '请输入登录密码',
        typeKey: 'psw',
        onChange: passwordOnChange,
        ...password
      }
    ];

    if (isOpenRecaptcha.v === '1') {
      arr.push( {
        key: 'code',
        placeholder: '请输入验证码',
        typeKey: 'code',
        onChange: codeOnChange,
        ...code
      });
    }

    return arr;
  }, [isOpenRecaptcha.v,
    mobile,
    password,
    code]);
  const onLogin = async () => {
    if (!mobile.value) return Toast.show('请输入手机号码');
    if (!password.value) return Toast.show('请输入密码');
    if (mobile.error) return Toast.show(mobile.error);
    if (password.error) return Toast.show(password.error);

    const params = {
      mobile: mobile.value.includes(countryData.phone_code) ? mobile.value : countryData.phone_code + mobile.value,
      pass: password.value,
      deviceid: fingerprint
    };

    await dispatch(loginThunk.asyncThunk(params));
    navigate('/');
  };

  useEffect(() => {
    dispatch(countryCode.asyncThunk({ cache: 2 }));
  }, []);
  
  return (
    <LoginContainer justify='space-between' align='center'>
      <div className='content-view'>
        <MyinputContainer>
          {
            inputProps.map((item, index) => {
              return <InputContent key={item.key} item={item} index={index} css={InputCss} />;
            })
          }
        </MyinputContainer>
        <Forget />
      </div>
      <FootView>
        <MyBtn name='登录'
          onClick={onLogin} />
      </FootView>
    </LoginContainer>
  );
};

export default Login;
