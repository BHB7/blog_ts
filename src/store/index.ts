import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const pinia = createPinia()

export default pinia.use(createPersistedState())

export * from './modules/theme'
export * from './modules/route'
export * from './modules/token'
