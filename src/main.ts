import '@/style/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/index'
import pinia from '@/store/index'
import elUpmove from './pages/frontend/directives/elUpmove'

const app = createApp(App)
app.directive('up', elUpmove)
app.use(pinia)
app.use(router)
app.mount('#app')
