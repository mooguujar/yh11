
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { getConfig } from '@/apis/entry';
import GetAsyncThunk from '../GetAsyncThunk';
import { ENTRY } from '../sliceName';
import { IConfigData } from '../types/entry';
export const getConfigThunk = new GetAsyncThunk<IConfigData, undefined>({
  storeName: `${ENTRY}`,
  path: 'getConfig',
  async asyncFunc() {
    try {
      const response = await getConfig( );

      return response;
    } catch ( error ) {
      console.log( error );
      throw error;
    }
  },
  successCallback( state, action ) {
    state.config = action.payload;
  },
  failCallback( state, action) {
    console.log( action );
    throw action;
  }
});
interface IGetFingerprint {
  visitorId: string
}
export const getFingerprint = new GetAsyncThunk<IGetFingerprint, undefined>({
  storeName: `${ENTRY}`,
  path: 'getFingerprint',
  async asyncFunc() {
    try {
      const fp = await FingerprintJS.load();
      const result = await fp.get();

      return {
        visitorId: result.visitorId
      };
    } catch ( error ) {
      console.log( error );
      throw error;
    }
  },
  successCallback( state, action ) {
    state.fingerprint = action.payload.visitorId;
  },
  failCallback( state, action) {
    console.log( action );
    throw action;
  }
});
