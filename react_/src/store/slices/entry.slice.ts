import { createSelector, createSlice } from '@reduxjs/toolkit';
import { ENTRY } from '../sliceName';
import { type RootState } from '..';
import { getConfigThunk, getFingerprint } from '../actions/entry.thunk';
import { IConfigData } from '../types/entry';
interface AuthbState {
  config: IConfigData
  fingerprint: string
}
const initialState: AuthbState = {
  config: {
    SYS_SET_DATETIME_CONFIG: {},
    SYS_SET_LANG_APICONFIG: {},
    WEB_SET_HomeExt: {},
    WEB_SET_coinset_config: {},
    WEB_Set_App_Version: {},
    Web_BuySell_Coin_Times: {},
    Web_Set_DefaultInfo: {},
    Web_Set_JFpoint: {},
    Web_Set_SysMoney_Config: {},
    Web_Set_WebMoney_savewithdraw: {},
    Web_Set_WebReg: {},
    Web_Transfer_BuySell_Coin_Fee: {}
  },
  fingerprint: ''
};

const entrySlice = createSlice( {
  name: ENTRY,
  initialState,
  reducers: {
  },
  extraReducers( builder ) {
    getConfigThunk.extraReducers( builder );
    getFingerprint.extraReducers( builder );
  }
} );

// Web_Set_DefaultInfo
export const webSetDefaultInfoSelector = createSelector( ( state: RootState ) => state[ENTRY], ( { config } ) => config.Web_Set_DefaultInfo );
export const configSelector = createSelector( ( state: RootState ) => state[ENTRY], ( { config } ) => config );
// Web_Set_WebReg
export const webSetWebRegSelector = createSelector( ( state: RootState ) => state[ENTRY], ( { config } ) => config.Web_Set_WebReg );
export const fingerprintSelector = createSelector( ( state: RootState ) => state[ENTRY], ( { fingerprint } ) => fingerprint );
export default ( {
  [ENTRY]: entrySlice.reducer
} );
