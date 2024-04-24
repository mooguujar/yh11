import { lazy } from 'react';
import Tabbar from '@/Layout/Tabbar';
import Auth from '@/Layout/Auth';
import OrderCenterLayout from '@/Layout/OrderCenter';
import Iframe from '@/Layout/Iframe';
import { type RouteObject } from 'react-router-dom';
const HomeLazy = lazy(() => import('@/pages/Home'));
const MineLazy = lazy(() => import('@/pages/Mine'));
const MineInfoLazy = lazy(() => import('@/pages/Mine/pages/Info'));
const MineWalletLazy = lazy(() => import('@/pages/AccountSafety/Wallet'));
const MineBankLazy = lazy(() => import('@/pages/Payments/BankCard'));
const MineWechatLazy = lazy(() => import('@/pages/Payments/Wechat'));
const MineAlipayLazy = lazy(() => import('@/pages/Payments/Alipay'));
const MineLoginPasswordLazy = lazy(() => import('@/pages/AccountSafety/LoginPassword'));
const MinePayPasswordLazy = lazy(() => import('@/pages/AccountSafety/PayPassword'));
const MineEmailLazy = lazy(() => import('@/pages/AccountSafety/Email'));
const MineDeviceLazy = lazy(() => import('@/pages/AccountSafety/Device'));
const MineShareLazy = lazy(() => import('@/pages/AccountSafety/Share'));
const MineAboutusLazy = lazy(() => import('@/pages/Mine/pages/AboutUs'));
const News = lazy(() => import('@/pages/News'));
const LoginLazy = lazy(() => import('@/pages/Auth/Login'));
const RegisterLazy = lazy(() => import('@/pages/Auth/Register'));

const ChooseCountryLazy = lazy(() => import('@/pages/ChooseCountry'));
const RealVerifyLazy = lazy(() => import('@/pages/RealVerify'));
const FundingDetailsLazy = lazy(() => import('@/pages/TransactionHistory/FundingDetails'));

const BuyCryptoLazy = lazy(() => import('@/pages/Crypto/Buy'));
const SelfSelectDetailLazy = lazy(() => import('@/pages/Crypto/pages/SelfSelectDetail'));
const CancelOrderLazy = lazy(() => import('@/pages/Crypto/pages/CancelOrder'));
const ContactLazy = lazy(() => import('@/pages/Crypto/pages/Contact'));
const AppealLazy = lazy(() => import('@/pages/Crypto/pages/Appeal'));
const SellCryptoLazy = lazy(() => import('@/pages/Crypto/pages/Sell'));
const TransferCryptoLazy = lazy(() => import('@/pages/Crypto/pages/Transfer'));
const ReceiveCryptoLazy = lazy(() => import('@/pages/Crypto/pages/Receive'));

const BrickToEarnLazy = lazy(() => import('@/pages/Brick'));
const PointLazy = lazy(() => import('@/pages/Point'));
const ScanLazy = lazy(() => import('@/pages/Scan'));
const BuyOrderListLazy = lazy(() => import('@/pages/OrderCenter/pages/BuyOrderList'));
const SellOrderListLazy = lazy(() => import('@/pages/OrderCenter/pages/SellOrderList'));

const CustomerServiceLazy = lazy(() => import('@/pages/Link/CustomerService'));
const TutorialLazy = lazy(() => import('@/pages/Link/Tutorial'));
const IframePageLazy = lazy(() => import('@/pages/Link'));

const MessageLazy = lazy(() => import('@/pages/Message'));

