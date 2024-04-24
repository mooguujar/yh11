import { css } from 'styled-components';
import spriteHome from '@/assets/images/sprites-home.png';
import spritePoint from '@/assets/images/sprites-point.png';
// import spriteMine from '@/assets/images/sprites-mine.png';

const staticSrc = (src: string) => {
  if (src.startsWith('http')) return (src);

  const url = src.startsWith('/') ? src : `/${src}`;

  return (`${process.env.REACT_APP_STATIC_PATH}/${url}`);
};

const spriteMine = staticSrc('/sprites/mine/sprite.webp');

export const spriteHomeCss = css`
  .logo {
    background: url(${spriteHome}) calc(-0rem * var(--sprite-computed-factor)) calc(-0rem * var(--sprite-computed-factor)) no-repeat;
    width: calc(64rem * var(--sprite-computed-factor));
    height:calc(56rem * var(--sprite-computed-factor));
    background-size: var(--sprite-home-background-size);
  }
  .message {
    background: url(${spriteHome}) calc(-0rem * var(--sprite-computed-factor)) calc(-56rem * var(--sprite-computed-factor)) no-repeat;
    width: calc(54rem * var(--sprite-computed-factor));
    height:calc(54rem * var(--sprite-computed-factor));
    background-size: var(--sprite-home-background-size);
  }
  .verified {
    background: url(${spriteHome}) calc(-0rem * var(--sprite-computed-factor)) calc(-218rem * var(--sprite-computed-factor)) no-repeat;
    width: calc(50rem * var(--sprite-computed-factor));
    height:calc(50rem * var(--sprite-computed-factor));
    background-size: var(--sprite-home-background-size);
  }
  .help {
    background: url(${spriteHome}) calc(-50rem * var(--sprite-computed-factor)) calc(-218rem * var(--sprite-computed-factor)) no-repeat;
    width: calc(48rem * var(--sprite-computed-factor));
    height:calc(48rem * var(--sprite-computed-factor));
    background-size: var(--sprite-home-background-size);
  }
  .customer-service {
    background: url(${spriteHome}) calc(-53rem * var(--sprite-computed-factor)) calc(-316rem * var(--sprite-computed-factor)) no-repeat;
    width: calc(54rem * var(--sprite-computed-factor));
    height: calc(48rem * var(--sprite-computed-factor));
    background-size: var(--sprite-home-background-size);
  }
  .transfer {
    background: url(${spriteHome}) calc(-0rem * var(--sprite-computed-factor)) calc(-364rem * var(--sprite-computed-factor)) no-repeat;
    width: calc(48rem * var(--sprite-computed-factor));
    height:calc(47rem * var(--sprite-computed-factor));
    background-size: var(--sprite-home-background-size);
  }
  .banzhuan {
    background: url(${spriteHome}) calc(-48rem * var(--sprite-computed-factor)) calc(-364rem * var(--sprite-computed-factor)) no-repeat;
    width: calc(51rem * var(--sprite-computed-factor));
    height:calc(45rem * var(--sprite-computed-factor));
    background-size: var(--sprite-home-background-size);
  }
  .collectCoin {
    background: url(${spriteHome}) calc(-64rem * var(--sprite-computed-factor)) calc(-0rem * var(--sprite-computed-factor)) no-repeat;
    width: calc(34rem * var(--sprite-computed-factor));
    height:calc(44rem * var(--sprite-computed-factor));
    background-size: var(--sprite-home-background-size);
  }
  .IDCard {
    background: url(${spriteHome}) calc(-0rem * var(--sprite-computed-factor)) calc(-411rem * var(--sprite-computed-factor)) no-repeat;
    width: calc(56rem * var(--sprite-computed-factor));
    height:calc(40rem * var(--sprite-computed-factor));
    background-size: var(--sprite-home-background-size);
  }
  .wallet {
    background: url(${spriteHome}) calc(-56rem * var(--sprite-computed-factor)) calc(-411rem * var(--sprite-computed-factor)) no-repeat;
    width: calc(41rem * var(--sprite-computed-factor));
    height:calc(38rem * var(--sprite-computed-factor));
    background-size: var(--sprite-home-background-size);
  }
  .copy {
    background: url(${spriteHome}) calc(-0rem * var(--sprite-computed-factor)) calc(-451rem * var(--sprite-computed-factor)) no-repeat;
    width: calc(35rem * var(--sprite-computed-factor));
    height:calc(35rem * var(--sprite-computed-factor));
    background-size: var(--sprite-home-background-size);
  }
  .bulletin {
    background: url(${spriteHome}) calc(-35rem * var(--sprite-computed-factor)) calc(-451rem * var(--sprite-computed-factor)) no-repeat;
    width: calc(45rem * var(--sprite-computed-factor));
    height:calc(33rem * var(--sprite-computed-factor));
    background-size: var(--sprite-home-background-size);
  }
  .close-dark {
    background: url(${spriteHome}) calc(-80rem * var(--sprite-computed-factor)) calc(-451rem * var(--sprite-computed-factor)) no-repeat;
    width: calc(28rem * var(--sprite-computed-factor));
    height:calc(28rem * var(--sprite-computed-factor));
    background-size: var(--sprite-home-background-size);
  }
  .close-white {
    background: url(${spriteHome}) calc(-31rem * var(--sprite-computed-factor)) calc(-486rem * var(--sprite-computed-factor)) no-repeat;
    width: calc(28rem * var(--sprite-computed-factor));
    height:calc(28rem * var(--sprite-computed-factor));
    background-size: var(--sprite-home-background-size);
  }
  .arrow-right {
    background: url(${spriteHome}) calc(-96rem * var(--sprite-computed-factor)) calc(-268rem * var(--sprite-computed-factor)) no-repeat;
    width: calc(13rem * var(--sprite-computed-factor));
    height:calc(23rem * var(--sprite-computed-factor));
    background-size: var(--sprite-home-background-size);
  }
  .buyCoin {
    background: url(${spriteHome}) calc(-0rem * var(--sprite-computed-factor)) calc(-515rem * var(--sprite-computed-factor)) no-repeat;
    width: calc(42rem * var(--sprite-computed-factor));
    height:calc(19rem * var(--sprite-computed-factor));
    background-size: var(--sprite-home-background-size);
  }
  .sellCoin {
    background: url(${spriteHome}) calc(-42rem * var(--sprite-computed-factor)) calc(-515rem * var(--sprite-computed-factor)) no-repeat;
    width: calc(43rem * var(--sprite-computed-factor));
    height:calc(19rem * var(--sprite-computed-factor));
    background-size: var(--sprite-home-background-size);
  }

`;

