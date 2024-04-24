import { useAppSelector } from '@/store';
import { webSetDefaultInfoSelector } from '@/store/slices/entry.slice';
import { INormal } from '@/store/types/entry';
import { useCallback } from 'react';

export const useCountryIcon = () => {
  const imgserverUrl = (useAppSelector(webSetDefaultInfoSelector)?.imgserver_url as INormal)?.v ?? '';
  
  const imgUrl = useCallback((imgname: string) => {
    return `${`${imgserverUrl}/static/default/country/${imgname}`}.png`;
  }, [imgserverUrl]);

  return {
    imgUrl
  };
};
