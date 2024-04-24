import { Row } from '@/components/flex';
import { styled } from 'styled-components';
import { articleListApi } from '@/apis/article';
import { useEffect, useState } from 'react';
import Carousel from '@/components/Carousel';
import { IArticleListType } from '@/store/types/article';
import { useNavigate } from 'react-router-dom';
import { getLoginStatus } from '@/utils/tools';

const SliderContainer = styled(Row)`
  width: 100%;
  height: 300rem;
`;

interface CarouselRouteKey {
  Mod_BuyCoinsGDB: string
  Mod_Movingbricks: string
  Mod_PointsActivity: string
  Mod_UserReg: string
}
const MySlider = () => {
  const navigate = useNavigate();
  const { isLogin } = getLoginStatus();
  const [carouselList, setCarouselList] = useState<IArticleListType[]>([]);
  const carouselRouteMap = {
    Mod_BuyCoinsGDB: '/buyCoin',
    Mod_JumpWebUrl: {
      WebUrlLink: 'http://baidu.com'
    },
    Mod_Movingbricks: '/brick',
    Mod_PointsActivity: '/point',
    Mod_UserReg: '/auth/register'
  };
  const getCarouselList = async () => {
    try {
      const res = await articleListApi({
        bind_key: 'HomeHuanDeng'
      });

      window.log('轮播列表内容', res);
      setCarouselList(res);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleClick = (data: any) => {
    if (data.app_exts) {
      const { app_action, WebUrlLink } = JSON.parse(data.app_exts);

      window.log('当前轮播跳转信息', data.app_exts);

      if (app_action === 'Mod_UserReg' && isLogin) return;
      if (app_action === 'Mod_JumpWebUrl') {
        navigate(`/linkPage/third?url=${WebUrlLink}`);
      } else {
        navigate(carouselRouteMap[app_action as keyof CarouselRouteKey]);
      }
    }
  };
  
  useEffect(() => {
    getCarouselList();
  }, []);

  return (
    <SliderContainer>
      {
        carouselList.length && <Carousel list={carouselList} onClick={handleClick} />
      }
    </SliderContainer>
  );
};

export default MySlider;
