import GetAsyncThunk from '../GetAsyncThunk';
import { AUTH } from '../sliceName';
import { ICountryCoin, ICountryCoinType, ILoginType, IMobileCodeType, IRegisterType } from '../types/auth';
import {
  CountryParams,
  LoginParams,
  RegisterParams,
  getCountryCode,
  loginApi,
  registerApi,
  mobileCodeApi, MobileCodeParams
} from '@/apis/auth';
export const loginThunk = new GetAsyncThunk<ILoginType, LoginParams>( {
  storeName: AUTH,
  path: 'login',
  async asyncFunc( prams ) {
    try {
      const response = await loginApi( prams );

      return response;
    } catch ( error ) {
      console.log( error );
      throw error;
    }
  },
  successCallback( state, action: any ) {
    const { country_code: countryCode, internationalcode: phoneCode, mobile, pass } = action?.meta?.arg || {};

    const _mobile = mobile.replace(phoneCode, '');
    const currentCountryInfo = state.countryCode.country_coin.find((item: ICountryCoin) => item.country_code === countryCode);

    state.token = action.payload.token;
    state.userInfo = { ...action.payload.info, mobile: _mobile, pass };
    state.editreview = action.payload.editreview;
    state.countryCode = { ...state.countryCode, current: currentCountryInfo };
  },
  failCallback( state, action) {
    console.log( action );
    throw action;
  }
} );

export const registerThunk = new GetAsyncThunk<IRegisterType, RegisterParams>( {
  storeName: AUTH,
  path: 'register',
  async asyncFunc( prams, thunkAPI ) {
    try {
      const response = await registerApi( prams );

      return response;
    } catch ( error ) {
      console.log( error );
      throw error;
    }
  },
  successCallback( state, action: any ) {
    const { country_code: countryCode, internationalcode: phoneCode, mobile, pass } = action?.meta?.arg || {};

    const _mobile = mobile.replace(phoneCode, '');
    const currentCountryInfo = state.countryCode.country_coin.find((item: ICountryCoin) => item.country_code === countryCode);

    state.userInfo = { ...state.userInfo, countryCode, phoneCode, mobile: _mobile, pass };
    state.countryCode = { ...state.countryCode, current: currentCountryInfo };
  },
  failCallback( state, action) {
    console.log( action );
    throw action;
  }
} );

export const mobileCodeThunk = new GetAsyncThunk<IMobileCodeType, MobileCodeParams>( {
  storeName: AUTH,
  path: 'mobilecode',
  async asyncFunc( prams ) {
    try {
      const response = await mobileCodeApi( prams );

      return response;
    } catch ( error ) {
      console.log( error );
      throw error;
    }
  },
  successCallback( state, action ) {
    state.modileCode = action.payload.code;
  },
  failCallback( state, action) {
    console.log( action );
    throw action;
  }
} );

export const countryCode = new GetAsyncThunk<ICountryCoinType, CountryParams>({
  storeName: `${AUTH}`,
  path: 'countryCode',
  async asyncFunc(params = {}, thunkAPI ) {
    try {
      const lastGetTime = thunkAPI.getState().auth.countryCode.lastGetTime;
      const countryCodeData = thunkAPI.getState().auth.countryCode.country_coin;
      const currCountryCodeData = thunkAPI.getState().auth.countryCode.current;
      const nowTime = new Date().getTime();
      const noNeedUpdate = nowTime - lastGetTime < 1000 * 60;

      if ( noNeedUpdate && countryCodeData.length > 0 ) {
        const countryCodeData = thunkAPI.getState().auth.countryCode.country_coin;

        return {
          country_coin: countryCodeData,
          lastGetTime,
          current: currCountryCodeData
        };
      }

      const response = await getCountryCode(params);

      return {
        country_coin: response.country_coin,
        lastGetTime: nowTime,
        current: currCountryCodeData
      };
    } catch ( error ) {
      console.log( error );
      throw error;
    }
  },
  successCallback( state, action ) {
    state.countryCode.country_coin = action.payload.country_coin;
    state.countryCode.lastGetTime = action.payload.lastGetTime;
  },
  failCallback( state, action) {
    throw action;
  }
});
