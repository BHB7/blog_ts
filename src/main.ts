import '@/style/index.css'
import 'animate.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/index'
import pinia from '@/store/index'
import elUpmove from './pages/frontend/directives/elUpmove'
import { showMsg } from './utils/showMsg'
showMsg('测试', 'success', 3000)
const app = createApp(App)
app.directive('up', elUpmove)
app.use(pinia)
app.use(router)
app.mount('#app')
