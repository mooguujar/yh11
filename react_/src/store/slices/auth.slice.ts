import { createSelector, createSlice } from '@reduxjs/toolkit';
import { AUTH } from '../sliceName';
import { type RootState } from '..';
import { countryCode, loginThunk, registerThunk, mobileCodeThunk } from '../actions/auth.thunk';
import { getUserInfoThunk, getUserCoinsThunk } from '../actions/user.thunk';
import { ICountryCoinType, IEditreview, IInfo } from '../types/auth';
import { ICoin } from '../types/coin';

interface AuthbState {
  token: string
  userInfo: IInfo | Record<string, any>
  countryCode: ICountryCoinType
  editreview: IEditreview | Record<string, any>
  coins: ICoin[] | []
}
const initialState: AuthbState = {
  token: '',
  userInfo: {},
  editreview: {},
  countryCode: {
    country_coin: [],
    lastGetTime: 0,
    current: {}
  },
  coins: []
};

const authSlice = createSlice({
  name: AUTH,
  initialState,
  reducers: {
    logout( state, action ) {
      state.token = '';
    },
    updateUserInfo( state, action ) {
      // state.userInfo = {...state.userInfo, action.payload};
    },
    updateCountryCode(state, action ) {
      // state.countryCode = action.payload.countryCode
    }
  },
  extraReducers( builder ) {
    loginThunk.extraReducers( builder );
    countryCode.extraReducers( builder );
    registerThunk.extraReducers( builder );
    mobileCodeThunk.extraReducers( builder );
    getUserInfoThunk.extraReducers(builder);
    getUserCoinsThunk.extraReducers(builder);
  }
});

const { actions } = authSlice;

// 获取token
export const tokenSelector = createSelector((state: RootState) => state[AUTH], ({ token }) => token);
// 获取用户信息
export const userInfoSelector = createSelector((state: RootState) => state[AUTH], ({ userInfo }) => userInfo);
// 获取用户审核信息
export const editreviewSelector = createSelector((state: RootState) => state[AUTH], ({ editreview }) => editreview);
// 获取国家代码
export const countryCodeSelector = createSelector((state: RootState) => state[AUTH], ({ countryCode }) => countryCode);
// 获取用戶$$
export const userCoinsSelector = createSelector((state: RootState) => state[AUTH], ({ coins }) => coins);
export const isUserLoggedInSelector = createSelector((state: RootState) => state[AUTH], ({ token }) => ({
  isLogin: !!token,
  token
}));
export const {
  logout,
  updateUserInfo,
  updateCountryCode
} = actions;
export default ( {
  [AUTH]: authSlice.reducer

});
