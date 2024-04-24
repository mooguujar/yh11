import GetAsyncThunk from '../GetAsyncThunk';
import { AUTH } from '../sliceName';
import { ILoginType } from '../types/auth';
import { ICoin } from '../types/coin';
import { getUserInfoApi, getUserCoinApi } from '@/apis/user';
export const getUserInfoThunk = new GetAsyncThunk<ILoginType, {}>( {
  storeName: AUTH,
  path: 'getInfo',
  async asyncFunc(params = {}, thunkAPI) {
    try {
      const response = await getUserInfoApi();

      return response;
    } catch ( error ) {
      console.log( error );
      throw error;
    }
  },
  successCallback( state, action ) {
    state.token = action.payload.token;
    state.userInfo = action.payload.info;
    state.editreview = action.payload.editreview;
  },
  failCallback( state, action) {
    console.log( action );
    throw action;
  }
} );

export const getUserCoinsThunk = new GetAsyncThunk<ICoin[], {}>( {
  storeName: AUTH,
  path: 'getCoins',
  async asyncFunc(params = {}, thunkAPI) {
    try {
      const response = await getUserCoinApi();

      return response;
    } catch ( error ) {
      console.log( error );
      throw error;
    }
  },
  successCallback( state, action ) {
    state.coins = action.payload;
  },
  failCallback( state, action) {
    console.log( action );
    throw action;
  }
} );
