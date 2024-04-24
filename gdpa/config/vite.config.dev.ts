import { loadEnv, mergeConfig } from 'vite'
import config from '../public/config_dev.json'
import baseConfig from './vite.config.base'

const lifecycle = process.env.npm_lifecycle_event
const isHttpsLifecycle = lifecycle === 'dev:https'
const env = loadEnv(process.env.NODE_ENV, process.cwd())
console.log('开发环境信息', env)
const SERVE_URL = config.SERVE_URL

export default mergeConfig(
  {
    mode: 'development', // vite开发模式
    server: {
      port: 9988,
      open: false, // 自动打开浏览器
      fs: {
        strict: true // 文件读取必须是相对于根目录的绝对路径
      },
      https: true, // 开启https
      // https: isHttpsLifecycle, // 开启https
      // 预热频繁使用的文件
      warmup: {
        clientFiles: [
          '../src/assets/styles/common.scss',
          '../src/style.css',
          '../src/basic-type-extensions.ts',
          '../src/store/index.ts',
          '../src/router/index.ts',
          '../src/utils/tools.ts',
          '../src/App.vue',
          '../src/store/modules/entry/index.ts',
          '../src/router/routers.ts',
          '../src/router/middleware/index.ts',
          '../src/App.vue?vue&type=style&index=1&lang.scss',
          '../src/store/modules/auth/index.ts',
          '../src/components/AppBar/useAppBar.tsx',
          '../src/utils/mitt.ts',
          '../src/store/modules/common/index.ts',
          '../src/components/PreloadResources/PreloadResources.vue',
          '../src/utils/themes.ts',
          '../src/components/Menu/MenuBar.vue',
          '../src/utils/WSUtil.ts',
          '../src/components/CommonPopup/core.ts',
          '../src/router/module/crypto.ts',
          '../src/store/modules/coinBuySell/index.ts',
          '../src/apis/user.ts',
          '../src/utils/http.ts',
          '../src/pages/Order/wide.vue',
          '../src/pages/Order/index.vue',
          '../src/pages/Crypto/components/wideModeSelfSelect.vue',
          '../src/pages/Crypto/components/QuickCoins.vue'
        ]
      },
      proxy: {
        '/api': {
          target: SERVE_URL,
          changeOrigin: true,
          secure: true,
          ws: true, // 支持 websocket
          rewrite: path => path.replace(/^\/api/, '') // 路径重写
        },
        '/pay': {
          target: SERVE_URL,
          changeOrigin: true,
          secure: true,
          ws: true, // 支持 websocket
          rewrite: path => path.replace(/^\/pay/, '') // 路径重写
        },
        [env.VITE_APP_STATIC_PATH]: {
          target: env.VITE_APP_STATIC_URL,
          changeOrigin: true,
          secure: true,
          pathRewrite: {
            [`^${env.VITE_APP_STATIC_PATH}`]: ''
          }
        }
      }
    }
  },
  baseConfig
)
