import { EventHandler, useEffect } from 'react';
import { StyleSheetManager } from 'styled-components';
import Router from '@/routers';
import GlobalView from '@/components/GlobalkStyle';
import isPropValid from '@emotion/is-prop-valid';
import { FLEXVIEWPROPS, MyLog } from './utils/tools';
import store, { useAppDispatch, useAppSelector } from './store';
import { getConfigThunk, getFingerprint } from './store/actions/entry.thunk';
import { fingerprintSelector } from './store/slices/entry.slice';
import { updateHomeNoticeList, updateHomeNoticeShowStatus } from '@/store/slices/article.slice';
import { ARTICLE } from '@/store/sliceName';

function App() {
  const dispatch = useAppDispatch();
  const fingerprint = useAppSelector(fingerprintSelector);

  const init = () => {
    if (!fingerprint) dispatch(getFingerprint.asyncThunk());

    dispatch(getConfigThunk.asyncThunk());
  };

  useEffect(() => {
    MyLog();
    init();
    const { pathname } = window.location;

    if (!pathname.includes('h5')) {
      window.location.href = `${pathname}h5`;
    }

    const handleReset = (event: BeforeUnloadEvent) => {
      // 退出时重置显示状态
      dispatch(updateHomeNoticeShowStatus(true));
      dispatch(updateHomeNoticeList([]));
      // 在应用关闭时执行的逻辑
      // 可以进行清理、保存数据等操作
      // event.preventDefault();
      event.returnValue = '';
    };

    // 刷新 重置相应状态
    window.addEventListener('beforeunload', handleReset);
    // 关闭页面 重置相应状态
    window.addEventListener('unload', handleReset);

    return () => {
      window.removeEventListener('beforeunload', handleReset);
      window.removeEventListener('unload', handleReset);
      dispatch(updateHomeNoticeShowStatus(true));
      dispatch(updateHomeNoticeList([]));
    };
  }, []);

  return (
    <StyleSheetManager shouldForwardProp={(prop: string) => {
      if (FLEXVIEWPROPS[prop]) return true;

      return isPropValid(prop);
    }} >
      <GlobalView />
      <Router />
    </StyleSheetManager>
  );
}

export default App;
