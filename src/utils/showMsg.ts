import {
  h,
  render,
  defineComponent,
  ref,
  computed,
  onMounted,
  watch,
  nextTick,
  type VNode
} from 'vue'

export type MsgPromptType = 'error' | 'success' | 'warning' | 'info'

// 全局消息索引（用于错位动画）
let msgIndex = 0

// 样式映射
const typeClassMap: Record<MsgPromptType, string> = {
  error: 'alert alert-error alert-soft',
  success: 'alert alert-success alert-soft',
  warning: 'alert alert-warning alert-soft',
  info: 'alert alert-info alert-soft'
}

// 创建全局容器
const ensureContainer = () => {
  let container = document.querySelector('#global-msg-container')
  if (!container) {
    container = document.createElement('div')
    container.id = 'global-msg-container'
    container.className = 'fixed top-4 right-4 z-[9999] flex flex-col gap-2 items-end pointer-events-none'
    document.body.appendChild(container)
  }
  return container
}

export const showMsg = (msg: string, type: MsgPromptType = 'info', duration = 3000) => {
  const container = ensureContainer()
  const wrapper = document.createElement('div')
  container.appendChild(wrapper)

  const localIndex = msgIndex++

  const MsgComponent = defineComponent({
    setup() {
      const visible = ref(false)
      const hovered = ref(false)

      let timer: number

      const startTimer = () => {
        timer = window.setTimeout(() => {
          visible.value = false
        }, duration)
      }

      const clearTimer = () => clearTimeout(timer)

      onMounted(() => {
        nextTick(() => {
          visible.value = true
          startTimer()
        })
      })

      watch(visible, (v) => {
        if (!v) {
          setTimeout(() => {
            render(null, wrapper)
            wrapper.remove()
          }, 500) // 匹配动画时间
        }
      })

      return () =>
        h(
          'div',
          {
            class: `
              pointer-events-auto px-4 py-2 rounded-lg shadow-xl transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1.25)]
              transform w-max max-w-sm
              ${visible.value ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-5 scale-90'}
              ${typeClassMap[type]}
            `,
            style: {
              transitionDelay: `${localIndex * 50}ms`
            },
            onMouseenter: () => {
              hovered.value = true
              clearTimer()
            },
            onMouseleave: () => {
              hovered.value = false
              startTimer()
            }
          },
          msg
        )
    }
  })

  const vnode = h(MsgComponent)
  render(vnode, wrapper)
}
