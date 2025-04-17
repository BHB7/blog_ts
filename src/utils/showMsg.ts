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

// 全局索引让每个消息有微妙的错位效果
let msgIndex = 0

export const showMsg = (msg: string, type: MsgPromptType = 'info', duration = 3000) => {
  let container = document.querySelector('#global-msg-container')
  if (!container) {
    container = document.createElement('div')
    container.id = 'global-msg-container'
    container.className = 'fixed lg:top-4 top-15 right-4 z-[9999] w-auto flex flex-col gap-2 items-end pointer-events-none'
    document.body.appendChild(container)
  }

  const wrapper = document.createElement('div')
  container.appendChild(wrapper)

  const localIndex = msgIndex++
  const MsgComponent = defineComponent({
    props: {
      msg: String,
      type: String,
      duration: Number,
      onClose: Function
    },
    setup(props) {
      const visible = ref(false)

      const typeClass = computed(() => {
        switch (props.type) {
          case 'error': return 'alert-error'
          case 'success': return 'alert-success'
          case 'warning': return 'alert-warning'
          default: return 'alert-info'
        }
      })

      // 开始动画
      onMounted(async () => {
        await nextTick()
        requestAnimationFrame(() => {
          visible.value = true
        })
        setTimeout(() => {
          visible.value = false
        }, props.duration || 3000)
      })

      watch(visible, (val) => {
        if (!val) {
          setTimeout(() => {
            props.onClose?.()
          }, 400) // 离开动画时间
        }
      })

      return () =>
        h(
          'div',
          {
            class: `
              pointer-events-auto rounded-md px-5 py-3 alert flex items-center gap-3
              transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
              ${visible.value ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-3 scale-95'}
              ${typeClass.value}
              `,
            style: {
              transitionDelay: `${localIndex * 50}ms` // 多条消息微妙错位
            }
          },
          [
            h('span', { class: 'text-sm font-medium base-300' }, props.msg)
          ]
        )
    }
  })

  const vnode: VNode = h(MsgComponent, {
    msg,
    type,
    duration,
    onClose: () => {
      render(null, wrapper)
      wrapper.remove()
    }
  })

  render(vnode, wrapper)
}
