import { useAppSelector } from '@/store';
import { countryCodeSelector } from '@/store/slices/auth.slice';
import { ICountryCoin } from '@/store/types/auth';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const defaultCountryData = {
  id: 53,
  country_code: 'CN',
  country_name: 'China',
  phone_code: '+86',
  country_coin: 'CNY',
  coin_price: 0,
  top_price: 0,
  is_sendsms: 1,
  wallet_type: 'money_wallet',
  coin_rate: 0,
  order: 200,
  status: 1,
  remark: null,
  country_lang: 'cn'
};

export default function useCountryData() {
  const loc = useLocation();
  const countryCodeList = useAppSelector(countryCodeSelector).country_coin;
  const countryData = useMemo<ICountryCoin>(() => {
    const stateData = loc.state?.countryData;

    if (stateData) return stateData;

    return countryCodeList.find((item: ICountryCoin) => item.id === 53) ?? defaultCountryData;
  }, [loc.pathname,
    loc.state?.countryData,
    countryCodeList]);
    
  return {
    countryData,
    form: loc.pathname
  };
}
