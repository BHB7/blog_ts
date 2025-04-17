import {
  computed,
  createApp,
  defineComponent,
  h,
  type ComponentPublicInstance
} from 'vue'

import ErrIcon from '~icons/line-md/alert-loop'
import SuccessIcon from '~icons/line-md/confirm-circle-filled'
import WarningIcon from '~icons/line-md/alert-circle-twotone-loop'

const MyModal = defineComponent({
  props: {
    msg: { type: String, required: true },
    type: { type: String, default: 'success' },
    close: { type: Function, required: true },
    callback: { type: Function, default: null }
  },
  setup(props) {
    const typeIcon = computed(() => {
      switch (props.type) {
        case 'success':
          return SuccessIcon
        case 'warning':
          return WarningIcon
        case 'error':
          return ErrIcon
        default:
          return WarningIcon
      }
    })

    return () =>
      h('dialog', { class: 'modal', open: true }, [
        h('div', { class: 'modal-box w-11/12 max-w-5xl' }, [
          h('h3', { class: 'text-lg font-bold flex items-center gap-2' }, [
            h(typeIcon.value, { class: 'w-6 h-6' }),
            '提示'
          ]),
          h('p', { class: 'py-4' }, props.msg),
          h('div', { class: 'modal-action flex justify-end gap-2' }, [
            props.callback &&
            h(
              'button',
              {
                class: 'btn btn-primary',
                onClick: () => props.callback()
              },
              '确认'
            ),
            h(
              'button',
              { class: 'btn', onClick: () => props.close() },
              '关闭'
            )
          ])
        ])
      ])
  }
})

export type Fun = (ctx: ComponentPublicInstance) => void

export interface ModalType {
  msg: string
  type: 'success' | 'warning' | 'error'
  closeCallback: Fun
  callback?: Fun
}

export function showModal({
  msg,
  type,
  closeCallback,
  callback
}: ModalType) {
  const div = document.createElement('div')
  document.body.appendChild(div)

  const app = createApp(MyModal, {
    msg,
    type,
    close: () => {
      app.unmount()
      div.remove()
      closeCallback(vm)
    },
    callback: callback ? () => callback(vm) : null
  })

  const vm = app.mount(div)
}
