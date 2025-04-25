// @/services/modalService.ts

import { createApp, h } from 'vue'
import ModalCom, { type Modal } from '@/components/modalBox/modal.vue'

type Ty = 'error' | 'success' | 'w'
class ModalService {
  private appInstance: ReturnType<typeof createApp> | null = null
  private modalContainer = document.createElement('div')

  constructor() {
    // 将模态框容器添加到 body 中
    document.body.appendChild(this.modalContainer)
  }

  /**
   * 显示模态框
   * @param options 模态框配置
   * @returns 返回一个 Promise，在模态框关闭时 resolve
   */
  show({ cont, title, type, close, confirm, closeText, confirmText }: Modal): Promise<void> {
    return new Promise((resolve) => {
      if (this.appInstance) {
        this.appInstance.unmount()
        this.appInstance = null
      }

      // 创建并挂载模态框实例
      this.appInstance = createApp(ModalCom, {
        cont,
        title,
        type,
        closeText,
        confirmText,
        close: () => {
          try {
            // 执行用户传入的关闭回调
            if (typeof close === 'function') {
              close()
            }
          } catch (err) {
            console.error('Error in close callback:', err)
          } finally {
            // 卸载模态框实例
            if (this.appInstance) {
              this.appInstance.unmount()
              this.appInstance = null
            }
            resolve() // 模态框关闭时 resolve Promise
          }
        },
        confirm: () => {
          try {
            // 执行用户传入的关闭回调
            if (typeof confirm === 'function') {
              confirm()
            }
          } catch (err) {
            console.error('Error in confirm callback:', err)
          } finally {
            // 卸载模态框实例
            if (this.appInstance) {
              this.appInstance.unmount()
              this.appInstance = null
            }
            resolve() // 模态框关闭时 resolve Promise
          }
        }
      })

      this.appInstance.mount(this.modalContainer)
    })
  }
}

// 单例模式：确保全局只有一个 ModalService 实例
const modalService = new ModalService()

export default modalService
