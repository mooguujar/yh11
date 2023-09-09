import { mergeConfig, loadEnv } from 'vite'
import baseConfig from './vite.config.base'
import configCompressPlugin from './plugin/compress'
import configVisualizerPlugin from './plugin/visualizer'
import configImageminPlugin from './plugin/imagemin'

const lifecycle = process.env.npm_lifecycle_event
const isHttpsLifecycle = lifecycle === 'dev:https'
const env = loadEnv(process.env.NODE_ENV, process.cwd())
let SERVE_URL = ''
import config from '../public/config.json'
SERVE_URL = config.SERVE_URL

console.log('生产环境信息', env, SERVE_URL)
export default mergeConfig(
  {
    mode: 'production', // vite生产模式
    // 插件的具体配置请查看对应的文件
    plugins: [configCompressPlugin('gzip'), configVisualizerPlugin(), configImageminPlugin()],
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          // 分包策略优化
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia', '@vueuse/core']
          }
        }
      },
      chunkSizeWarningLimit: 2000
    },
    server: {
      port: 9988,
      open: false, // 自动打开浏览器
      fs: {
        strict: true // 文件读取必须是相对于根目录的绝对路径
      },
      https: isHttpsLifecycle, // 开启https
      // proxy: {
      //   // capi 开头的请求代理到远程服务器
      //   '/capi': {
      //     // 地址根据环境配置读取
      //     target: loadEnv('development', process.cwd()).VITE_API_PREFIX,
      //     changeOrigin: true,
      //   },
      // },
      proxy: {
        '/api': {
          target: SERVE_URL,
          changeOrigin: true,
          secure: true,
          ws: true, // 支持 websocket
          rewrite: path => path.replace(/^\/api/, '') // 路径重写
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