export const spritePointCss = css`
  .light-step {
    background: url(${spritePoint}) calc(-0rem * var(--sprite-computed-factor)) calc(-0rem * var(--sprite-computed-factor)) no-repeat;
    width: calc(160rem * var(--sprite-computed-factor));
    height:calc(160rem * var(--sprite-computed-factor));
    background-size: var(--sprite-point-background-size);
  }
.award-btn {
 background: url(${spritePoint}) calc(-0rem * var(--sprite-computed-factor)) calc(-160rem * var(--sprite-computed-factor)) no-repeat;
 width: calc(281rem * var(--sprite-computed-factor));
 height:calc(120rem * var(--sprite-computed-factor));
  background-size: var(--sprite-point-background-size);
}
.lucky-star {
 background: url(${spritePoint}) calc(-160rem * var(--sprite-computed-factor)) calc(-0rem * var(--sprite-computed-factor)) no-repeat;
 width: calc(67rem * var(--sprite-computed-factor));
 height:calc(101rem * var(--sprite-computed-factor));
  background-size: var(--sprite-point-background-size);
}
.RMB-gold-box {
 background: url(${spritePoint}) calc(-0rem * var(--sprite-computed-factor)) calc(-280rem * var(--sprite-computed-factor)) no-repeat;
 width: calc(91rem * var(--sprite-computed-factor));
 height:calc(97rem * var(--sprite-computed-factor));
  background-size: var(--sprite-point-background-size);
}
.point-8 {
 background: url(${spritePoint}) calc(-91rem * var(--sprite-computed-factor)) calc(-280rem * var(--sprite-computed-factor)) no-repeat;
 width: calc(88rem * var(--sprite-computed-factor));
 height:calc(94rem * var(--sprite-computed-factor));
  background-size: var(--sprite-point-background-size);
}
.RMB-silver-box {
 background: url(${spritePoint}) calc(-179rem * var(--sprite-computed-factor)) calc(-280rem * var(--sprite-computed-factor)) no-repeat;
 width: calc(80rem * var(--sprite-computed-factor));
 height:calc(93rem * var(--sprite-computed-factor));
  background-size: var(--sprite-point-background-size);
}
.discount {
 background: url(${spritePoint}) calc(-0rem * var(--sprite-computed-factor)) calc(-377rem * var(--sprite-computed-factor)) no-repeat;
 width: calc(91rem * var(--sprite-computed-factor));
 height:calc(90rem * var(--sprite-computed-factor));
  background-size: var(--sprite-point-background-size);
}
.point-80 {
 background: url(${spritePoint}) calc(-91rem * var(--sprite-computed-factor)) calc(-377rem * var(--sprite-computed-factor)) no-repeat;
 width: calc(104rem * var(--sprite-computed-factor));
 height:calc(90rem * var(--sprite-computed-factor));
  background-size: var(--sprite-point-background-size);
}
.point-50 {
 background: url(${spritePoint}) calc(-195rem * var(--sprite-computed-factor)) calc(-377rem * var(--sprite-computed-factor)) no-repeat;
 width: calc(103rem * var(--sprite-computed-factor));
 height:calc(85rem * var(--sprite-computed-factor));
  background-size: var(--sprite-point-background-size);
}
.point-10 {
 background: url(${spritePoint}) calc(-0rem * var(--sprite-computed-factor)) calc(-467rem * var(--sprite-computed-factor)) no-repeat;
 width: calc(96rem * var(--sprite-computed-factor));
 height:calc(82rem * var(--sprite-computed-factor));
  background-size: var(--sprite-point-background-size);
}
.point-30 {
 background: url(${spritePoint}) calc(-96rem * var(--sprite-computed-factor)) calc(-467rem * var(--sprite-computed-factor)) no-repeat;
 width: calc(99rem * var(--sprite-computed-factor));
 height:calc(82rem * var(--sprite-computed-factor));
  background-size: var(--sprite-point-background-size);
}
.RMB-4 {
 background: url(${spritePoint}) calc(-195rem * var(--sprite-computed-factor)) calc(-467rem * var(--sprite-computed-factor)) no-repeat;
 width: calc(95rem * var(--sprite-computed-factor));
 height:calc(75rem * var(--sprite-computed-factor));
  background-size: var(--sprite-point-background-size);
}
.point-5 {
 background: url(${spritePoint}) calc(-0rem * var(--sprite-computed-factor)) calc(-549rem * var(--sprite-computed-factor)) no-repeat;
 width: calc(91rem * var(--sprite-computed-factor));
 height:calc(73rem * var(--sprite-computed-factor));
  background-size: var(--sprite-point-background-size);
}
.RMB-3 {
 background: url(${spritePoint}) calc(-227rem * var(--sprite-computed-factor)) calc(-0rem * var(--sprite-computed-factor)) no-repeat;
 width: calc(69rem * var(--sprite-computed-factor));
 height:calc(66rem * var(--sprite-computed-factor));
  background-size: var(--sprite-point-background-size);
}
.point-1 {
 background: url(${spritePoint}) calc(-91rem * var(--sprite-computed-factor)) calc(-549rem * var(--sprite-computed-factor)) no-repeat;
 width: calc(59rem * var(--sprite-computed-factor));
 height:calc(65rem * var(--sprite-computed-factor));
  background-size: var(--sprite-point-background-size);
}
.RMB-1 {
 background: url(${spritePoint}) calc(-150rem * var(--sprite-computed-factor)) calc(-549rem * var(--sprite-computed-factor)) no-repeat;
 width: calc(65rem * var(--sprite-computed-factor));
 height:calc(64rem * var(--sprite-computed-factor));
  background-size: var(--sprite-point-background-size);
}
.point-3 {
 background: url(${spritePoint}) calc(-160rem * var(--sprite-computed-factor)) calc(-101rem * var(--sprite-computed-factor)) no-repeat;
 width: calc(69rem * var(--sprite-computed-factor));
 height:calc(54rem * var(--sprite-computed-factor));
  background-size: var(--sprite-point-background-size);
}
.received {
 background: url(${spritePoint}) calc(-215rem * var(--sprite-computed-factor)) calc(-549rem * var(--sprite-computed-factor)) no-repeat;
 width: calc(79rem * var(--sprite-computed-factor));
 height:calc(53rem * var(--sprite-computed-factor));
  background-size: var(--sprite-point-background-size);
}
  .checked-in {
    background: url(${spriteHome}) calc(-59rem * var(--sprite-computed-factor)) calc(-486rem * var(--sprite-computed-factor)) no-repeat;
    width: calc(42rem * var(--sprite-computed-factor));
    height:calc(28rem * var(--sprite-computed-factor));
    background-size: var(--sprite-home-background-size);
  }
  .point-expires {
    background: url(${spriteHome}) calc(-0rem * var(--sprite-computed-factor)) calc(-486rem * var(--sprite-computed-factor)) no-repeat;
    width: calc(31rem * var(--sprite-computed-factor));
    height:calc(29rem * var(--sprite-computed-factor));
    background-size: var(--sprite-home-background-size);
  }


`;

