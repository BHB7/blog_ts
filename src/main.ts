import '@/style/index.css'
import 'animate.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/index'
import pinia from '@/store/index'
import elUpmove from './pages/frontend/directives/elUpmove'
import Log from '@/utils/log'
const app = createApp(App)
app.directive('up', elUpmove)
app.use(pinia)
app.use(router)
app.mount('#app')
Log.welcome()
