import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import reducers from './reducers';
import IndexedDBUtils from '@/utils/IndexDB';
const DB_STORE_NAME = 'redux-persist-store';
const APP_STORE_NAME = 'my-app-db';
const v = process.env.REACT_APP_VERSION?.split('.').reduce((a, b) => a * 1000 + +b, 0) ?? 0;
const db = new IndexedDBUtils(DB_STORE_NAME, v, APP_STORE_NAME);
const persistConfig = {
  key: 'root',
  version: 1,
  storage: {
    getItem: (_key: string) => db.getAllData(),
    setItem: (_key: string, value: any) => db.saveData(value, ''),
    removeItem: (key: string) => db.deleteById(key)
  },
  blacklist: []
};

const persistedReducer = persistReducer( persistConfig, reducers );

const store = configureStore( {
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER]
      }
    })
} );

export type RootState = ReturnType<typeof persistedReducer>;
export type DispatchType = typeof store.dispatch;

export const persistor = persistStore( store );

export const useAppDispatch = () => useDispatch<DispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
