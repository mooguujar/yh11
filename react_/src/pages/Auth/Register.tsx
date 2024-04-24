import { useMemo, useState } from 'react';
import FootView from './components/FootView';
import InputContent from './components/Myinput';
import { InputCss, LoginContainer, MyinputContainer } from './login.styled';
import { ChangeValue, StateProps, inputChange, phoneCheckMap, PhoneCheckProps } from './tools';
import MyBtn from '@/components/MyBtn';
import Toast from '@/utils/toast';
import { registerThunk } from '@/store/actions/auth.thunk';
import useCountryData from '@/pages/Auth/hooks/useCountryData';
import { useAppDispatch, useAppSelector } from '@/store';
import { fingerprintSelector } from '@/store/slices/entry.slice';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { countryData } = useCountryData();
  const fingerprint = useAppSelector(fingerprintSelector);
  const [mobile, setMobile] = useState<StateProps>({
    value: '',
    error: '',
    type: 'text'
  });
  const [mobileCode, setMobileCode] = useState<StateProps>({
    value: '',
    error: '',
    type: 'number'
  });
  const [password, setPassword] = useState<StateProps>({
    value: '',
    error: '',
    type: 'password'
  });
  const [rePassword, setRePassword] = useState<StateProps>({
    value: '',
    error: '',
    type: 'password'
  });
  const [payPassword, setPayPassword] = useState<StateProps>({
    value: '',
    error: '',
    type: 'password'
  });

  const mobileOnChange = (data: ChangeValue) => {
    // const reg = /^1[3456789]\d{9}$/;
    const reg = phoneCheckMap[countryData.phone_code as keyof PhoneCheckProps];
    const isValue = data.find((item) => item.key === 'value');
    const fullPhoneValue = countryData.phone_code + (isValue?.value ?? '');

    if (isValue && !reg.test(fullPhoneValue)) {
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
  const mobileCodeOnChange = (data: ChangeValue) => {
    const reg = /^\d{6}$/;
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

    inputChange(setMobileCode)(data);
  };
  const passwordOnChange = (data: ChangeValue) => {
    const isValue = data.find((item) => item.key === 'value');

    if (isValue && isValue.value.length < 6) {
      data.push({
        key: 'error',
        value: '密码长度不能小于6位'
      });
    } else {
      data.push({
        key: 'error',
        value: ''
      });
    }

    inputChange(setPassword)(data);
  };
  const rePasswordOnChange = (data: ChangeValue) => {
    const isValue = data.find((item) => item.key === 'value');

    if (isValue && isValue.value !== password.value) {
      data.push({
        key: 'error',
        value: '两次密码不一致'
      });
    } else {
      data.push({
        key: 'error',
        value: ''
      });
    }

    inputChange(setRePassword)(data);
  };
  const payPasswordOnChange = (data: ChangeValue) => {
    const reg = /^\d{6}$/;
    const isValue = data.find((item) => item.key === 'value');

    if (isValue && !reg.test(isValue.value)) {
      data.push({
        key: 'error',
        value: '支付密码错误'
      });
    } else {
      data.push({
        key: 'error',
        value: ''
      });
    }

    inputChange(setPayPassword)(data);
  };
  const inputProps = useMemo(() => {
    return [
      {
        key: 'mobile',
        placeholder: '手机号码',
        typeKey: 'mobile',
        onChange: mobileOnChange,
        ...mobile
      },
      {
        key: 'mobileCode',
        placeholder: '请输入手机验证码',
        typeKey: 'code',
        onChange: mobileCodeOnChange,
        ...mobileCode
      },
      {
        key: 'password',
        placeholder: '请输入登录密码',
        typeKey: 'psw',
        onChange: passwordOnChange,
        ...password
      },
      {
        key: 'rePassword',
        placeholder: '请再次输入登录密码',
        typeKey: 'psw',
        onChange: rePasswordOnChange,
        ...rePassword
      },
      {
        key: 'payPassword',
        placeholder: '请设置6位支付密码',
        typeKey: 'psw',
        onChange: payPasswordOnChange,
        ...payPassword
      }
    ];
  }, [
    mobile,
    mobileCode,
    password,
    rePassword,
    payPassword
  ]);
  const onRegister = async () => {
    if (!mobile.value) return Toast.show('请输入手机号码');
    if (!mobileCode.value) return Toast.show('请输入手机验证码');
    if (!password.value) return Toast.show('请输入密码');
    if (password.value !== rePassword.value) return Toast.show('两次密码不一致');
    if (!payPassword.value) return Toast.show('请输入支付密码');
    if (mobile.error) return Toast.show(mobile.error);
    if (password.error) return Toast.show(password.error);
    if (payPassword.error) return Toast.show(payPassword.error);

    const params = {
      country_code: countryData.country_code,
      internationalcode: countryData.phone_code,
      username: countryData.phone_code + mobile.value,
      mobile: countryData.phone_code + mobile.value,
      mobilecode: mobileCode.value,
      pass: password.value,
      passcheck: rePassword.value,
      transpw: payPassword.value
    };

    await dispatch(registerThunk.asyncThunk(params));
    navigate('/auth/login');
  };

  return (
    <LoginContainer justify='space-between' align='center'>
      <div className='content-view'>
        <MyinputContainer>
          {
            inputProps.map((item, index) => {
              return <InputContent key={item.key} item={item} formData={inputProps} index={index} css={InputCss} />;
            })
          }
        </MyinputContainer>
      </div>
      <FootView>
        <MyBtn name='注册'
          onClick={onRegister} />
      </FootView>
    </LoginContainer>
  );
};

export default Register;
