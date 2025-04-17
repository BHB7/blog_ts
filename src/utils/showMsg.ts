import MsgPrompt, { type MsgPromptType } from '@/components/global/msg-prompt/index.vue'
import { createApp } from 'vue'

/**
 * @param msg 提示信息内容
 * @param type 类型（success, error, warning, info）
 * @param duration 显示时长，单位毫秒，默认 2000ms
 */
export const showMsg = (msg: string, type: MsgPromptType = 'info', duration = 2000) => {
  const div = document.createElement('div')
  div.className = 'global-msg-prompt fixed top-0 left-0 w-full z-[9999] pointer-events-none'
  document.body.appendChild(div)

  const app = createApp(MsgPrompt, { msg, type, duration })
  app.mount(div)
}