export const routes: RouteObject[] = [
  {
    path: '/',
    meta: {
      redirect: '/home'
    }
  },
  {
    path: '/home',
    element: <Tabbar />,
    children: [
      {
        index: true,
        meta: {
          title: 'home'
        },
        element: <HomeLazy />
      }
    ]
  },
  {
    path: '/mine',
    element: <Tabbar />,
    children: [
      {
        index: true,
        meta: {
          title: 'mine',
          isAuth: false
        },
        element: <MineLazy />
      },
      {
        // 个人资料
        index: true,
        path: 'info',
        meta: {
          title: 'my info'
        },
        element: <MineInfoLazy />
      },
      {
        // 个人钱包
        index: true,
        path: 'wallet',
        meta: {
          title: 'my wallet'
        },
        element: <MineWalletLazy />
      },
      {
        // 银行卡
        index: true,
        path: 'bank',
        meta: {
          title: 'my bankcard'
        },
        element: <MineBankLazy />
      },
      {
        // 微信支付
        index: true,
        path: 'wechat',
        meta: {
          title: 'my wechat'
        },
        element: <MineWechatLazy />
      },
      {
        // 支付宝
        index: true,
        path: 'alipay',
        meta: {
          title: 'my alipay'
        },
        element: <MineAlipayLazy />
      },
      {
        // 登录密码
        index: true,
        path: 'loginPassword',
        meta: {
          title: 'login password'
        },
        element: <MineLoginPasswordLazy />
      },
      {
        // 支付密码
        index: true,
        path: 'payPassword',
        meta: {
          title: 'pay password'
        },
        element: <MinePayPasswordLazy />
      },
      {
        // 电子邮箱
        index: true,
        path: 'email',
        meta: {
          title: 'email'
        },
        element: <MineEmailLazy />
      },
      {
        // 我的设备
        index: true,
        path: 'device',
        meta: {
          title: 'device'
        },
        element: <MineDeviceLazy />
      },
      {
        // 分享GDPay
        index: true,
        path: 'share',
        meta: {
          title: 'share'
        },
        element: <MineShareLazy />
      },
      {
        // 关于我们
        index: true,
        path: 'aboutUs',
        meta: {
          title: 'about us'
        },
        element: <MineAboutusLazy />
      }
    ]
  },
  {
    path: '/news',
    element: <Tabbar />,
    children: [
      {
        index: true,
        meta: {
          title: 'news'
        },
        element: <News />
      }
    ]
  },
  {
    path: '/auth',
    element: <Auth />,
    children: [
      {
        index: true,
        path: 'login',
        meta: {
          title: 'login'
        },
        element: <LoginLazy />
      },
      {
        index: true,
        path: 'register',
        meta: {
          title: 'register'
        },
        element: <RegisterLazy />
      }
    ]
  },
  {
    path: '/chooseCountry',
    element: <ChooseCountryLazy />,
    index: true
  },
  {
    path: '/realVerify',
    element: <RealVerifyLazy />,
    index: true
  },
  {
    path: '/fundingDetails',
    element: <FundingDetailsLazy />,
    index: true
  },
  {
    path: '/crypto',
    element: <Tabbar />,
    children: [
      {
        // 买币
        index: true,
        meta: {
          title: 'buy crypto'
        },
        element: <BuyCryptoLazy />
      },
      {
        // 自选买币详情
        index: true,
        path: 'selfSelectDetail',
        meta: {
          title: 'self select buy crypto'
        },
        element: <SelfSelectDetailLazy />
      },
      {
        // 取消订单
        index: true,
        path: 'cancelOrder',
        meta: {
          title: 'login'
        },
        element: <CancelOrderLazy />
      },
      {
        // 联繫卖家
        index: true,
        path: 'contact',
        meta: {
          title: 'contact seller'
        },
        element: <ContactLazy />
      },
      {
        // 交易申诉
        index: true,
        path: 'appeal',
        meta: {
          title: 'transaction appeal'
        },
        element: <AppealLazy />
      },
      {
        // 交易申诉
        index: true,
        path: 'appeal',
        meta: {
          title: 'transaction appeal'
        },
        element: <AppealLazy />
      },
      {
        // 交易申诉
        index: true,
        path: 'appeal',
        meta: {
          title: 'transaction appeal'
        },
        element: <AppealLazy />
      },
      {
        // 卖币
        index: true,
        path: 'sell',
        meta: {
          title: 'sell crypto'
        },
        element: <SellCryptoLazy />
      },
      {
        // 转帐
        index: true,
        path: 'transfer',
        meta: {
          title: 'transfer crypto'
        },
        element: <TransferCryptoLazy />
      },
      {
        // 收币
        index: true,
        path: 'receive',
        meta: {
          title: 'receive crypto'
        },
        element: <ReceiveCryptoLazy />
      }
    ]
  },
  {
    path: '/brick',
    element: <Tabbar />,
    children: [
      {
        // 搬砖赚钱
        index: true,
        meta: {
          title: 'brick to earn'
        },
        element: <BrickToEarnLazy />
      }
    ]
  },
  {
    path: '/point',
    element: <Tabbar />,
    children: [
      {
        // 积分
        index: true,
        meta: {
          title: 'point'
        },
        element: <PointLazy />
      }
    ]
  },
  {
    path: '/scan',
    element: <Tabbar />,
    children: [
      {
        // 扫码
        index: true,
        meta: {
          title: 'scan'
        },
        element: <ScanLazy />
      }
    ]
  },
  {
    path: '/orderCenter',
    element: <Tabbar />,
    children: [
      {
        meta: {
          title: 'order center'
        },
        element: <OrderCenterLayout />,
        children: [
          {
            index: true,
            path: 'buy',
            meta: {
              title: 'buy order list'
            },
            element: <BuyOrderListLazy />
          },
          {
            index: true,
            path: 'sell',
            meta: {
              title: 'sell order list'
            },
            element: <SellOrderListLazy />
          }
        ]
      }
    ]
  },
  {
    path: '/linkPage',
    element: <Iframe />,
    children: [
      {
        // 客服
        index: true,
        path: 'customerService',
        meta: {
          title: 'customer service'
        },
        element: <CustomerServiceLazy />
      },
      {
        // 教程
        index: true,
        path: 'tutorial',
        meta: {
          title: 'tutorial'
        },
        element: <TutorialLazy />
      },
      {
        // 第三方外链
        index: true,
        path: 'third',
        meta: {
          title: 'third page'
        },
        element: <IframePageLazy />
      }
      
    ]
  },
  {
    path: '/message',
    element: <MessageLazy />,
    index: true
  }
];
