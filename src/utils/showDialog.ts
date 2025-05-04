// @/services/modalService.ts
import { createApp, h } from 'vue'
import ModalCom, { type Modal } from '@/components/modalBox/bottomDialog.vue'

class ModalService {
  private appInstance: ReturnType<typeof createApp> | null = null
  private modalContainer = document.createElement('div')

  constructor() {
    // 将对话框容器添加到 body 中
    document.body.appendChild(this.modalContainer)
  }

  /**
   * 显示对话框
   * @param options 对话框配置
   * @returns 返回一个 Promise，在对话框关闭时 resolve
   */
  show({ cont, title, close }: Modal): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.appInstance) {
        this.appInstance.unmount()
        this.appInstance = null
      }

      // 创建并挂载对话框实例
      this.appInstance = createApp(ModalCom, {
        cont,
        title,
        close: () => {
          try {
            // 执行用户传入的关闭回调
            if (typeof close === 'function') {
              close()
            }
          } catch (err) {
            console.error('Error in close callback:', err)
          } finally {
            // 卸载对话框实例
            if (this.appInstance) {
              this.appInstance.unmount()
              this.appInstance = null
            }
            reject() // 对话框关闭时 resolve Promise
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
            resolve()
          }
        }
      })

      this.appInstance.mount(this.modalContainer)
    })
  }
  close() {
    // 卸载对话框实例
    if (this.appInstance) {
      this.appInstance.unmount()
      this.appInstance = null
    }
  }
}

// 单例模式：确保全局只有一个 ModalService 实例
const modalService = new ModalService()

export default modalService
