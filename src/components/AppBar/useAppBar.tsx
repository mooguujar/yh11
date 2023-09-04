import { CSSProperties, onUnmounted, onMounted, ref, provide, inject, InjectionKey, Ref } from 'vue'
import AppBar from './AppBar.vue'

type modeType = 'light' | 'dark'

const defaultStyle = {}
const defaultMode = 'light'
const defaultRefreshHandler = () => window.location.reload()
const defaultCloseHandler = () => window.close()

const modeKey = Symbol('mode') as InjectionKey<{
  mode: Ref<modeType>
  setMode: (mode: modeType | undefined) => void
}>
const styleKey = Symbol('style') as InjectionKey<{
  style: Ref<CSSProperties>
  setStyle: (style: CSSProperties) => void
}>
const refreshHandlerKey = Symbol('refresh') as InjectionKey<{
  onRefresh: Ref<() => void>
  setRefreshHandler: (handler: () => void) => void
}>
const closeHandlerKey = Symbol('close') as InjectionKey<{
  onClose: Ref<() => void>
  setCloseHandler: (handler: () => void) => void
}>

/**
 * @name: enableAppBar
 * @description 开启AppBar功能
 */
export function enableAppBar() {
  const mode = ref<modeType>('light')
  const setMode = (_mode: modeType) => {
    mode.value = _mode
  }

  const style = ref<CSSProperties>({})
  const setStyle = (_style: CSSProperties) => {
    style.value = _style
  }

  const onRefresh = ref(defaultRefreshHandler)
  const setRefreshHandler = (handler: () => void) => {
    onRefresh.value = handler
  }
  const onClose = ref(defaultCloseHandler)
  const setCloseHandler = (handler: () => void) => {
    onClose.value = handler
  }

  provide(modeKey, { mode, setMode })
  provide(styleKey, { style, setStyle })
  provide(refreshHandlerKey, { onRefresh, setRefreshHandler })
  provide(closeHandlerKey, { onClose, setCloseHandler })
  return AppBar
}

export function useAppBarProvide() {
  const { mode } = inject(modeKey)
  const { style } = inject(styleKey)
  const { onRefresh } = inject(refreshHandlerKey)
  const { onClose } = inject(closeHandlerKey)

  return {
    mode,
    style,
    onRefresh,
    onClose
  }
}

/**
 * @name: useAppBar
 * @description: 组件内部调用，用于设置AppBar样式，以及绑定刷新和关闭事件
 * @param props {CSSProperties & {onRefresh?: () => void, onClose?: () => void}}
 */
export function useAppBar(
  props?: CSSProperties & {
    mode?: modeType
    onRefresh?: () => void
    onClose?: () => void
  }
) {
  const { setMode } = inject(modeKey)
  const { setStyle } = inject(styleKey)
  const { setRefreshHandler } = inject(refreshHandlerKey)
  const { setCloseHandler } = inject(closeHandlerKey)
  onMounted(() => {
    if (props) {
      const { mode, onRefresh, onClose, ...style } = props
      setStyle(style as CSSProperties)
      mode && setMode(mode)
      onRefresh && setRefreshHandler(onRefresh)
      onClose && setCloseHandler(onClose)
    }
  })

  onUnmounted(() => {
    setMode(defaultMode)
    setStyle(defaultStyle)
    setCloseHandler(defaultCloseHandler)
    setRefreshHandler(defaultRefreshHandler)
  })
}
