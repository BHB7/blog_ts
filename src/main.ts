import '@/style/index.css'
import 'animate.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/index'
import pinia from '@/store/index'
import elUpmove from './pages/frontend/directives/elUpmove'
import Log from '@/utils/log'
const app = createApp(App)
app.use(router)
app.use(pinia)
app.directive('up', elUpmove)
app.mount('#app')
Log.welcome()