export const spriteMineCss = css`
.about-icon { background-image: url(${spriteMine}); background-position: calc(-353rem * var(--sprite-computed-factor)) calc(-116rem * var(--sprite-computed-factor)); width: calc(56rem * var(--sprite-computed-factor)); height: calc(56rem * var(--sprite-computed-factor)); background-size: var(--sprite-mine-background-size); }

.alipay-icon { background-image: url(${spriteMine}); background-position: calc(-292rem * var(--sprite-computed-factor)) calc(-116rem * var(--sprite-computed-factor)); width: calc(56rem * var(--sprite-computed-factor)); height: calc(57rem * var(--sprite-computed-factor)); background-size: var(--sprite-mine-background-size); }

.back-icon { background-image: url(${spriteMine}); background-position: calc(-250rem * var(--sprite-computed-factor)) calc(-232rem * var(--sprite-computed-factor)); width: calc(22rem * var(--sprite-computed-factor)); height: calc(38rem * var(--sprite-computed-factor)); background-size: var(--sprite-mine-background-size); }

.bank-card-icon { background-image: url(${spriteMine}); background-position: calc(-656rem * var(--sprite-computed-factor)) calc(-116rem * var(--sprite-computed-factor)); width: calc(56rem * var(--sprite-computed-factor)); height: calc(44rem * var(--sprite-computed-factor)); background-size: var(--sprite-mine-background-size); }

.camera { background-image: url(${spriteMine}); background-position: calc(-116rem * var(--sprite-computed-factor)) calc(-186rem * var(--sprite-computed-factor)); width: calc(35rem * var(--sprite-computed-factor)); height: calc(32rem * var(--sprite-computed-factor)); background-size: var(--sprite-mine-background-size); }

.check-icon { background-image: url(${spriteMine}); background-position: calc(-414rem * var(--sprite-computed-factor)) calc(-116rem * var(--sprite-computed-factor)); width: calc(56rem * var(--sprite-computed-factor)); height: calc(56rem * var(--sprite-computed-factor)); background-size: var(--sprite-mine-background-size); }

.chervon-right { background-image: url(${spriteMine}); background-position: calc(-189rem * var(--sprite-computed-factor)) calc(-186rem * var(--sprite-computed-factor)); width: calc(13rem * var(--sprite-computed-factor)); height: calc(23rem * var(--sprite-computed-factor)); background-size: var(--sprite-mine-background-size); }

.close-icon { background-image: url(${spriteMine}); background-position: calc(-156rem * var(--sprite-computed-factor)) calc(-186rem * var(--sprite-computed-factor)); width: calc(28rem * var(--sprite-computed-factor)); height: calc(28rem * var(--sprite-computed-factor)); background-size: var(--sprite-mine-background-size); }

.copy-link-icon { background-image: url(${spriteMine}); background-position: calc(-116rem * var(--sprite-computed-factor)) calc(-116rem * var(--sprite-computed-factor)); width: calc(83rem * var(--sprite-computed-factor)); height: calc(65rem * var(--sprite-computed-factor)); background-size: var(--sprite-mine-background-size); }

.css_sprites_mine { background-image: url(${spriteMine}); background-position: calc(0rem * var(--sprite-computed-factor)) calc(0rem * var(--sprite-computed-factor)); width: calc(1245rem * var(--sprite-computed-factor)); height: calc(111rem * var(--sprite-computed-factor)); background-size: var(--sprite-mine-background-size); }

.customer_service { background-image: url(${spriteMine}); background-position: calc(-597rem * var(--sprite-computed-factor)) calc(-116rem * var(--sprite-computed-factor)); width: calc(54rem * var(--sprite-computed-factor)); height: calc(48rem * var(--sprite-computed-factor)); background-size: var(--sprite-mine-background-size); }

.device-icon { background-image: url(${spriteMine}); background-position: calc(0rem * var(--sprite-computed-factor)) calc(-296rem * var(--sprite-computed-factor)); width: calc(40rem * var(--sprite-computed-factor)); height: calc(56rem * var(--sprite-computed-factor)); background-size: var(--sprite-mine-background-size); }

.edit { background-image: url(${spriteMine}); background-position: calc(-154rem * var(--sprite-computed-factor)) calc(-232rem * var(--sprite-computed-factor)); width: calc(46rem * var(--sprite-computed-factor)); height: calc(46rem * var(--sprite-computed-factor)); background-size: var(--sprite-mine-background-size); }

.email-icon { background-image: url(${spriteMine}); background-position: calc(-475rem * var(--sprite-computed-factor)) calc(-116rem * var(--sprite-computed-factor)); width: calc(56rem * var(--sprite-computed-factor)); height: calc(56rem * var(--sprite-computed-factor)); background-size: var(--sprite-mine-background-size); }

.help { background-image: url(${spriteMine}); background-position: calc(-101rem * var(--sprite-computed-factor)) calc(-232rem * var(--sprite-computed-factor)); width: calc(48rem * var(--sprite-computed-factor)); height: calc(48rem * var(--sprite-computed-factor)); background-size: var(--sprite-mine-background-size); }

.lock-icon { background-image: url(${spriteMine}); background-position: calc(-205rem * var(--sprite-computed-factor)) calc(-232rem * var(--sprite-computed-factor)); width: calc(40rem * var(--sprite-computed-factor)); height: calc(44rem * var(--sprite-computed-factor)); background-size: var(--sprite-mine-background-size); }

.more-icon { background-image: url(${spriteMine}); background-position: calc(-778rem * var(--sprite-computed-factor)) calc(-116rem * var(--sprite-computed-factor)); width: calc(81rem * var(--sprite-computed-factor)); height: calc(18rem * var(--sprite-computed-factor)); background-size: var(--sprite-mine-background-size); }

.notice { background-image: url(${spriteMine}); background-position: calc(-45rem * var(--sprite-computed-factor)) calc(-296rem * var(--sprite-computed-factor)); width: calc(43rem * var(--sprite-computed-factor)); height: calc(48rem * var(--sprite-computed-factor)); background-size: var(--sprite-mine-background-size); }

.save-image-icon { background-image: url(${spriteMine}); background-position: calc(-204rem * var(--sprite-computed-factor)) calc(-116rem * var(--sprite-computed-factor)); width: calc(83rem * var(--sprite-computed-factor)); height: calc(65rem * var(--sprite-computed-factor)); background-size: var(--sprite-mine-background-size); }

.share-icon { background-image: url(${spriteMine}); background-position: calc(-56rem * var(--sprite-computed-factor)) calc(-232rem * var(--sprite-computed-factor)); width: calc(40rem * var(--sprite-computed-factor)); height: calc(58rem * var(--sprite-computed-factor)); background-size: var(--sprite-mine-background-size); }

.shield-icon { background-image: url(${spriteMine}); background-position: calc(0rem * var(--sprite-computed-factor)) calc(-232rem * var(--sprite-computed-factor)); width: calc(51rem * var(--sprite-computed-factor)); height: calc(59rem * var(--sprite-computed-factor)); background-size: var(--sprite-mine-background-size); }

.upload-img-icon { background-image: url(${spriteMine}); background-position: calc(0rem * var(--sprite-computed-factor)) calc(-116rem * var(--sprite-computed-factor)); width: calc(111rem * var(--sprite-computed-factor)); height: calc(111rem * var(--sprite-computed-factor)); background-size: var(--sprite-mine-background-size); }

.verify-icon { background-image: url(${spriteMine}); background-position: calc(-717rem * var(--sprite-computed-factor)) calc(-116rem * var(--sprite-computed-factor)); width: calc(56rem * var(--sprite-computed-factor)); height: calc(40rem * var(--sprite-computed-factor)); background-size: var(--sprite-mine-background-size); }

.wechat-icon { background-image: url(${spriteMine}); background-position: calc(-536rem * var(--sprite-computed-factor)) calc(-116rem * var(--sprite-computed-factor)); width: calc(56rem * var(--sprite-computed-factor)); height: calc(49rem * var(--sprite-computed-factor)); background-size: var(--sprite-mine-background-size); }

.white-back { background-image: url(${spriteMine}); background-position: calc(-277rem * var(--sprite-computed-factor)) calc(-232rem * var(--sprite-computed-factor)); width: calc(22rem * var(--sprite-computed-factor)); height: calc(38rem * var(--sprite-computed-factor)); background-size: var(--sprite-mine-background-size); }

.white-chervon-right { background-image: url(${spriteMine}); background-position: calc(-207rem * var(--sprite-computed-factor)) calc(-186rem * var(--sprite-computed-factor)); width: calc(13rem * var(--sprite-computed-factor)); height: calc(23rem * var(--sprite-computed-factor)); background-size: var(--sprite-mine-background-size); }
`;

