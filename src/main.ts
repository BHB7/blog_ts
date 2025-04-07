import '@/style/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import pinia from '@/store/index'
import elUpmove from './pages/directives/elUpmove'

const app = createApp(App)
app.directive('up', elUpmove)
app.use(pinia)
app.use(router)
app.mount('#app')
