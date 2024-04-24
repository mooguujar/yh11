import { useAppSelector } from '@/store';
import { webSetDefaultInfoSelector } from '@/store/slices/entry.slice';
import { INormal } from '@/store/types/entry';
import { userInfoSelector, userCoinsSelector } from '@/store/slices/auth.slice';

export const useAvatar = () => {
  const imgserverUrl = (useAppSelector(webSetDefaultInfoSelector)?.imgserver_url as INormal)?.v ?? '';

  const userInfo = useAppSelector(userInfoSelector);

  return `${imgserverUrl}/${userInfo?.headimg}`;
};

export const useInviteURL = () => (useAppSelector(webSetDefaultInfoSelector)?.invitation_regurl as INormal)?.v ?? '';