export const spriteTabbarCss = css`
  .tabbar-home {
    background: url(${spriteHome}) calc(-0rem * var(--sprite-computed-factor)) calc(-110rem * var(--sprite-computed-factor)) no-repeat;
    width: calc(54rem * var(--sprite-computed-factor));
    height:calc(54rem * var(--sprite-computed-factor));
    background-size: var(--sprite-home-background-size);
  }
  .tabbar-home-active {
    background: url(${spriteHome}) calc(-54rem * var(--sprite-computed-factor)) calc(-56rem * var(--sprite-computed-factor)) no-repeat;
    width: calc(54rem * var(--sprite-computed-factor));
    height:calc(54rem * var(--sprite-computed-factor));
    background-size: var(--sprite-home-background-size);
  }
  .tabbar-points {
    background: url(${spriteHome}) calc(-0rem * var(--sprite-computed-factor)) calc(-316rem * var(--sprite-computed-factor)) no-repeat;
    width: calc(53rem * var(--sprite-computed-factor));
    height:calc(48rem * var(--sprite-computed-factor));
    background-size: var(--sprite-home-background-size);
  }
  .tabbar-points-active {
    background: url(${spriteHome}) calc(-54rem * var(--sprite-computed-factor)) calc(-164rem * var(--sprite-computed-factor)) no-repeat;
    width: calc(54rem * var(--sprite-computed-factor));
    height:calc(54rem * var(--sprite-computed-factor));
    background-size: var(--sprite-home-background-size);
  }
  .tabbar-order {
    background: url(${spriteHome}) calc(-48rem * var(--sprite-computed-factor)) calc(-268rem * var(--sprite-computed-factor)) no-repeat;
    width: calc(48rem * var(--sprite-computed-factor));
    height:calc(48rem * var(--sprite-computed-factor));
    background-size: var(--sprite-home-background-size);
  }
  .tabbar-order-active {
    background: url(${spriteHome}) calc(-0rem * var(--sprite-computed-factor)) calc(-164rem * var(--sprite-computed-factor)) no-repeat;
    width: calc(54rem * var(--sprite-computed-factor));
    height:calc(54rem * var(--sprite-computed-factor));
    background-size: var(--sprite-home-background-size);
  }
  .tabbar-mine {
    background: url(${spriteHome}) calc(-0rem * var(--sprite-computed-factor)) calc(-268rem * var(--sprite-computed-factor)) no-repeat;
    width: calc(48rem * var(--sprite-computed-factor));
    height:calc(48rem * var(--sprite-computed-factor));
    background-size: var(--sprite-home-background-size);
  }
  .tabbar-mine-active {
    background: url(${spriteHome}) calc(-54rem * var(--sprite-computed-factor)) calc(-110rem * var(--sprite-computed-factor)) no-repeat;
    width: calc(54rem * var(--sprite-computed-factor));
    height:calc(54rem * var(--sprite-computed-factor));
    background-size: var(--sprite-home-background-size);
  }
`;

export const common = css`
  .tabbar-home {
    background: url(${spriteHome}) calc(-0rem * var(--sprite-computed-factor)) calc(-110rem * var(--sprite-computed-factor)) no-repeat;
    width: calc(54rem * var(--sprite-computed-factor));
    height:calc(54rem * var(--sprite-computed-factor));
    background-size: var(--sprite-home-background-size);
  }
`;

