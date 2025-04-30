import {
  h,
  render,
  defineComponent,
  ref,
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
function ensureContainer(): HTMLElement {
  let container = document.querySelector<HTMLElement>('#global-msg-container')
  if (!container) {
    container = document.createElement('div') as HTMLElement
    container.id = 'global-msg-container'
    container.className = 'fixed top-4 lg:right-4 lg:translate-x-[0%] translate-x-[50%] right-1/2 z-[9999] flex flex-col gap-2 items-end pointer-events-none'
    document.body.appendChild(container)
  }
  return container
}

export default class Msg {
  private static container: HTMLElement = ensureContainer()

  private constructor() { } // 禁止外部实例化

  /**
   * 显示消息提示
   * @param msg 消息内容
   * @param type 消息类型
   * @param duration 消息显示时长（毫秒）
   */
  static show(msg: string, type: MsgPromptType = 'info', duration = 3000) {
    const wrapper = document.createElement('div')
    this.container.appendChild(wrapper)

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

  /**
   * 显示错误消息
   * @param msg 消息内容
   * @param duration 消息显示时长（毫秒）
   */
  static error(msg: string, duration = 3000) {
    this.show(msg, 'error', duration)
  }

  /**
   * 显示成功消息
   * @param msg 消息内容
   * @param duration 消息显示时长（毫秒）
   */
  static success(msg: string, duration = 3000) {
    this.show(msg, 'success', duration)
  }

  /**
   * 显示警告消息
   * @param msg 消息内容
   * @param duration 消息显示时长（毫秒）
   */
  static warning(msg: string, duration = 3000) {
    this.show(msg, 'warning', duration)
  }

  /**
   * 显示信息消息
   * @param msg 消息内容
   * @param duration 消息显示时长（毫秒）
   */
  static info(msg: string, duration = 3000) {
    this.show(msg, 'info', duration)
  }
}
