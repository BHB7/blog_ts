import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

// 创建 Pinia 实例
const pinia = createPinia()

// 注册持久化插件
pinia.use(createPersistedState())

// 导出 Pinia 实例
export default pinia

// 导出所有模块
export * from './modules/theme'
export * from './modules/route'
export * from './modules/token'
export * from './modules/userInfo'
