import { Column, Row } from '@/components/flex';
import { useAppDispatch, useAppSelector } from '@/store';
import { countryCodeSelector, updateCountryCode } from '@/store/slices/auth.slice';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchView from './components/SearchView';
import { CountryCountryContainer, ListContainer, ListItemContent, ListHeader, ListContent } from './index.styled';
import MyImg from '@/components/MyImg';
import { useCountryIcon } from '@/hooks/auth.hooks';
import { ICountryCoin } from '@/store/types/auth';
import { countryCode } from '@/store/actions/auth.thunk';
const ChooseCountry = () => {
  const { imgUrl } = useCountryIcon();
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const loc = useLocation();
  const formPath = loc.state?.formPath;
  const countryCodeList = useAppSelector(countryCodeSelector).country_coin;
  const [search, setSearch] = useState('');

  // 模糊搜索
  const list = useMemo(() => countryCodeList.filter((item) => item.country_name.toLowerCase().includes(search.toLowerCase())), [countryCodeList, search]);

  useEffect(() => {
    if (!countryCodeList.length) dispatch(countryCode.asyncThunk());
  }, []);
  
  const handleClick = (countryData: ICountryCoin) => {
    console.log('countryData', countryData);
    dispatch(updateCountryCode(countryData));
    
    // 返回上一页并带上state.country
    nav(formPath, {
      replace: true,
      state: {
        countryData: { ...countryData }
      }
    });
  };

  return (
    <CountryCountryContainer>
      <SearchView setSearch={setSearch} />
      <ListContainer>
        <ListHeader>
          <Column justify='flex-end' align='flex-start'>
          热门国家
          </Column>
        </ListHeader>
        <ListContent>
          <Column justify='flex-start' align='flex-start' className="listSorllView">
            {list.map((item, index) => (
              <ListItemContent index={index} key={item.country_code} onClick={() => { handleClick(item); }} justify='space-between' align='center'>
                <Row className='country-info' justify='center' align='center'>
                  <Row className='country-icon' justify='center' align='center'>
                    <MyImg src={imgUrl(item.country_code)} />
                  </Row>
                  {item.country_name}
                </Row>
                <span className="phone-code">
                  {item.phone_code}
                </span>
              </ListItemContent>
            ))}
          </Column>
        </ListContent>
      </ListContainer>
    </CountryCountryContainer>
  );
};

export default ChooseCountry;
